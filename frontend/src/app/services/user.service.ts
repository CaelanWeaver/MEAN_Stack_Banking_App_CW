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
    return this.httpClient.post<User>('http://127.0.0.1:3000/users/register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body: any): Observable<UserResponse>{
    return this.httpClient.post<UserResponse>('http://127.0.0.1:3000/users/login', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  user(): Observable<User>{
    return this.httpClient.get<User>('http://127.0.0.1:3000/users/user', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  logout(){
    // remove local ip when using to heroku, purely for testing purposes (e.g.users/logout)
    return this.httpClient.get('http://127.0.0.1:3000/users/logout', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  UpdateBalance(update: UpdateBalance){
    return this.httpClient.post('http://127.0.0.1:3000/users/update', update);
  }
}
