import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminService } from '../admin.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-AddTravels',
  templateUrl: './AddTravels.component.html',
  styleUrls: ['./AddTravels.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule],
})
export class AddTravelsComponent implements OnInit {
  busData: any = {
    Bus_Number: '',
    Date: '',
    Destination: '',
    Seats: [],
    Source: '',
    Travels_Name: '',
    amount: 100,
    status: true,
  };
  isEdit: Boolean = false;
  loading: Boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private admin: AdminService,
    private logger: NGXLogger
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.isEdit = id != 'add';
    if (this.isEdit) {
      this.admin
        .getBusById(id)
        .subscribe((res) => (this.busData = Object.assign({}, res)));
    }
  }
  addOrUpdateTravels() {
    let busName =
      this.busData.Travels_Name + ' (' + this.busData.Bus_Number + ')';
    if (this.isEdit) {
      this.admin
        .updateBusById(this.busData.id, this.busData)
        .subscribe((res) => {
          this.logger.error(busName + ' Edited successfully');
          alert(busName + ' Updated !!!');
        });
    } else {
      this.admin.addBusToList(this.busData).subscribe((res) => {
        this.logger.error(busName + ' Added successfully');
        alert(busName + ' Added !!!');
      });
    }
    setTimeout(() => {
      this.router.navigate(['/admindashboard']);
    }, 2000);
  }
}
