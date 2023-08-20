import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactusComponent } from './Contactus/Contactus.component';
import { SignUpComponent } from './SignUp/SignUp.component';
import { AboutUsComponent } from './AboutUs/AboutUs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './Payment/Payment.component';
import { AdminLoginComponent } from './AdminLogin/AdminLogin.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './Footer/Footer.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from 'src/environments/environment.development';
import { Event, Router, RoutesRecognized } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    ContactusComponent,
    SignUpComponent,
    AboutUsComponent,
    PaymentComponent,
    AdminLoginComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    LoggerModule.forRoot({
      serverLoggingUrl: environment.loggerURL,
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  private isUserAuthRequired: Array<any> = [
    'mybookings',
    'payment',
    'viewticket',
  ];
  private isAdminAuthRequired: Array<any> = ['admindashboard', 'addtravels'];
  private isUserLoggedIn = localStorage.getItem('userId') != null;
  private isAdminLoggedIn = localStorage.getItem('adminId') != null;
  constructor(private router: Router) {
    this.routeEvent(this.router);
  }
  routeEvent(router: Router) {
    router.events.subscribe((e) => {
      if (e instanceof RoutesRecognized) {
        if (this.checkUserAuthRequired(e.url)) {
          this.router.navigate(['/login']);
        }
        if (this.checkAdminAuthRequired(e.url)) {
          this.router.navigate(['/adminlogin']);
        }
        if (this.checkPageAccess(e.url)) {
          this.router.navigate(['/noaccess']);
        }
      }
    });
  }
  checkPageAccess(url: string) {
    let isRestrictedPage =
      (this.isUserLoggedIn && this.checkAdminAuthRequired(url)) ||
      (this.isAdminLoggedIn && this.checkUserAuthRequired(url));
    return isRestrictedPage;
  }
  checkUserAuthRequired(url: string) {
    return (
      this.isUserAuthRequired.some((route) => url.includes(route)) &&
      !this.isUserLoggedIn
    );
  }
  checkAdminAuthRequired(url: string) {
    return (
      this.isAdminAuthRequired.some((route) => url.includes(route)) &&
      !this.isAdminLoggedIn
    );
  }
}
