import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-Payment',
  templateUrl: './Payment.component.html',
  styleUrls: ['./Payment.component.css'],
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
  currId: any;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private admin: AdminService,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.pattern('[a-zA-Z ]*')],
      cardNumber: [
        '',
        [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{4}-[0-9]{4}')],
      ],
      expiryMonth: ['', [Validators.required, Validators.pattern('[1-9]{2}')]],
      expiryYear: ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
      CVV: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
    });

    this.user.getSelectedBusDetails().subscribe((res: any) => {
      this.userDetails = res;
    });
    this.admin.getBusByName(this.userDetails.Bus_Number);
    this.currId = localStorage.getItem('selectedBus');
  }
  async goTo() {
    let selectedSeats = this.userDetails.Seats.filter((a: any) => !a.booked);
    if (selectedSeats.length > 0) {
      this.currId.Seats = this.userDetails.Seats.map((a: any) =>
        !a.booked
          ? Object.assign(a, {
              phoneNumber: this.userDetails.phoneNumber,
              booked: true,
              email: this.userDetails.email,
            })
          : a
      );
      this.admin.updateBusById(this.currId.id, this.currId).subscribe((res) => {
        console.log(res);
      });
      let addBooking = {};
      this.user.getSelectedBusDetails().subscribe((res: any) => {
        let user = Object.assign({}, res);
        addBooking = Object.assign(
          {},
          {
            uid: user.uid,
            status: true,
            busDetails: this.currId,
            Seats: selectedSeats,
          }
        );
        let allBooking = {};
        this.user.getAllBookingHistory().subscribe((res) => {
          allBooking = Object.assign({}, res);
        });
        this.user
          .updateBookedHistory({
            ...allBooking,
            [Math.random().toString(36).substring(2, 7)]: addBooking,
          })
          .subscribe((res) => console.log(res));
      });

      // alert
      // ok -> /mybooking
      alert('Booked Successfully !!!');
      setTimeout(() => {
        this.router.navigate(['/mybookings']);
      }, 2000);
    }
  }
}
