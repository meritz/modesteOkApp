import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class DetailCommandeService {
  currentDetailArticle: any;

  constructor(private http: HttpClient) { }

  getDetailData(url, id) {
    return this.http.get(`${API_URL}/${url}?${API_KEY}&order=${id}`);
  }
}
