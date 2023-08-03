import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup } from '@angular/forms';
@Component({
  selector: 'app-BookingConfirmation',
  templateUrl: './BookingConfirmation.component.html',
  styleUrls: ['./BookingConfirmation.component.css'],
  standalone: true,
  imports: [MatTableModule, FormsModule,MatButtonModule, MatTooltipModule,CommonModule],
})

export class BookingConfirmationComponent implements OnInit {

  SelectedDetail :any;
  SeatDetail:any;
  displayedColumns: string[] = [
    'seatnumber',
    'passengername',
    'age',
    'gender',
    'Amount'
  ];
  isLogedIn: Boolean = false
  constructor(private http:HttpClient , private router:Router) { }
  ngOnInit() {

    this.http.get<any>("http://localhost:3000/selectedBus/1")
   .subscribe(res=>{
    this.SelectedDetail =  Object.assign(res, {
       totalAmount: res.amount * res.Seats.filter((a:any) => !a.booked).length,
       phoneNumber: res?.phoneNumber ? res.phoneNumber : "",
       email: res?.email ? res.email : "",
      });
     this.SeatDetail= this.SelectedDetail.Seats.filter((a:any) => !a.booked)
   });
   this.http.get('http://localhost:3000/userDetails/1').subscribe(res => { //
      this.isLogedIn = res.hasOwnProperty('uid');   //
    });  //
  }
  checkAndNavigate(){
    if(this.isLogedIn){
      this.goTo();
    }
    else{
      this.go_To('/login');
    }
  }
 goTo(){
  this.http.patch<any>("http://localhost:3000/selectedBus/1", this.SelectedDetail).subscribe(res=>{
console.log(res)
  });
  this.router.navigate(["/payment"])
 }
 go_To(toPath: any){  //
  this.router.navigate([toPath]) //
} //
logOut(){ //
  this.http.put('http://localhost:3000/userDetails/1', {id: 1}).subscribe(res => { //
    alert('Logout Successfully');
    setTimeout(() => {
      this.go_To('/');
    },2000);
  });
}
isButtonDisabled(){
  let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  let disabled = this.SelectedDetail.phoneNumber == "" || this.SelectedDetail.phoneNumber == null ||
  this.SelectedDetail.email == "" || this.SelectedDetail.email == null || !regex.test(this.SelectedDetail.email);
  return disabled;
}

}























/*
  SeatSelectedUserDetails
  SelectLocation
  SelectBus
  SelectSeat
  Home
  Contactus
  BookingConfirmation
  AboutUs
 */

