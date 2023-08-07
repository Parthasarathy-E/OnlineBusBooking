import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private http: HttpClient) {}

  patch(url: string, data: any) {
    return this.http.patch(environment.JSONServerBaseURL + url, data);
  }

  get(url: string) {
    return this.http.get(environment.JSONServerBaseURL + url);
  }

  post(url: string, data: any) {
    return this.http.post(environment.JSONServerBaseURL + url, data);
  }

  delete(url: string) {
    return this.http.delete(environment.JSONServerBaseURL + url);
  }
}
