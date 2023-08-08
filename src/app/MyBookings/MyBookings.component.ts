import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';

@Component({
  selector: 'app-MyBookings',
  templateUrl: './MyBookings.component.html',
  styleUrls: ['./MyBookings.component.css'],
  standalone: true,
  imports: [MatTableModule],
})
export class MyBookingsComponent implements OnInit {
displayedColumns: string[] = ['Ticket_Id', 'Travels_Name', 'Source', 'Destination', 'Date' ,'Seats', 'Amount', 'Action']
filteredBusList  : any ;
allBooking: any ;

  constructor(private route:ActivatedRoute,private router: Router,private http:HttpClient) { }

  ngOnInit() {
    console.log(new Date(format(new Date(), 'yyyy-MM-dd')));
    this.http.get<any>("http://localhost:3000/userDetails/1").subscribe(res=>{
      this.http.get<any>("http://localhost:3000/bookedSeats/1").subscribe(res1=>{
        this.allBooking = res1;
        this.filteredBusList = Object.keys(res1).filter((a:any) => res1[a]?.uid == res.uid);
      });
    });
  }
  getBtnStatus(info: any){
    return !info.status ? true : new Date(info.busDetails.Date) < new Date(new Date().setHours(0,0,0));
  }
  getBtnTexts(info: any){
    return !info.status ? 'Cancelled' : new Date(info.busDetails.Date) < new Date(new Date().setHours(0,0,0)) ? 'Expired' : 'View';
  }
  goTo(Ticket_Id: String){
    this.router.navigate(["/viewticket/", {tid: Ticket_Id}]);
  }

}
