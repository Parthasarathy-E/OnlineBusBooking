import { NgModule }from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule ,HttpClient} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactusComponent } from './Contactus/Contactus.component';
import { SignUpComponent } from './SignUp/SignUp.component';
import { AboutUsComponent } from './AboutUs/AboutUs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './Payment/Payment.component';
import { AdminLoginComponent } from './AdminLogin/AdminLogin.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './Footer/Footer.component';


@NgModule({
  declarations: [	
    AppComponent,
      ContactusComponent,
      SignUpComponent,
      AboutUsComponent,
      PaymentComponent,
      AdminLoginComponent,
      HeaderComponent,
      FooterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
