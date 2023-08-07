import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  signInStatus = new EventEmitter<boolean>(false);
  URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}
  userLogIn(email: string, password: string) {
    this.get(`/signupUsers?email=${email}&password=${password}`).subscribe(
      (result: any) => {
        if (result && result.length === 1) {
          this.patch('/userDetails/1', result).subscribe((res) =>
            console.log(res)
          );
          localStorage.setItem('userId', result.uid);
          this.signInStatus.emit(true);
          alert('Login Success');
        } else {
          this.signInStatus.emit(false);
          alert('user not found');
        }
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
  userSignUp(user: any) {
    this.post('/signupUsers', user).subscribe(
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
  patch(url: string, data: any) {
    return this.http.patch(this.URL + url, data);
  }
  get(url: string) {
    return this.http.get(this.URL + url);
  }
  post(url: string, data: any) {
    return this.http.post(this.URL + url, data);
  }
}
