import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-AdminLogin',
  templateUrl: './AdminLogin.component.html',
  styleUrls: ['./AdminLogin.component.css'],
})
export class AdminLoginComponent implements OnInit {
  public adminloginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminloginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    this.http.get<any>('http://localhost:3000/adminUsers').subscribe(
      (res) => {
        console.log(res);
        const user = res.find((a: any) => {
          return (
            a.email === this.adminloginForm.value.email &&
            a.password === this.adminloginForm.value.password
          );
        });
        if (user) {
          localStorage.setItem('adminId', user.aid);
          alert('Login Success');
          this.adminloginForm.reset();
          this.router.navigate(['/admindashboard']);
        } else {
          alert('Admin User not found');
        }
      },
      (err) => {
        ('Something went worng.!!');
      }
    );
  }
}
