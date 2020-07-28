import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})

export class UserhomeComponent implements OnInit {

  depositeForm: FormGroup = new FormGroup({
  balance: new FormControl(null, Validators.required)
  });

  // variables
  username: string;
  balance = 0;
  newBalance = 0;
  id: string;

  private subscriptions = new Subscription();

  constructor(private userService: UserService, private routerService: Router, private SnackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.userService.user()
    .pipe(
      tap((res: User) => {
        this.username = res.username;
        this.balance = res.balance;
      }),
      catchError((error) => {
        this.SnackBar.open('Unauthorised access! Please login','X',{
          duration: 5000
        });
        this.routerService.navigate(['/login']);
        throw error;
      })
    ).subscribe();
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

  logout(){
    this.userService.logout()
    .pipe(
      tap((res: User) => {
      this.routerService.navigate(['/login']);
      }),
      catchError((error) => {
        this.SnackBar.open(error,'X',{
          duration: 5000
        });
        throw error;
      })
    ).subscribe();
  }

  updateBalance(){
    const userId = localStorage.getItem('_id');
    this.balance += this.newBalance;
    this.userService.UpdateBalance({_id: userId, balance: this.balance}).
  pipe(
    tap((res: User) => {
    this.routerService.navigate(['/user']);
    }),
    catchError((error) => {
      this.SnackBar.open('Invalid value!', 'X', {
        duration: 5000
      });
      throw error;
    })
  ).subscribe();
}

  withdrawBalance(){
    const userId = localStorage.getItem('_id');
    this.balance -= this.newBalance;
    this.userService.UpdateBalance({_id: userId, balance: this.balance}).
  pipe(
    tap((res: User) => {
    this.routerService.navigate(['/user']);
    }),
    catchError((error) => {
      this.SnackBar.open('Invalid value!', 'X', {
        duration: 5000
      });
      throw error;
    })
  ).subscribe();
  }
}
