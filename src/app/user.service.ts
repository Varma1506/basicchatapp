import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http : HttpClient) { }
  public url = 'http://192.168.1.9:3000';
  public loginObj;
  public userData;

  public submitService(obj){
    return this.http.post<any>(this.url + '/user/sign-up',obj);
  }
  public loginService(obj){
    return  this.http.post<any>(this.url + '/user/login',obj);
  }
}
