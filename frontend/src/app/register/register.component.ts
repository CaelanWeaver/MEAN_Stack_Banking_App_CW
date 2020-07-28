import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required)

  });

  private subscriptions = new Subscription();

  constructor(private routingService: Router, private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){

    this.subscriptions.unsubscribe();

  }

  moveToLogin(){
    this.routingService.navigate(['/login']);
  }

  register(){
    if (!this.registerForm.valid || (this.registerForm.controls.password.value !== this.registerForm.controls.cpass.value)){
      this.snackBar.open('Invalid form!', 'X', {duration: 4000});
      return;
    }
    this.userService.register(JSON.stringify(this.registerForm.value)).
    pipe(
      tap((res: User) => {
      this.snackBar.open('Registration Successful!', 'X', {
        duration: 3000
      });
      this.routingService.navigate(['/login']);
    }),
    catchError((error) => {
      this.snackBar.open(error, 'X', {
        duration: 4000
      });
      throw error;
    })
  ).subscribe();
  }
}
