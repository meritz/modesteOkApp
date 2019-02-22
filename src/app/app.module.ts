import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalPageModule } from './members/modal/modal.module';
// import { LoginPageModule } from './public/login/login.module';
import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { AppGlobals } from './global';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     IonicStorageModule.forRoot(),
     HttpClientModule,
     ModalPageModule,
    //  LoginPageModule,
     FormsModule,
     ReactiveFormsModule,
    ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    DatePicker,
    AppGlobals,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
