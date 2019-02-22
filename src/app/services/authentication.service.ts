import { Platform, Events } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppGlobals } from '../global';



export const TOKEN_KEY = 'auth_token';

// const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  headers;
  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage,
     private plt: Platform,
      private http: HttpClient,
      // private environments: environment,
      private global: AppGlobals,
       private events: Events) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
   }

   setToken(data) {
    // console.log('auth_token', data.token);
    return this.storage.set(TOKEN_KEY, data.auth_token).then(res => {
      // localStorage.setItem('name', data.user.name);
      this.headers = { headers: new HttpHeaders().set('token', data.auth_token) };

      this.authenticationState.next(true);
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      this.headers = { headers: new HttpHeaders().set('token', res) };
      if (res) {
        this.authenticationState.next(true);
      } else {
        this.authenticationState.next(false);
      }
    });
  }



  login(data): Observable<any> {
    return this.http.post(`${this.global.baseAppUrl}user-authentication`, data);
  }

  logout() {
    this.storage.clear().then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  async getToken() {
    return await this.storage.get(TOKEN_KEY);
  }
}
