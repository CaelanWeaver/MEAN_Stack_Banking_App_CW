import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import {tap, catchError} from 'rxjs/operators';
import { UserResponse } from '../models/user.model';
import { throwError } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm : FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,Validators.required)
  });
  constructor(private _router:Router, private _user:UserService, protected localStorage:LocalStorage, private _snackBar: MatSnackBar) { }

  ngOnInit(){
    }

  moveToRegister(){
    this._router.navigate(['/register']);
  }

  login(){
    this._user.login(JSON.stringify(this.loginForm.value)).
    pipe(
      tap((res:UserResponse)=>{
        localStorage.setItem('_id',res.user._id);
        this._snackBar.open("Login Successful","X",{
          duration:3000
        }) 
        this._router.navigate(['/user']);
      }),
      catchError((error)=>{
        this._snackBar.open('Incorrent email or password','X',{
          duration:4000
        });
        throw error;
      })
    ).subscribe();
  }
}
