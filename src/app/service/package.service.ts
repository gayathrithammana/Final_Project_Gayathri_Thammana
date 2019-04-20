import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Package} from '../model/package.model'
// import 'rxjs/add/operator/toPromise';
@Injectable({
  providedIn: 'root'
})

export class PackageService {

  private serverUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getPackageList(){
    return this.http.get(this.serverUrl + '/packagelist');
  }

 
}
