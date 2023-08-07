import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-ViewTicketDetails',
  templateUrl: './ViewTicketDetails.component.html',
  styleUrls: ['./ViewTicketDetails.component.css'],
  standalone: true,
  imports: [MatTableModule],
})
export class ViewTicketDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'Seat_No',
    'Passenger_Name',
    'Age',
    'Gender',
    'Amount',
  ];
  ticketInfo: any;
  tid: any;
  element: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private admin: AdminService
  ) {}

  ngOnInit() {
    this.tid = this.route.snapshot.paramMap.get('tid');
    this.http
      .get<any>('http://localhost:3000/bookedSeats/1')
      .subscribe((res1) => {
        this.ticketInfo = res1[this.tid];
      });
  }
  checkCancelDate() {
    return (
      new Date(this.ticketInfo.busDetails.Date) <=
      new Date(new Date().setHours(0, 0, 0))
    );
  }
  cancelTicket() {
    let seatNo = this.ticketInfo.Seats.map((a: any) => a.index);
    for (
      let index = 0;
      index < this.ticketInfo.busDetails.Seats.length;
      index++
    ) {
      if (seatNo.includes(this.ticketInfo.busDetails.Seats[index].index)) {
        this.ticketInfo.busDetails.Seats.splice(index, 1);
        index--;
      }
    }
    this.admin
      .updateBusById(this.ticketInfo.busDetails.id, this.ticketInfo.busDetails)
      .subscribe((res) => console.log(res));
    this.ticketInfo.status = false;
    this.http
      .get<any>('http://localhost:3000/bookedSeats/1')
      .subscribe((res1) => {
        let payload = { ...res1, [this.tid]: this.ticketInfo };
        this.http
          .patch<any>('http://localhost:3000/bookedSeats/1', payload)
          .subscribe((res) => {
            alert('Your Ticket has been Canceled Successfully...!');
          });
      });
    this.goBack();
  }
  goBack() {
    this.router.navigate(['/mybookings']);
  }
}
