import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //
import { HttpClient } from '@angular/common/http'; //

@Component({
  selector: 'app-Contactus',
  templateUrl: './Contactus.component.html',
  styleUrls: ['./Contactus.component.css'],
})
export class ContactusComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {}
}
