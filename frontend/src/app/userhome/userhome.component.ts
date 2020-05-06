import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { error } from 'protractor';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { UpdateBalance } from '../updateBalance.model';
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  depositeForm : FormGroup = new FormGroup({
  balance:new FormControl(null,Validators.required)
  });

  ngOnInit(): void {
    }
    
  username:String='';
  balance:number=0;
  newBalance:number=0;
  id:string='';
  constructor(private _user:UserService, private _router:Router) { 
    this._user.user()
    .subscribe(
      data=>{this.displayName(data);this.displayDeposite(data)},
      _error=>this._router.navigate(['/login'])
    )
  }
  displayName(data){
    this.username= data.username;
  }

  displayDeposite(data){
    this.balance= data.balance;
  }
  
  logout(){
    this._user.logout()
    .subscribe(
      data=>{console.log(data);this._router.navigate(['/login'])},
      error=>console.error(error)
    )
  }
  updateBalance(){
    let update ={
      _id:'5eb14eea6072b52544cdd5ad',
      balance:4321
    } as UpdateBalance;
  this._user.UpdateBalance(update).
  subscribe(
    data=>{console.log(data);this._router.navigate(['/user'])},
    error=>console.error(error)
  );
  }
}
