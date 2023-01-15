import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import { from, Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit{
@Output() closeSidenav = new EventEmitter<void>();

isAuth: boolean = false;
authSubscription: Subscription;

constructor(private authService: AuthService){}

ngOnInit() {

  this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    this.isAuth = authStatus;
  })
}


ngOnDestroy() {
  this.authSubscription.unsubscribe()
}


  onClose(){
    this.closeSidenav.emit();
  }

  onLogout(){
    console.log('Click');

    this.authService.logout();
    this.onClose();
  }
}
