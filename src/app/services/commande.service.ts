import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

const API_URL = environment.apiUrl;
// const API_KEY = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  currentArticle: any;
  // currentDetailArticle: any;
  constructor(private http: HttpClient, public authenticationService: AuthenticationService) { }

  getData(url) {
    // return this.http.get(`${API_URL}/${url}?token=rzt69auwt6o5jrn9el5s`);
    return this.http.get(`${API_URL}/${url}?token`);

  }

  // getDataDetail(url, id) {
  //   return this.http.get(`${API_URL}/${url}?${API_KEY}&order=${id}`);
  // }

}
