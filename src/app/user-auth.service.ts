import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  userSignInStatus = new EventEmitter<boolean>(false);
  adminSignInStatus = new EventEmitter<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private helper: HelperService
  ) {}

  userLogIn(email: string, password: string) {
    this.helper
      .get(`/signupUsers?email=${email}&password=${password}`)
      .subscribe(
        (result: any) => {
          if (result && result.length === 1) {
            localStorage.setItem('userId', result[0].uid);
            this.userSignInStatus.emit(true);
            alert('Login Success');
          } else {
            this.userSignInStatus.emit(false);
            alert('user not found');
          }
        },
        (err) => {
          alert('Something went wrong');
        }
      );
  }

  userSignUp(user: any) {
    this.helper.post('/signupUsers', user).subscribe(
      (result) => {
        if (result) {
          alert('Signup Successfull');
          this.router.navigate(['/login']);
        }
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  adminLogin(email: string, password: string) {
    this.helper
      .get(`/adminUsers?email=${email}&password=${password}`)
      .subscribe(
        (result: any) => {
          if (result && result.length === 1) {
            localStorage.setItem('adminId', result[0].aid);
            this.adminSignInStatus.emit(true);
            alert('Login Success');
          } else {
            this.adminSignInStatus.emit(false);
            alert('user not found');
          }
        },
        (err) => {
          alert('Something went wrong');
        }
      );
  }
}
