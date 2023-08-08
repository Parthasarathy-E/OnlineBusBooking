import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormsModule,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { format } from 'date-fns';

@Component({
  selector: 'app-SelectLocation',
  templateUrl: './SelectLocation.component.html',
  styleUrls: ['./SelectLocation.component.css'],
  standalone:true,
  imports:[MatFormFieldModule, MatInputModule,MatButtonModule,CommonModule,FormsModule]
})
export class SelectLocationComponent implements OnInit {
  sourceLocation:any;
  destinationLocation:any;
  dateSelected: any;
  isLogedIn: Boolean = false //
  public travelsForm!:FormGroup;

  toSelected: any;
  validateTimeRange: any;
  validateDateRange: any;
  minDate: string = format(new Date(), 'yyyy-MM-dd');
  constructor(private formBuilder :FormBuilder, private http : HttpClient,private router :Router) { }

  ngOnInit(  ):void
  {
    this.toSelected="";
    this.travelsForm =this.formBuilder.group({
      Source:['',Validators.required],
      Destination:['',Validators.required],
      Date:['',Validators.required]
    })
    // this.travelsForm = this.formBuilder.group({
    //   selectedDate: ['', [Validators.required, this.validateDateRange.bind(this)]]
    // });
  }
  searchBtnDisabled(){
    let disabled = this.sourceLocation == "" || this.sourceLocation == null ||
    this.destinationLocation == "" || this.destinationLocation == null ||
    this.dateSelected == "" || this.dateSelected == null;
    return disabled;
  }
  goTo() {
    this.router.navigate([
      '/selectbus',
      {
        sourceLoc: this.sourceLocation,
        destinationLoc: this.destinationLocation,
        dateSelected: this.dateSelected,
      },
    ]);
  }
  go_To(toPath: any){  //
    this.router.navigate([toPath]) //
  } //
  logout(){ //
    this.http.put('http://localhost:3000/userDetails/1', {id: 1}).subscribe(res => { //
      alert('Logout Successfully');
      setTimeout(() => {
        this.go_To('/');
      },2000);
    });
  }

}
