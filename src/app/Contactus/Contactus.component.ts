import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //
import { HttpClient } from '@angular/common/http';  //

@Component({
  selector: 'app-Contactus',
  templateUrl: './Contactus.component.html',
  styleUrls: ['./Contactus.component.css']
})
export class ContactusComponent implements OnInit {

  isLogedIn: Boolean = false //
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/userDetails/1').subscribe(res => { //
      this.isLogedIn = res.hasOwnProperty('uid');   //
    });  //
  }
  goTo(toPath: any){  //
    this.router.navigate([toPath]) //
  } //
  logOut(){ //
    this.http.put('http://localhost:3000/userDetails/1', {id: 1}).subscribe(res => { //
      alert('Logout Successfully');
      setTimeout(() => {
        this.goTo('/');
      },2000);
    });
  }
}
