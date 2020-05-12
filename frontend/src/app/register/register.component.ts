import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { tap, catchError } from 'rxjs/operators';
import { User, UserResponse } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    username:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
    cpass:new FormControl(null,Validators.required)
    
  })
  constructor(private _router:Router, private _userService:UserService, private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  moveToLogin(){
    this._router.navigate(['/login']);
  }

  register(){
    if(!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)){
      this._snackBar.open("Invalid form!",'X',{duration:4000}); return;
    }
    this._userService.register(JSON.stringify(this.registerForm.value)).
    pipe(
      tap((res:User)=>{
      this._snackBar.open("Registration Successful!" ,"X",{
        duration:3000
      })
      this._router.navigate(['/login']);
    },
    catchError((error)=>{
      this._snackBar.open(error,'X',{
        duration:4000
      });
      throw error;
    })
  )).subscribe();
  }
}