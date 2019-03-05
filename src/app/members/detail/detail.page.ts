import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../services/commande.service';

import { ModalPage } from '../modal/modal.page';
import { DetailCommandeService } from '../../services/detail-commande.service';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  data: any;
  plats;

  constructor(private commandeService: CommandeService,
              private detailCommandeService: DetailCommandeService,
              private modalController: ModalController,
              private nav: NavController, private router: Router) { }

  ngOnInit() {
    this.detailCommandeService.getDetailData(`get-details-commande`, this.plats = this.commandeService.currentArticle)
    .subscribe(data => {
       console.log(data);
       this.data = data;
     });
    //  console.log(this.commandeService.currentArticle);
    //  this.detailCommandeService.getDetailComdeData(`get-produits-commande`, this.plats = this.commandeService.currentArticle)
    // .subscribe(data => {
    //    console.log(data);
    //    this.data = data;
    //  });
  }


  async opendetail(article: any,) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        custom_id: this.detailCommandeService.currentDetailArticle = article,
      }
    });
    await modal.present();
  }


}
