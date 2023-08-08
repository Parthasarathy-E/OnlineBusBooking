import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../user-auth.service';
@Component({
  selector: 'app-SignUp',
  templateUrl: './SignUp.component.html',
  styleUrls: ['./SignUp.component.css'],
})
export class SignUpComponent implements OnInit {
  public signupForm!: FormGroup;
  router: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userAuth: UserAuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/g)
          ),
        ],
      ],
      mobileNumber: ['', Validators.required, Validators.pattern('[1-9]{10}')],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(''),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(''),
        ],
      ],
    });
  }
  signUp() {
    this.userAuth.userSignUp(this.signupForm.value);
    this.signupForm.reset();
  }
}
