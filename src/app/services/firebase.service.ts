import { Injectable } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;
  API_KEY = 'AIzaSyB7rn36z3fNH9brZIrEHi_PMhr-Dk5KwPY';
  API_URl = 'https://fir-angular-auth-5ada1-default-rtdb.europe-west1.firebasedatabase.app';
  token: string | null = '';

  constructor(public firebaseAuth: AngularFireAuth, public router: Router, public http: HttpClient, private afs: AngularFirestore) { }

  async signin(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user));
      this.setToken();
      this.router.navigate(['/dashboard']);
    })
  }


  async signup(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user));
      this.setToken();
    })
  }

  setToken(){
    let userStorage = JSON.parse(localStorage['user']);
    console.log(userStorage);
    this.token = userStorage.stsTokenManager.accessToken;
  }


  checkToken():boolean{
    let userStorage = JSON.parse(localStorage['user']);
    let expiration = userStorage.stsTokenManager.expirationTime
    let now = Date.now();
    if(now < expiration){
      console.log('Query permessa');
      return true;
    } else {
      console.log('Tempo scaduto sessione');
      this.logout();
      return false;
    }
  }


  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    window.location.reload();
  }

  addProject(body: object){
    if(!this.token){
      this.setToken();
    }
    return this.http.post(`${this.API_URl}/progetti.json?auth=${this.token}`, body);
  }

  getProject(){
    if(!this.token){
      this.setToken();
    }

        return this.http.get(`${this.API_URl}/progetti.json?auth=${this.token}`);
      //VERIFICARE ERRORE FORM ALL'AGGIUNTA DI UN PROGETTO
  }


  addTasks(id: string, body:object){
    return this.afs.collection('progetti').valueChanges();

    /* Cambiare logica e creare nuova collection tasks */

    return this.http.patch(`${this.API_URl}/progetti/${id}.json?auth=${this.token}`, body);
  }


  getTasks(id: string){
    return this.http.get(`${this.API_URl}/progetti/${id}.json?auth=${this.token}`);
  }

}
