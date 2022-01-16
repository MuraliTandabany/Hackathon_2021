import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  rootUrl = 'http://localhost:51171';

  constructor(private httpClient: HttpClient) {}

  get(url) {
    return this.httpClient.get(this.rootUrl + url);
  }

  post(url, body) {
    return this.httpClient.post(this.rootUrl + url, body);
  }
}
