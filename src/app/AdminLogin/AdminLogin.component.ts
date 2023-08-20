import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { UserAuthService } from '../user-auth.service';

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
    private router: Router,
    private userAuth: UserAuthService
  ) {}

  ngOnInit(): void {
    this.adminloginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.pattern('')]],
    });
  }
  login() {
    this.userAuth.adminLogin(
      this.adminloginForm.value.email,
      this.adminloginForm.value.password
    );
    this.userAuth.adminSignInStatus.subscribe((result) => {
      if (result) {
        this.adminloginForm.reset();
        this.router.navigate(['/admindashboard']);
      }
    });
  }
}
