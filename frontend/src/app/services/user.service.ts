import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UpdateBalance} from '../models/updateBalance.model';
import {UserResponse, User} from '../models/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  register(body: any): Observable<User>{
    return this.httpClient.post<User>('users/register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body: any): Observable<UserResponse>{
    return this.httpClient.post<UserResponse>('users/login', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  user(): Observable<User>{
    return this.httpClient.get<User>('users/user', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  logout(){
    return this.httpClient.get('users/logout', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  UpdateBalance(update: UpdateBalance){
    return this.httpClient.post('users/update', update);
  }
}
