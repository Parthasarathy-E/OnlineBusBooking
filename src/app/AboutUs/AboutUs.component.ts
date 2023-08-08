import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //
import { HttpClient } from '@angular/common/http';  //

@Component({
  selector: 'app-AboutUs',
  templateUrl: './AboutUs.component.html',
  styleUrls: ['./AboutUs.component.css']
})
export class AboutUsComponent implements OnInit {
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
  logout(){ //
    this.http.put('http://localhost:3000/userDetails/1', {id: 1}).subscribe(res => { //
      alert('Logout Successfully');
      setTimeout(() => {
        this.goTo('/');
      },2000);
    });
  }

}
