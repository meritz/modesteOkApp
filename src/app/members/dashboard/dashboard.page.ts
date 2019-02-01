import { AuthenticationService } from './../../services/authentication.service';
import { CommandeService } from '../../services/commande.service';
import { DetailCommandeService } from '../../services/detail-commande.service';
import { ModalPage } from '../modal/modal.page';
import { DetailPage } from '../detail/detail.page';
import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  data: any;



  constructor(private authService: AuthenticationService,
              private commandeService: CommandeService,
              private modalController: ModalController,
              private nav: NavController, private router: Router) { }

  ngOnInit() {
    this.commandeService.getData(`get-liste-commande`)
    .subscribe(data => {
      console.log(data);
      this.data = data;
    });
    console.log(this.commandeService.currentArticle);
  }


  opendetail(plats) {
    this.commandeService.currentArticle = plats;
    this.nav.navigateForward(['/members/detail']);
  }

  logout() {
    this.authService.logout();
  }

}
