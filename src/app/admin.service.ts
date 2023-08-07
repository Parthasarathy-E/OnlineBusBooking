import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private helper: HelperService) {}
  getBusList() {
    return this.helper.get('/BusList');
  }
  getBusById(id: any) {
    return this.helper.get('/BusList' + id);
  }
  updateBusById(id: any, value: any) {
    return this.helper.patch('/BusList' + id, value);
  }
  toggleBusStatus(id: any, value: any) {
    this.getBusById(id).subscribe((res) => {
      res = Object.assign(res, { status: value });
      this.updateBusById(id, res).subscribe((res1) => {
        alert('Updated');
      });
    });
  }
  addBusToList(data: any) {
    return this.helper.post('/BusList', data);
  }
}
