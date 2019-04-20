import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AdventureService {

  private serverUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getAdvList(adventureType :string){
    return this.http.get(this.serverUrl + '/adventures/adventureType=' + adventureType);
  }

  }
