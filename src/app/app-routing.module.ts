import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './AboutUs/AboutUs.component';
import { ContactusComponent } from './Contactus/Contactus.component';
import { HomeComponent } from './Home/Home.component';
import { LoginComponent } from './Login/Login.component';
import { SignUpComponent } from './SignUp/SignUp.component';
import { SelectLocationComponent } from './SelectLocation/SelectLocation.component';
import { SelectBusComponent } from './SelectBus/SelectBus.component';
import { SeatSelectedUsersDetailsComponent } from './SeatSelectedUsersDetails/SeatSelectedUsersDetails.component';
import { PaymentComponent } from './Payment/Payment.component';
import { SelectSeatComponent } from './SelectSeat/SelectSeat.component';
import { AdminLoginComponent } from './AdminLogin/AdminLogin.component';
import { AdminDashboardComponent } from './AdminDashboard/AdminDashboard.component';
import { BookingConfirmationComponent } from './BookingConfirmation/BookingConfirmation.component';
import { MyBookingsComponent } from './MyBookings/MyBookings.component';
import { AddTravelsComponent } from './AddTravels/AddTravels.component';
import { ViewTicketDetailsComponent } from './ViewTicketDetails/ViewTicketDetails.component';
const routes: Routes = [
{
  path:'login',
  component:LoginComponent
},
{
  path:'home',
  component:HomeComponent
},
{
  path:'signup',
  component:SignUpComponent
},
{
  path:'contactus',
  component:ContactusComponent
},
{
path:'mybookings',
component:MyBookingsComponent,
},
{
  path:'viewticket',
  component: ViewTicketDetailsComponent,
  children: [
    { path: ':id', component: ViewTicketDetailsComponent },
  ]
},
{
path:'aboutus',
component:AboutUsComponent
},
{
path:'selectlocation',
component:SelectLocationComponent
},
{
path:'selectbus',
component:SelectBusComponent
},
{
path:'selectseat',
component:SelectSeatComponent
},
{
  path:'adminlogin',
  component:AdminLoginComponent
},
{
path:'seatselectedusersdetails',
component:SeatSelectedUsersDetailsComponent
},
{
path:'admindashboard',
component:AdminDashboardComponent
},
{
path:'addtravels',
component:AddTravelsComponent
},
{
path:'bookingconfirmation',
component:BookingConfirmationComponent
},
{
path:'payment',
component:PaymentComponent
},
{
path:'**',
component:HomeComponent
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
