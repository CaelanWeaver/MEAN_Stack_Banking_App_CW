import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UpdateBalance} from './updateBalance.model';
import { LocalStorage } from '@ngx-pwa/local-storage';
import {UserResponse, User} from './models/user.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient, protected localStorage:LocalStorage) { }

  register(body:any): Observable<User>{
    return this._http.post<User>('users/register',body,{
      observe:'body', 
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  login(body:any): Observable<UserResponse>{
    return this._http.post<UserResponse>('users/login',body,{
      observe:'body', 
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  user(): Observable<User>{
    return this._http.get<User>('users/user',{
      observe:'body', 
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }

  logout(){
    return this._http.get('users/logout',{
      observe:'body', 
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }

  UpdateBalance(update:UpdateBalance){
    return this._http.post('users/update', update)
  }
}
