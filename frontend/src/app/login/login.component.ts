import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import {tap, catchError, take, takeUntil} from 'rxjs/operators';
import { UserResponse } from '../models/user.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OnDestroyMixin} from "@w11k/ngx-componentdestroyed";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy{

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)

  });

  private subscriptions = new Subscription();

  constructor(private routingService: Router,
              private userService: UserService,
              protected localStorage: LocalStorage,
              private snackBar: MatSnackBar) { }

  ngOnInit(){
    }

  ngOnDestroy() {
    
    this.subscriptions.unsubscribe();

    }

  moveToRegister(){
    this.routingService.navigate(['/register']);
  }

  login(){
    this.userService.login(JSON.stringify(this.loginForm.value)).
    pipe(
      tap((res: UserResponse) => {
        localStorage.setItem('_id', res.user._id);
        this.snackBar.open('Login Successful!', 'X', {
          duration: 4000
        });
        this.routingService.navigate(['/user']);
      }),
      catchError((error) => {
        this.snackBar.open('Incorrect email or password!', 'X', {
          duration: 4000
        });
        throw error;
      })
    ).subscribe();
  }
}
