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

  async showAlert(header: string, subHeader: string, message:string, buttons: string[]) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'ok.',
      buttons: ['Appareil connecter']
    });
    await alert.present();
  }

  async showAlertWithDialog(param: any) {
    const alert = await this.alertCtrl.create({
      header: param.header,
      subHeader: param.subHeader,
      message: param.message,
      buttons: param.buttons,
    });

    await alert.present();
  }

}
