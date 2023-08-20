import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from './helper.service';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  userSignInStatus = new EventEmitter<boolean>(false);
  adminSignInStatus = new EventEmitter<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private helper: HelperService,
    private logger: NGXLogger
  ) {}

  userLogIn(email: string, password: string) {
    this.helper
      .get(`/signupUsers?email=${email}&password=${password}`)
      .subscribe(
        (result: any) => {
          if (result && result.length === 1) {
            localStorage.setItem('userId', result[0].uid);
            this.logger.error(
              'User - ' + result[0].uid + ' - Login Successfully'
            );
            this.userSignInStatus.emit(true);
            alert('Login Success');
          } else {
            this.logger.error('Login Error: User not found');
            this.userSignInStatus.emit(false);
            alert('user not found');
          }
        },
        (err) => {
          this.logger.error(err);
          alert('Something went wrong');
        }
      );
  }

  userSignUp(user: any) {
    this.helper.post('/signupUsers', user).subscribe(
      (result) => {
        if (result) {
          this.logger.error('Signup successfull');
          alert('Signup Successfull');
          this.router.navigate(['/login']);
        } else {
          this.logger.error('User not able to signup. please try again');
          alert('User not able to signup. please try again');
        }
      },
      (err) => {
        this.logger.error(err);
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
            this.logger.error(
              'Admin - ' + result[0].aid + ' - Login Successfully'
            );
            this.adminSignInStatus.emit(true);
            alert('Login Success');
          } else {
            this.logger.error('Login Error: Admin not found');
            this.adminSignInStatus.emit(false);
            alert('Admin not found');
          }
        },
        (err) => {
          this.logger.error(err);
          alert('Something went wrong');
        }
      );
  }
}
