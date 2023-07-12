import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-Payment',
  templateUrl: './Payment.component.html',
  styleUrls: ['./Payment.component.css']
})

export class PaymentComponent implements OnInit {

cardYear: any;
minCardYear: any;
  paymentForm!: FormGroup;


String(arg0: any) {
throw new Error('Method not implemented.');

}
cardMonth: any;
$index: any;
cardNumber: any;
n: any;
userDetails: any;
currId: any

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void{

    this.paymentForm = this.formBuilder.group({

      name :['',Validators.required,Validators.pattern],
      cardNumber :['',[Validators.required,Validators.pattern('[0-9]{4}-[0-9]{4}-[0-9]{4}')]],
      expiryMonth :['',[Validators.required,Validators.pattern('[1-9]{2}')]],
      expiryYear :['',[Validators.required,Validators.pattern('[0-9]{4}')]],
      CVV :['',[Validators.required,Validators.pattern('[0-9]{3}')]],
    })
    this.http.get<any>("http://localhost:3000/selectedBus/1")
    .subscribe(res=>{
     this.userDetails =  res;
    });
    this.http.get<any>("http://localhost:3000/BusList")
    .subscribe(async res=>{
     this.currId =  JSON.parse(JSON.stringify(res.find((a:any) => a.Bus_Number == this.userDetails.Bus_Number)));
    });
  }
  async goTo(){
    let selectedSeats = this.userDetails.Seats.filter((a:any) => !a.booked);
    this.currId.Seats = this.userDetails.Seats.map((a: any)=> !a.booked ? Object.assign(a, {phoneNumber: this.userDetails.phoneNumber, booked: true ,email: this.userDetails.email}) : a);
    this.http.patch<any>("http://localhost:3000/BusList/" + this.currId.id, this.currId)
    .subscribe(res=>{
console.log(res)
    });
    let addBooking ={};
    this.http.get<any>("http://localhost:3000/userDetails/1").subscribe(res => {
      let user = Object.assign({}, res);
      addBooking = Object.assign({}, {uid: user.uid, status: true , busDetails: this.currId, Seats: selectedSeats });
      let allBooking = {};
      this.http.get<any>("http://localhost:3000/bookedSeats/1").subscribe(res => {
        allBooking = Object.assign({}, res);
      });
      this.http.patch<any>("http://localhost:3000/bookedSeats/1", { ...allBooking, [Math.random().toString(36).substring(2,7)]: addBooking}).subscribe(res => console.log(res));
    });

    // alert
    // ok -> /mybooking

  }
}
