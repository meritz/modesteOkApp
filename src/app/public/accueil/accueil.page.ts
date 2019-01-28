import { NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { LoginPage } from './../login/login.page';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {


  params: Object;
  pushPage: any;

  slideOpts = {
    effect: 'flip'
  };

  constructor() {

  }

  ngOnInit() {
  }

  async openPage() {

  }


}
