import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationHelperService {

  constructor(public toastCtrl: ToastController,
              public alertCtrl: AlertController) { }

  async showToast(message: string, duration: any, showCloseButton: boolean) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: showCloseButton,
      position: 'top',
      duration: duration,
    });
    toast.present();
  }

  async showAlert(title: string, subTitle: string, buttons: string[]) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['Appareil connecter']
    });
    await alert.present();
  }

  async showAlertWithDialog(param: any) {
    const alert = await this.alertCtrl.create({
      header: param.header,
      message: param.message,
      buttons: param.buttons,
    });

    await alert.present();
  }

}
