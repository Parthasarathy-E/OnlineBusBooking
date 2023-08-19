import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { environment } from 'src/environments/environment.development';
import { NGXLogger } from 'ngx-logger';
import { format } from 'date-fns';

@Component({
  selector: 'app-AdminDashboard',
  templateUrl: './AdminDashboard.component.html',
  styleUrls: ['./AdminDashboard.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule,
  ],
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

  constructor(
    private http: HttpClient,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private logger: NGXLogger,
    private admin: AdminService
  ) {
    iconRegistry.addSvgIcon(
      'download',
      sanitizer.bypassSecurityTrustResourceUrl(environment.icon.download)
    );
    iconRegistry.addSvgIcon(
      'active',
      sanitizer.bypassSecurityTrustResourceUrl(environment.icon.check_circle)
    );
    iconRegistry.addSvgIcon(
      'inActive',
      sanitizer.bypassSecurityTrustResourceUrl(environment.icon.cancel)
    );
    iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl(environment.icon.edit)
    );
  }

  ngOnInit() {
    this.admin.getBusList().subscribe((res) => {
      this.BUS_DATA = JSON.parse(JSON.stringify(res));
    });
  }
  addTravels(params: any) {
    this.router.navigate(['/addtravels', { id: params }]);
  }
  toggleBusStatus(id: any, value: any) {
    this.admin.toggleBusStatus(id, value);
    this.logger.error(
      'Bus :- ' +
        id +
        ' modified to ' +
        (value ? 'active' : 'inactive') +
        ' status'
    );
    setTimeout(() => {
      this.ngOnInit();
    }, 2000);
  }
  downloadPDF(element: any) {
    let seatData = element.Seats;
    let ticketDetails = seatData.map((a: any) =>
      Object.values(
        Object.assign(
          {},
          {
            index: a.index,
            name: a.name,
            age: a.age,
            gender: a.gender,
            phoneNumber: a.phoneNumber,
            email: a.email,
          }
        )
      )
    );
    let fileName =
      element.Travels_Name + ' - ' + element.Date + ' - passanger list.pdf';
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(element.Travels_Name, 105, 10, { align: 'center' });
    doc.setFontSize(15);
    doc.text(
      element.Source + ' - ' + element.Date + ' - ' + element.Destination,
      105,
      20,
      { align: 'center' }
    );
    const columns = [
      ['Seat No', 'Passenger Name', 'Age', 'Gender', 'Phone Number', 'Email'],
    ];
    const data = ticketDetails;

    autoTable(doc, {
      head: columns,
      body: data,
      startY: 30,
      didDrawPage: (dataArg: any) => {},
    });
    doc.save(fileName);
    let aid = localStorage.getItem('adminId');
    let downloadDateAndTime = format(new Date(), 'yyyy-MM-dd hh:mm:ss a');
    this.logger.error(
      'Admin - ' +
        aid +
        ' downloaded ' +
        element.Travels_Name +
        "'s passenger list on " +
        downloadDateAndTime
    );
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
}
