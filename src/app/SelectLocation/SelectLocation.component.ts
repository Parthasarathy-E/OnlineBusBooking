import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { format } from 'date-fns';
import { environment } from 'src/environments/environment';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-SelectLocation',
  templateUrl: './SelectLocation.component.html',
  styleUrls: ['./SelectLocation.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
})
export class SelectLocationComponent implements OnInit {
  sourceLocation: any;
  destinationLocation: any;
  dateSelected: any;
  public travelsForm!: FormGroup;
  locations: Array<any> = environment.locations;
  toSelected: any;
  validateTimeRange: any;
  validateDateRange: any;
  minDate: string = format(new Date(), 'yyyy-MM-dd');
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private logger: NGXLogger
  ) {}

  ngOnInit(): void {
    this.toSelected = '';
    this.travelsForm = this.formBuilder.group({
      Source: ['', Validators.required],
      Destination: ['', Validators.required],
      Date: ['', Validators.required],
    });
    // this.travelsForm = this.formBuilder.group({
    //   selectedDate: ['', [Validators.required, this.validateDateRange.bind(this)]]
    // });
  }
  searchButtonDisabled() {
    let disabled =
      this.sourceLocation == '' ||
      this.sourceLocation == null ||
      this.destinationLocation == '' ||
      this.destinationLocation == null ||
      this.dateSelected == '' ||
      this.dateSelected == null;
    return disabled;
  }
  navigateTo() {
    this.logger.error(
      'User' +
        ' : ' +
        localStorage.getItem('userId') +
        ' Selected Location  \\n Source : ' +
        this.sourceLocation +
        ' \\n Destination : ' +
        this.destinationLocation +
        ' \\n Date : ' +
        this.dateSelected
    );
    this.router.navigate([
      '/selectbus',
      {
        sourceLocation: this.sourceLocation,
        destinationLocation: this.destinationLocation,
        dateSelected: this.dateSelected,
      },
    ]);
  }
}
