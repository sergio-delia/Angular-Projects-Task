import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

import { from, Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate: any;

  constructor(private authService: AuthService){}

  onSubmit(forms: NgForm){
    console.log(forms);
    this.authService.registerUser({email: forms.value.email, password: forms.value.password})
  }

  ngOnInit() {

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18)
  }

}
