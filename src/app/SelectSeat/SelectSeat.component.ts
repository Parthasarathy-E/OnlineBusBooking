import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-SelectSeat',
  templateUrl: './SelectSeat.component.html',
  styleUrls: ['./SelectSeat.component.css'],
  standalone: true,
  imports: [CommonModule, MatGridListModule],
})
export class SelectSeatComponent implements OnInit {
  seats: Array<{ index: number; value: boolean; booked: false }> = [];
  SelectedBus!: any;
  isLogedIn: Boolean = false //
  constructor(private route: ActivatedRoute, private router: Router,  private http : HttpClient) {}

  ngOnInit() {
    // let qureyStr = this.route.snapshot.paramMap.get('selectedBus');
    this.http.get<any>("http://localhost:3000/selectedBus/1")
   .subscribe(res=>{
    this.SelectedBus =  res;
    for (let i = 1; i < 41; i++) {
      let index = this.SelectedBus.Seats.findIndex((a:any) => a.index == i)
      if(index != -1){
        this.seats.push(this.SelectedBus.Seats[index]);
        continue;
      }
      this.seats.push({ index: i, value: false, booked: false });
    }
   });
   this.http.get('http://localhost:3000/userDetails/1').subscribe(res => { //
      this.isLogedIn = res.hasOwnProperty('uid');   //
    });  //

  }
  selectSeat(seat: any) {
    seat.value = !seat.value;
  }
  bookBus() {
    this.http.patch<any>("http://localhost:3000/selectedBus/1", Object.assign(this.SelectedBus, {Seats: this.seats.filter((a) => a.value)})).subscribe(res=>{
console.log(res)
  });
    this.router.navigate([
      '/seatselectedusersdetails',
    ]);
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
