import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
  server_url: 'http://alloresto365.com/api/';

  constructor() { }

  get base_url() {
    return this.server_url;
  }
}
