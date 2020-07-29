import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ExpressApiService {

  constructor( private http : HttpClient) {}

  insert_record(data) : Observable<any> {
    return this.http.post("http://localhost:4000/insertdata", data)   
  }

  update_record(data) : Observable<any> {
    return this.http.post("http://localhost:4000/updatedata", data)   
  }

}
