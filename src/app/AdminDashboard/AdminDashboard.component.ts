import { Component, OnInit } from '@angular/core';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';


const Edit = '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>'

@Component({
  selector: 'app-AdminDashboard',
  templateUrl: './AdminDashboard.component.html',
  styleUrls: ['./AdminDashboard.component.css'],
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatTableModule, MatIconModule, MatTooltipModule, CommonModule]
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'Bus_Number',
    'Travels_Name',
    'Source',
    'Destination',
    'Amount',
    'Date',
    'Action',
  ];
  BUS_DATA: any;
  dataSource: any;
  
  constructor(private http: HttpClient, private router: Router,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,) {
    iconRegistry.addSvgIcon('download', sanitizer.bypassSecurityTrustResourceUrl('https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/download/default/48px.svg'));
    iconRegistry.addSvgIcon('active', sanitizer.bypassSecurityTrustResourceUrl('https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/check_circle/default/48px.svg'));
    iconRegistry.addSvgIcon('inActive', sanitizer.bypassSecurityTrustResourceUrl('https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/cancel/default/48px.svg'));
    iconRegistry.addSvgIconLiteral('edit', sanitizer.bypassSecurityTrustHtml(Edit))
  }

  ngOnInit() {
    this.http.get<any>("http://localhost:3000/BusList")
    .subscribe( res=>{
      this.BUS_DATA = res;
    });
  }
  addTravels(params: any){
    this.router.navigate(['/addtravels', {id: params}]);
  }
  toggleBusStatus(id:any, value:any){
    this.http.get<any>('http://localhost:3000/BusList/' + id).subscribe(res => {
      res = Object.assign(res, {status: value});
      this.http.patch<any>('http://localhost:3000/BusList/' + id, res).subscribe(res1 => {
        this.ngOnInit()
        alert('Updated');
      })
    })
  }
  download(element: any){
    let seatData = element.Seats
    let ticketDetails = (seatData.map((a:any)=> Object.values(Object.assign({}, {index: a.index, name: a.name, age: a.age, gender: a.gender, phoneNumber: a.phoneNumber, email: a.email}))))
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(element.Travels_Name, 105 , 10, {align: 'center'})
    doc.setFontSize(15);
    doc.text(element.Source + " - " + element.Date + " - " + element.Destination , 105 , 20, {align: 'center'})
    const columns = [['Seat No', 'Passenger Name', 'Age', 'Gender', 'Phone Number', 'Email']];
    const data = ticketDetails

    autoTable(doc, {
          head: columns,
          body: data,
          startY:30,
          didDrawPage: (dataArg: any) => {
          }
    });
    doc.save('table.pdf');
  }
  openAction(element: any, action: string){
    console.log(element, action)
    switch(action){
      case 'download':
        this.download(element)
    }
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

}
