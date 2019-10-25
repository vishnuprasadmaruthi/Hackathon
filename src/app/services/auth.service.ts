import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import firebase from "firebase";



(window as any).global = window;
const firebaseConfig = {
  apiKey: "AIzaSyD27G4rarO5xXVX7A6xGMJePUydOKJyEVg",
  authDomain: "buildworkshackathon.firebaseapp.com",
  databaseURL: "https://buildworkshackathon.firebaseio.com",
  projectId: "buildworkshackathon",
  storageBucket: "buildworkshackathon.appspot.com",
  messagingSenderId: "572407078825"
  }

const config = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  storageBucket: firebaseConfig.storageBucket
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();
@Injectable()
class AuthService {
  
  auth0 = new auth0.WebAuth({
    clientID: 'NiZf9lIOupiCFHII64L8OWtnG8wGBvx4',
    domain: 'nedbailov.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/'
  });
  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private setSession(authResult): void {
    firebase.database().ref('users/').once("value").then((snapshot)=> {
      const users = snapshot.val();
      if(!users) {
        return firebase.database().ref().child('users').push({
          email: authResult.idTokenPayload.name,
          test: 'boo'
        })
      } 
      else {
        const user = Object.keys(users).find((key) => {
          return users[key].email === authResult.idTokenPayload.name
        })
        if(!user) {
          firebase.database().ref().child('users').push({
            email: authResult.idTokenPayload.name,
            test: 'boo'
          })
        }
      }
      
      })

    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('email', authResult.idTokenPayload.name);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

}

export { AuthService, firebase};