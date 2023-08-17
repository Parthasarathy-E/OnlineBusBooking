import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-SeatSelectedUsersDetails',
  templateUrl: './SeatSelectedUsersDetails.component.html',
  styleUrls: ['./SeatSelectedUsersDetails.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class SeatSelectedUsersDetailsComponent implements OnInit {
  public userDetailsForm!: FormGroup;
  SelectedSeats!: any;
  seatSelected!: Array<any>;
  filteredSeat: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private user: UserService,
    private logger: NGXLogger
  ) {}

  ngOnInit() {
    this.userDetailsForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      age: ['', Validators.required, Validators.pattern('[1-9]{2}')],
    });

    // let qureyStr = this.route.snapshot.paramMap.get('value');
    // this.SelectedSeats = JSON.parse(String(qureyStr));
    this.user.getSelectedBusDetails().subscribe((res) => {
      this.SelectedSeats = res;
      this.seatSelected = this.SelectedSeats?.Seats.map((a: any) =>
        Object.assign(a, {
          name: a?.name ? a.name : '',
          age: a?.age ? a.age : '',
          gender: a?.gender ? a.gender : 'Male',
        })
      );
      this.filteredSeat = this.seatSelected.filter((a: any) => !a.booked);
    });
  }
  userDetails() {}
  navigateTo() {
    let log = Object.assign(
      {},
      {
        user: localStorage.getItem('userId'),
        passangerDeatils: this.filteredSeat,
      }
    );
    this.logger.error(log);
    this.user
      .updateSelectedBusDetails(
        Object.assign(this.SelectedSeats, { Seats: this.seatSelected })
      )
      .subscribe((res) => {
        console.log(res);
      });
    this.router.navigate(['/bookingconfirmation']);
    console.log(
      Object.assign(this.SelectedSeats, { Seats: this.seatSelected })
    );
  }
}
