import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';
import { NGXLogger } from 'ngx-logger';
@Component({
  selector: 'app-SelectBus',
  templateUrl: './SelectBus.component.html',
  styleUrls: ['./SelectBus.component.css'],
  standalone: true,
  imports: [MatTableModule, CommonModule],
})
export class SelectBusComponent implements OnInit {
  filteredBusList: any;

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private admin: AdminService,
    private user: UserService,
    private logger: NGXLogger
  ) {}

  ngOnInit() {
    this.sourceLocation = this.route.snapshot.paramMap.get('sourceLocation');
    this.destinationLocation = this.route.snapshot.paramMap.get(
      'destinationLocation'
    );
    this.dateSelected = this.route.snapshot.paramMap.get('dateSelected');
    this.user.removeSelectedBus().subscribe((res) => console.log(res));
    this.admin.getBusList().subscribe((res: any) => {
      this.filteredBusList = res.filter(
        (a: any) =>
          a.Source?.toLowerCase() == this.sourceLocation?.toLowerCase() &&
          a.Destination?.toLowerCase() ==
            this.destinationLocation?.toLowerCase() &&
          a.Date == this.dateSelected &&
          a.status
      );
    });
  }
  bookbus(Bus: any) {
    this.logger.error(
      'User' +
        ' : ' +
        localStorage.getItem('userId') +
        ' Selected Travels  : ' +
        Bus.Travels_Name
    );
    this.user
      .setSelectedBus(Object.assign(Bus, { id: 1 }))
      .subscribe((res) => console.log(res));
    this.navigateTo('/selectseat');
  }
  navigateTo(toPath: any) {
    this.router.navigate([toPath]);
  }
}
