import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private helper: HelperService) {}

  getSelectedBusDetails() {
    return this.helper.get('/selectedBus/1');
  }
  updateSelectedBusDetails(data: any) {
    return this.helper.patch('/selectedBus/1', data);
  }
  setSelectedBus(data: any) {
    return this.helper.post('/selectedBus', data);
  }
  removeSelectedBus() {
    return this.helper.delete('/selectedBus/1');
  }
  getAllBookingHistory() {
    return this.helper.get('/bookedSeats/1');
  }
  updateBookedHistory(data: any) {
    return this.helper.patch('/bookedSeats/1', data);
  }
}
