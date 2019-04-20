import { Injectable } from '@angular/core';
import {User} from '../model/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private serverUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  create(user: User) {
    return this.http.post(this.serverUrl + '/user' , user );
  }
  checkUserExist(email: string, password: string){
    return this.http.get(this.serverUrl + '/user/email=' + email + '/password=' + password);
  }
  saveLoggedInUser(userData: any){
    localStorage.setItem('userData', JSON.stringify(userData.user));
  }
  getLoggedInUser(){
    return JSON.parse(localStorage.getItem('userData'));
  }
  deleteLoggedInUser(){
    localStorage.removeItem('userData');
  }
  isAuthenticated(){
    return this.getLoggedInUser() ? true: false;
  }
}
