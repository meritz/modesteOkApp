import { AuthenticationService } from './../../services/authentication.service';
import { CommandeService } from '../../services/commande.service';
import { ModalPage } from '../modal/modal.page';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  data: any = [] ;



  constructor(private authService: AuthenticationService,
              private commandeService: CommandeService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.commandeService.getData(`get-liste-commande`)
    .subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }

  async openModal(article) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        custom_id: this.commandeService.currentArticle = article,
      }
    });
    await modal.present();
  }

  logout() {
    this.authService.logout();
  }

}
