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
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private _router:Router, private _user:UserService) { }

  ngOnInit(){
    }

  moveToRegister(){
    this._router.navigate(['/register']);
  }

  moveToLogin(){
    this._router.navigate(['/login']);
  }



}
