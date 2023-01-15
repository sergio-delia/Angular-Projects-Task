import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';

import {MatSnackBar} from '@angular/material/snack-bar';
import { TasksService } from '../tasks/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
      private afAuth: AngularFireAuth,
      private snackbar: MatSnackBar,
      private tasksService: TasksService
  ) { }

  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  initAuthListener(){
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/dashboard'])
      } else {
        if(this.tasksService.tasksSubscription){
          this.tasksService.tasksSubscription.map(task => { task.unsubscribe()})
        }
        this.isAuthenticated = false;
        this.authChange.next(false)
        this.router.navigate(['/login'])
      }
    })
  }


  registerUser(authData: AuthData){
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password).then(result =>{
      console.log(result);
    }).catch(error =>{
       this.snackbar.open(error.message, null, {
         duration: 3000
       })
    })
  }


  login(authData: AuthData){
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(result);
    }).catch(error => {
       this.snackbar.open(error.message, null, {
         duration: 3000
       })
    })
  }


  logout(){
    this.afAuth.signOut();
  }

  isAuth(){
    return this.isAuthenticated;
  }


}
