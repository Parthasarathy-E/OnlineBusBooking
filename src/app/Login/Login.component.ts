import { NgIf, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  public loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.d)(?=.[a-z])(?=.*[A-Z]).{3,}'),
        ],
      ],
    });
  }
  login() {
    this.http.get<any>('http://localhost:3000/signupUsers').subscribe(
      (res) => {
        console.log(res);
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          alert('Login Success');
          this.http
            .patch<any>(
              'http://localhost:3000/userDetails/1',
              Object.assign(user, { id: 1 })
            )
            .subscribe((res) => console.log(res));
          this.loginForm.reset();
          localStorage.setItem('userId', user.uid);
          this.location.back();
          this.router.navigate(['/home']);
        } else {
          alert('user not found');
        }
      },
      (err) => {
        ('Something went worng.!!');
      }
    );
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  signUpUser() {
    this.router.navigate(['/signup']);
  }
}
