import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { error } from 'protractor';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { UpdateBalance } from '../updateBalance.model';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  depositeForm : FormGroup = new FormGroup({
  balance:new FormControl(null,Validators.required)
  });

  //variables
  username:String='';
  balance:number=0;
  newBalance:number=0;
  id:string='';

  constructor(private _user:UserService, private _router:Router, private _snackBar:MatSnackBar) {}
  
  ngOnInit(): void {
    this._user.user()
    .pipe(
      tap((res:User)=>{
        this.username=res.username;
        this.balance=res.balance;
      }),
      catchError((error)=>{
        this._snackBar.open("Unauthorised access! Please login",'X',{
          duration:5000
        });
        this._router.navigate(['/login']);
        throw error;
      })
    ).subscribe();
  }

  logout(){
    this._user.logout()
    .pipe(
      tap((res:User)=>{
      console.log(res);
      this._router.navigate(['/login']);
      }),
      catchError((error)=>{
        this._snackBar.open(error,'X',{
          duration:5000
        });
        throw error;
      })
    ).subscribe();
  }

  updateBalance(){
    const userId = localStorage.getItem('_id');
    this.balance+= this.newBalance;
    const update ={
      _id: userId,
      balance: this.balance
    } as UpdateBalance;

  this._user.UpdateBalance(update).
  pipe(
    tap((res:User)=>{
    console.log(res);
    this._router.navigate(['/user']);
    }),
    catchError((error)=>{
      this._snackBar.open('Invalid value!','X',{
        duration:5000
      });
      throw error;
    })
  ).subscribe();
}

  withdrawBalance(){
    const userId = localStorage.getItem('_id');
    this.balance-= this.newBalance;
    const update ={
      _id: userId,
      balance: this.balance
    } as UpdateBalance;

  this._user.UpdateBalance(update).
  pipe(
    tap((res:User)=>{ 
    console.log(res); 
    this._router.navigate(['/user']);
    }),
    catchError((error)=>{
      this._snackBar.open("Invalid value!",'X',{
        duration:5000
      });
      throw error;
    })
  ).subscribe();
  }
}
