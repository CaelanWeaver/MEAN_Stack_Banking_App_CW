import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
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
      this._snackBar.open("invalid form",'X',{duration:4000}); return;
    }
    this._userService.register(JSON.stringify(this.registerForm.value)).
    pipe(
      tap((res:User)=>{
      console.log(res);
      this._router.navigate(['/login']);
    },
    catchError((error)=>{
      this._snackBar.open("Invalid value",'X',{
        duration:5000
      });
      throw error;
    })
  )).subscribe();
  }
}