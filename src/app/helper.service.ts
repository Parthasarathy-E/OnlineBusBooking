import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  patch(url: string, data: any) {
    return this.http.patch(this.URL + url, data);
  }

  get(url: string) {
    return this.http.get(this.URL + url);
  }

  post(url: string, data: any) {
    return this.http.post(this.URL + url, data);
  }

  delete(url: string) {
    return this.http.delete(this.URL + url);
  }
}
