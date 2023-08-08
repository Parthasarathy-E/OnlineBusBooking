import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
JSONServerBaseURL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  patch(url: string, data: any) {
    return this.http.patch(this.JSONServerBaseURL + url, data);
  }

  get(url: string) {
    return this.http.get(this.JSONServerBaseURL + url);
  }

  post(url: string, data: any) {
    return this.http.post(this.JSONServerBaseURL + url, data);
  }

  delete(url: string) {
    return this.http.delete(this.JSONServerBaseURL + url);
  }
}
