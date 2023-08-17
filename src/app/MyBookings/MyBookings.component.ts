import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { UserService } from '../user.service';

@Component({
  selector: 'app-MyBookings',
  templateUrl: './MyBookings.component.html',
  styleUrls: ['./MyBookings.component.css'],
  standalone: true,
  imports: [MatTableModule],
})
export class MyBookingsComponent implements OnInit {
  displayedColumns: string[] = [
    'Ticket_Id',
    'Travels_Name',
    'Source',
    'Destination',
    'Date',
    'Seats',
    'Amount',
    'Action',
  ];
  filteredBusList: any;
  allBooking: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private user: UserService
  ) {}

  ngOnInit() {
    this.user.getAllBookingHistory().subscribe((res1: any) => {
      let userId = localStorage.getItem('userId');
      this.allBooking = res1;
      this.filteredBusList = Object.keys(res1).filter(
        (a: any) => res1[a]?.uid == userId
      );
    });
  }
  getBtnStatus(info: any) {
    return !info.status
      ? true
      : new Date(info.busDetails.Date) < new Date(new Date().setHours(0, 0, 0));
  }
  getBtnTexts(info: any) {
    return !info.status
      ? 'Cancelled'
      : new Date(info.busDetails.Date) < new Date(new Date().setHours(0, 0, 0))
      ? 'Expired'
      : 'View';
  }
  navigateTo(Ticket_Id: String) {
    this.router.navigate(['/viewticket/', { tid: Ticket_Id }]);
  }
}
