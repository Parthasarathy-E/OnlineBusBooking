import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { NGXLogger } from 'ngx-logger';
@Component({
  selector: 'app-BookingConfirmation',
  templateUrl: './BookingConfirmation.component.html',
  styleUrls: ['./BookingConfirmation.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    FormsModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule,
  ],
})
export class BookingConfirmationComponent implements OnInit {
  SelectedDetail: any;
  SeatDetail: any;
  displayedColumns: string[] = [
    'seatnumber',
    'passengername',
    'age',
    'gender',
    'Amount',
  ];
  isLogedIn: Boolean = false;
  bookedSeats: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private user: UserService,
    private logger: NGXLogger
  ) {}
  ngOnInit() {
    this.bookedSeats = this.formBuilder.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.d)(?=.[a-z])(?=.*[A-Z]).{3,}'),
        ],
      ],
    });
    this.user.getSelectedBusDetails().subscribe((res: any) => {
      this.SelectedDetail = Object.assign(res, {
        totalAmount:
          res.amount * res.Seats.filter((a: any) => !a.booked).length,
        phoneNumber: res?.phoneNumber ? res.phoneNumber : '',
        email: res?.email ? res.email : '',
      });
      this.SeatDetail = this.SelectedDetail.Seats.filter((a: any) => !a.booked);
    });
    this.isLogedIn = localStorage.getItem('userId') != null;
  }
  checkAndNavigate() {
    if (this.isLogedIn) {
      this.navigateTo();
    } else {
      this.router.navigate(['/login']);
    }
  }
  navigateTo() {
    let log = Object.assign(
      {},
      {
        user: localStorage.getItem('userId'),
        SelectedDetail: this.SelectedDetail,
      }
    );
    this.logger.error(log);
    this.user.updateSelectedBusDetails(this.SelectedDetail).subscribe((res) => {
      console.log(res);
    });
    this.router.navigate(['/payment']);
  }

  isButtonDisabled() {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let disabled =
      this.SelectedDetail.phoneNumber == '' ||
      this.SelectedDetail.phoneNumber == null ||
      this.SelectedDetail.email == '' ||
      this.SelectedDetail.email == null ||
      !regex.test(this.SelectedDetail.email);
    return disabled;
  }
}
