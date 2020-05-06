import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
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
  constructor(private _router:Router, private _user:UserService, protected localStorage:LocalStorage) { }

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
    this._user.login(JSON.stringify(this.loginForm.value))
    .subscribe(
      data=>{localStorage.setItem('_id',  data['_id']); this._router.navigate(['/user']);},
      error=>console.error(error)
      )
  }
}
