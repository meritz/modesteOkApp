import { Platform, Events } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GlobalServiceService } from '../services/global-service.service';


const TOKEN_KEY = 'auth-token';
const API_URL = environment.apiUrl;
// const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  variablee: any;
  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform, private http: HttpClient, private global: GlobalServiceService, private events: Events) {
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

  

  login(data) {
    this.http.post(this.global.server_url + 'user-authentication', data).subscribe((res_data) => {
			console.log(res_data);
			console.log("login inside");
			this.authenticationState.next(true);
			this.events.publish('login_event', res_data['token']);
			this.storage.set('user_profile', res_data['user_profile']);
			console.log(this.storage);
			this.storage.set(TOKEN_KEY, res_data['Token']);
			return this.storage.set(TOKEN_KEY, res_data['token']);
		}, (error) => {
			console.error(error);
			let detail_error = error.error['message'];
			alert(detail_error);
		});
  }

  logout() {
    return this.storage.clear().then((data) => {
			console.log(data);
			console.log("logged out");
			this.authenticationState.next(false);
		});
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
