import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project_dashboard';

  isSignedIn = false;

  constructor(private authService: AuthService, public firebaseService: FirebaseService){}

  ngOnInit(){

    this.authService.initAuthListener();
    /*
    if(localStorage.getItem('user') !== null){
      this.firebaseService.isLoggedIn = true;
      this.isSignedIn=true;
    } else{
      this.isSignedIn = false;
    } */
  }

  /*
  async onSignup(email: string, password: string) {
    await this.firebaseService.signup(email, password);
    if(this.firebaseService.isLoggedIn){
      this.isSignedIn = true;
    }
  }


  async onSignin(email: string, password: string) {
    await this.firebaseService.signin(email, password);
    if(this.firebaseService.isLoggedIn){
      this.isSignedIn = true;
    }
  }

  handleLogout(){
    this.isSignedIn = false;
    this.firebaseService.logout();
  }
*/

}
