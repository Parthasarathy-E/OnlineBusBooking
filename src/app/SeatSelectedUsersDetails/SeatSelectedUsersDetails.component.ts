import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-SeatSelectedUsersDetails',
  templateUrl: './SeatSelectedUsersDetails.component.html',
  styleUrls: ['./SeatSelectedUsersDetails.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class SeatSelectedUsersDetailsComponent implements OnInit {
  SelectedSeats!: any;
  seatSelected!: Array<any>;
  filteredSeat: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // let qureyStr = this.route.snapshot.paramMap.get('value');
    // this.SelectedSeats = JSON.parse(String(qureyStr));
    this.http
      .get<any>('http://localhost:3000/selectedBus/1')
      .subscribe((res) => {
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
  goTo() {
    // router
    this.http
      .patch<any>(
        'http://localhost:3000/selectedBus/1',
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
