import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';
import { NGXLogger } from 'ngx-logger';

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
    private admin: AdminService,
    private user: UserService,
    private logger: NGXLogger
  ) {}

  ngOnInit() {
    this.tid = this.route.snapshot.paramMap.get('tid');
    this.user.getAllBookingHistory().subscribe((res1: any) => {
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
    this.user.getAllBookingHistory().subscribe((res1) => {
      let payload = { ...res1, [this.tid]: this.ticketInfo };
      this.user.updateBookedHistory(payload).subscribe((res) => {
        this.logger.error(
          'User' +
            ' : ' +
            localStorage.getItem('userId') +
            ' ~ Canceled Successful ( ' +
            this.tid +
            ' )'
        );
        alert('Your Ticket has been Canceled Successfully...!');
      });
    });
    this.navigateBack();
  }
  navigateBack() {
    this.router.navigate(['/mybookings']);
  }
}
