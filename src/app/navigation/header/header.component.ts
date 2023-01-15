import { Observable, Subscription } from 'rxjs';
import { OnInit } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'
import * as PROJECTS from '../../projects/projects.action'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Output() sidenavToggle = new EventEmitter<void>();

  isAuth: boolean = false;
  authSubscription: Subscription;

  ongoingTraining$: Observable<boolean>

  constructor(private store: Store<fromRoot.State>, private authService: AuthService){}


  ngOnInit(){
   this. authSubscription = this.authService.authChange.subscribe(authStatus =>{
      this.isAuth = authStatus;
    })


    this.ongoingTraining$ = this.store.select(fromRoot.getIsLoading);
    this.ongoingTraining$.subscribe(test => console.log(test)
    )

    this.store.dispatch(new PROJECTS.StopLoading)

  }


  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }
}
