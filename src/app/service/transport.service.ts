import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransportSiteService {
  private serverUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTransportSites(transportType: string){
    return this.http.get(this.serverUrl + '/transportSites/transportType=' + transportType);
  }
}
