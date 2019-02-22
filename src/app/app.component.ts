import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  swipeOption: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  logout() {
    this.swipeOption = true;
    this.authenticationService.logout();
  }

  initializeApp() {
      this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.statusBar.backgroundColorByHexString('#d33939');
      this.splashScreen.hide();

      this.authenticationService.authenticationState.subscribe(state => {
        // if (state !== null) {
        if (state) {
          this.router.navigate(['members', 'dashboard']);
        } else {
          this.router.navigate(['login']);
        }
      // }
      });

    });
  }
}
