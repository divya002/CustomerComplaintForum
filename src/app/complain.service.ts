import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { Response, Http } from '@angular/http'
import { Router } from '@angular/router';
import 'rxjs'
import 'rxjs/Rx'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class ComplainService {
  path = environment.path;

  constructor(private http: HttpClient, private router: Router) { }
  getComplaint() {
    return this.http.get<any>(this.path + '/complains');
  };
  postComplaint(complainData) {
    return this.http.post<any>(this.path + '/complains',complainData);
  }
  getSingleComplaint(id) {
    return this.http.get<any>(this.path + '/complains/'+id);
  };
  postSingleComplaint(complainData,id) {
    return this.http.patch<any>(this.path + '/complains/'+id,complainData);
  }
}
