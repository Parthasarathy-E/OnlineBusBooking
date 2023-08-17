import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-SelectSeat',
  templateUrl: './SelectSeat.component.html',
  styleUrls: ['./SelectSeat.component.css'],
  standalone: true,
  imports: [CommonModule, MatGridListModule],
})
export class SelectSeatComponent implements OnInit {
  seats: Array<{ index: number; value: boolean; booked: false }> = [];
  SelectedBus!: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private user: UserService,
    private logger : NGXLogger
  ) {}

  ngOnInit() {
    // let qureyStr = this.route.snapshot.paramMap.get('selectedBus');
    this.user.getSelectedBusDetails().subscribe((res) => {
      this.SelectedBus = res;
      for (let i = 1; i < 41; i++) {
        let index = this.SelectedBus.Seats.findIndex((a: any) => a.index == i);
        if (index != -1) {
          this.seats.push(this.SelectedBus.Seats[index]);
          continue;
        }
        this.seats.push({ index: i, value: false, booked: false });
      }
    });
  }
  selectSeat(seat: any) {
    seat.value = !seat.value;
  }
  bookBus() {
    this.logger.error(
      "User" +
      ' : ' +
      localStorage.getItem('userId')+ " Selected Seats  : " + this.seats.filter((a) => a.value && !a.booked).map((seat)=>seat.index)
    );
    this.user
      .updateSelectedBusDetails(
        Object.assign(this.SelectedBus, {
          Seats: this.seats.filter((a) => a.value),
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
    this.router.navigate(['/seatselectedusersdetails']);
  }
}
