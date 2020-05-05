import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { error } from 'protractor';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  username:String='';
  balance:Number=0;
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
  
  ngOnInit(): void {
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

}
