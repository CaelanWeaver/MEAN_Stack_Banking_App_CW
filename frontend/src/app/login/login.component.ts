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
    if (!this.loginForm.valid){
      console.log('invalid'); return;
    }
    //console.log(JSON.stringify(this.loginForm.value))
    this._user.login(JSON.stringify(this.loginForm.value)).
    pipe(
      tap((res:UserResponse)=>{
        localStorage.setItem('_id',res.user._id); 
        this._router.navigate(['/user']);
        
      }),
      catchError((error)=>{
        this._snackBar.open(error,'X',{
          duration:4000
        });
        throw error;
      })
    ).subscribe();
    // .subscribe(
    //   data=>{console.log(data['user']['_id']); this._router.navigate(['/user']);},
    //   error=>console.error(error)
    //   )
  }
  
  
}
