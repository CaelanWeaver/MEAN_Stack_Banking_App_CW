import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private routingService: Router) { }

  ngOnInit(){
    }

  moveToRegister(){
    this.routingService.navigate(['/register']);
  }

  moveToLogin(){
    this.routingService.navigate(['/login']);
  }
}
