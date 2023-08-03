import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-SelectBus',
  templateUrl: './SelectBus.component.html',
  styleUrls: ['./SelectBus.component.css'],
  standalone: true,
  imports: [MatTableModule,CommonModule],
})
export class SelectBusComponent implements OnInit {
  isLogedIn: Boolean = false //
  filteredBusList: any ;

  displayedColumns: string[] = [
    'Bus_Number',
    'Travels_Name',
    'Source',
    'Destination',
    'Date',
    'Amount',
    'BookBtn',
  ];

  sourceLocation: string | null | undefined;
  destinationLocation: string | null | undefined;
  dateSelected: string | null | undefined;

  constructor(private route: ActivatedRoute,private router: Router, private http : HttpClient) {}

  ngOnInit() {
    this.sourceLocation = this.route.snapshot.paramMap.get('sourceLocation');
    this.destinationLocation = this.route.snapshot.paramMap.get('destinationLocation');
    this.dateSelected = this.route.snapshot.paramMap.get('dateSelected');
    this.http.delete<any>("http://localhost:3000/selectedBus/1").subscribe(res => console.log(res))
    this.http.get<any>("http://localhost:3000/BusList")
   .subscribe(res=>{
    this.filteredBusList = res.filter(
      (a: any) =>
        a.Source?.toLowerCase() == this.sourceLocation?.toLowerCase() &&
        a.Destination?.toLowerCase() == this.destinationLocation?.toLowerCase() && a.Date == this.dateSelected && a.status
    );
    this.http.get('http://localhost:3000/userDetails/1').subscribe(res => { //
      this.isLogedIn = res.hasOwnProperty('uid');   //
    });  //
  })
      }
  bookbus(Bus:any){
    this.http.post<any>("http://localhost:3000/selectedBus", Object.assign(Bus, {id: 1})).subscribe(res => console.log(res));
    this.router.navigate([
    '/selectseat'
  ]);
  }
  goTo(toPath: any){  //
    this.router.navigate([toPath]) //
  } //
  logOut(){ //
    this.http.put('http://localhost:3000/userDetails/1', {id: 1}).subscribe(res => { //
      alert('Logout Successfully');
      setTimeout(() => {
        this.goTo('/');
      }, 2000);
    });
  }
}
