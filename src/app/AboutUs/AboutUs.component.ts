import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //
import { HttpClient } from '@angular/common/http'; //

@Component({
  selector: 'app-AboutUs',
  templateUrl: './AboutUs.component.html',
  styleUrls: ['./AboutUs.component.css'],
})
export class AboutUsComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {}
}
