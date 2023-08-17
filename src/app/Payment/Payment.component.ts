import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';
import { NGXLogger } from 'ngx-logger';

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
    private user: UserService,
    private logger: NGXLogger //
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.pattern('[a-zA-Z ]*')],
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}'),
        ],
      ],
      expiryMonth: ['', [Validators.required, Validators.pattern('[1-9]{2}')]],
      expiryYear: ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
      CVV: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
    });

    this.user.getSelectedBusDetails().subscribe((res: any) => {
      this.admin.getBusByName(res.Bus_Number);
      localStorage.setItem('selectedBusDetails', JSON.stringify(res));
    });
    this.userDetails = JSON.parse(
      String(localStorage.getItem('selectedBusDetails'))
    );
    this.currId = JSON.parse(String(localStorage.getItem('selectedBus')));
  }
  async navigateTo() {
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
        addBooking = Object.assign(
          {},
          {
            uid: localStorage.getItem('userId'),
            status: true,
            busDetails: this.currId,
            Seats: selectedSeats,
          }
        );
        let allBooking = {};
        this.user.getAllBookingHistory().subscribe((res) => {
          allBooking = Object.assign({}, res);
        });
        let ticketId = Math.random().toString(36).substring(2, 7);
        this.user
          .updateBookedHistory({
            ...allBooking,
            [ticketId]: addBooking,
          })
          .subscribe((res) => console.log(res));
        this.logger.error(
          'User' +
            ' : ' +
            localStorage.getItem('userId') +
            ' ~ Booking Successful ( ' +
            ticketId +
            ' )'
        );
      });

      alert('Booked Successfully !!!');

      setTimeout(() => {
        this.router.navigate(['/mybookings']);
      }, 2000);
    }
  }
}
