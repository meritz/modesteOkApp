import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { NotificationHelperService } from './../../services/notification-helper.service';
import { DatePicker, DatePickerOptions } from '@ionic-native/date-picker/ngx';

import { DetailCommandeService } from '../../services/detail-commande.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  article ;
  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;
  selectedDate: Date;
  data: any = [] ;
  // inputData: Date;

  constructor(private bluetoothSerial: BluetoothSerial,
              private alertCtrl: AlertController,
              private modalController: ModalController,
              private commandeService: CommandeService,
              private detailCommandeService: DetailCommandeService,
              private notificationHelperService: NotificationHelperService,
              private navParams: NavParams,
              private datePicker: DatePicker, ) {
                bluetoothSerial.enable();
              }

  ngOnInit() {
    // this.article = this.detailCommandeService.getDetailData(`get-details-commande`, 'article.id_order')
    // .subscribe(data => {
    //   console.log(data);
    //   this.data = data;
    // });
    this.article = this.commandeService.currentArticle;
    console.log(this.commandeService.currentArticle);
    // this.article = this.detailCommandeService.currentArticle(`get-details-commande`, 'article.id_order');
  }

  closeModal() {
    this.modalController.dismiss();
  }

  startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;

    this.bluetoothSerial.discoverUnpaired().then((success) => {
      this.unpairedDevices = success;
      this.gettingDevices = false;
      success.array.forEach(element => {
        // alert(element.name);
      });
    },
    (err) => {
      console.log(err);
    });

    this.bluetoothSerial.list().then((success) => {
      this.pairedDevices = success;
    }, (err) => {

    });
  }
    success = (data) => alert(data);
    fail = (error) => alert(error);

  async selectDevice( address: any) {
    const alert = await this.alertCtrl.create({
      header: 'Connect!',
      message: 'veux tu connecter cette appareil pour inpression?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'connection faite',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
          }
        }
      ]
    });
    await alert.present();
  }

  async disconnect() {
    const alert = await this.alertCtrl.create({
      header: 'veux tu déconnecter?',
      message: 'Do you want to Disconnect?!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'deceonnecter',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
    await alert.present();
  }

  async setDate() {
    try {
      const datePickerOptions: DatePickerOptions = {
        mode: 'data',
        date: new Date(),
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT};

      this.selectedDate = await this.datePicker.show(datePickerOptions);

    } catch (e) {
       console.error(e);
    }
  }

  sendDataToSerial() {
    this.bluetoothSerial.write(
      this.write()
    ).then((success) => {

    }, (failure) => {

    });
  }

  declareLabelSize(pitchLengthOfLabel, effectivePrintWidth, effectivePrintLength): string {
    // return '{D' + pitchLengthOfLabel + ',' + effectivePrintWidth + ',' + effectivePrintLength + '|}';

    return   pitchLengthOfLabel + ',' + effectivePrintWidth + ',' + effectivePrintLength ;
  }

  titre(titreAlloresto): string {
    return titreAlloresto;
  }

  TXT_4SQUARE(formaAlloresto): string {
    return '\x1b\x21\x30';
  }

  TXT_NORMAL(formanormalAlloresto): string {
    return '\x1b\x21\x00';
  }

  TXT_ALIGN_LT(aligLeftlAlloresto): string {
    return '\x1b\x61\x00';
  }

  TXT_ALIGN_CT(aligCenterlAlloresto): string {
    return '\x1b\x61\x01';
  }

  TXT_ALIGN_RT(aligRightAlloresto): string {
    return '\x1b\x61\x02';
  }



  numero(numeroAlloresto): string {
    return numeroAlloresto.toUpperCase();
  }

  lieu(lieuAlloresto): string {
    return lieuAlloresto;
  }

  text(textAlloresto): string {
    return textAlloresto;
  }

  cleanBuffer(): string {
    return '\n';
  }
  tabBuffer(): string {
    return '&nbsp; &nbsp; &nbsp; &nbsp;';
  }

  printWriteCommand(id: string, x: string, y: string, text: string): string {
    // {PC000;0071,0131,1,1,S,00,B=Ornek Yaz|}
    return '{PC' + id + ';' + y + ',' + x + ',' + '1' + ',' + '1' + ',' + 'O' + ',' + '00' + ',' + 'B=' + text + '|}';
  }

  printDrawLine(xStartPoint, yStartPoint, xEndPoint, yEndPoint): string {
    return '{LC;' + yStartPoint + ',' + xStartPoint + ',' + yEndPoint + ',' + xEndPoint + ',' + '0' + ',' + '3|}';
  }

  generateBarcode(barcodeTotalNumber, x, y, rotationAngleOfBarcode, barcodeNumber): string {
    // {XB00;0091,0440,A,3,03,0,0128,+0000000000,000,1,00=>512345678|}
    // tslint:disable-next-line:max-line-length
    return '{XB' + barcodeTotalNumber + ';' + x + ',' + y + ',' + 'A,3,03,' + rotationAngleOfBarcode + ',0128,+0000000000,000,1,00=>5' + barcodeNumber + '|}';
  }

  printConditions(): string {
    return '';
  }

  write(): string {
    const toshibaPrintScript: string =
      this.cleanBuffer() +
      this.cleanBuffer() +
      this.TXT_4SQUARE('formaAlloresto') +
      this.TXT_ALIGN_CT('aligCenterlAlloresto') +
      this.titre('@LLORESTO365') +
      this.cleanBuffer() +
      this.TXT_NORMAL('formanormalAlloresto') +
      this.TXT_ALIGN_CT('aligCenterlAlloresto') +
      this.numero('TEL: 00288 93644252') +
      this.cleanBuffer() +
      this.TXT_ALIGN_LT('aligLeftlAlloresto') +
      this.lieu('lieu:Lome/TOGO avedji Sun City') +
      this.cleanBuffer() +
      this.text('******************************') +
      this.cleanBuffer() +
      this.text('==============================') +
      this.cleanBuffer() +
      this.TXT_ALIGN_LT('aligLeftlAlloresto') +
      this.text('NOM:      ') +
      this.TXT_ALIGN_RT('aligRightAlloresto') +
      this.article.nom_client +
      this.cleanBuffer() +
      this.TXT_ALIGN_LT('aligLeftlAlloresto') +
      this.text('REFERENCE:') +
      this.TXT_ALIGN_RT('aligRightAlloresto') +
      this.article.reference +
      this.cleanBuffer() +
      this.TXT_ALIGN_LT('aligLeftlAlloresto') +
      this.text('PRIX:     ') +
      this.TXT_ALIGN_RT('aligRightAlloresto') +
      this.article.id_order +
      this.text('  Fr CFA') +
      this.cleanBuffer() +
      this.TXT_ALIGN_LT('aligLeftlAlloresto') +
      this.text('NUMERO:') +
      this.TXT_ALIGN_RT('aligRightAlloresto') +
      this.article.date_add +
      this.cleanBuffer() +
      this.TXT_ALIGN_LT('aligLeftlAlloresto') +
      this.text('ADRESSE: ') +
      this.TXT_ALIGN_RT('aligRightAlloresto') +
      this.article.Client_adress +
      this.cleanBuffer() +
      this.TXT_ALIGN_LT('aligLeftlAlloresto') +
      this.text('DATE/HEURE:') +
      this.TXT_ALIGN_RT('aligRightAlloresto') +
      this.article.date_ajout +
      this.cleanBuffer() +
      this.TXT_ALIGN_LT('aligLeftlAlloresto') +
      this.text('LIVRAISON:') +
      this.TXT_ALIGN_RT('aligRightAlloresto') +
      this.selectedDate +
      this.cleanBuffer() +
      this.text('================================') +
      this.cleanBuffer() +
      this.TXT_ALIGN_CT('aligCenterlAlloresto') +
      this.text('MERCI DE VOTRE FIDELITE,') +
      this.cleanBuffer() +
      this.text('A BIENTOT') +
      this.cleanBuffer() +
      this.TXT_ALIGN_CT('aligCenterlAlloresto') +
      this.text('Les plats vendus ne sont') +
      this.cleanBuffer() +
      this.text('ni echanges ni repris') +
      this.cleanBuffer() +
      this.cleanBuffer() +
      this.text('') +
      this.cleanBuffer() +
      this.printConditions();
    return toshibaPrintScript;
  }

}
