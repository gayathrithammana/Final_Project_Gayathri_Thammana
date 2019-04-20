import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccomodationService {
  private serverUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAccomodationSites(){
    return this.http.get(this.serverUrl + '/accomodationSites');
  }
}
