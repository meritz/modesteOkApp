import { Platform, Events } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';



const TOKEN_KEY = 'auth-token';
const API_URL = environment.apiUrl;
// const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  variablee: any;
  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage,
     private plt: Platform,
      private http: HttpClient,
       private events: Events) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
   }

   checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }



  login(user) {
    return this.storage.set(TOKEN_KEY, user).then(() => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
