import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  standalone: true,
  imports: [MatCardModule, CommonModule],
})
export class HomeComponent implements OnInit {
  public isDisplayed: boolean = true;
  display: any;
  constructor() {
    this.timer(2);
  }
  ngOnInit() {
    this.hideAnimatedDiv();
  }
  timer(minute: number) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log('finished');
        clearInterval(timer);
      }
    }, 1000);
  }
  hideAnimatedDiv() {
    setTimeout(() => {
      this.isDisplayed = false;
    }, 120000);
  }
}
