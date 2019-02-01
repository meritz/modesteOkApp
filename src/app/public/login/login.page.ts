import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, NavController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public login_form: FormGroup;
  swipeOption: boolean = true;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService) {

                this.login_form = this.formBuilder.group({
                  user_name: ['', Validators.compose([Validators.required])],
                  password: [null, Validators.required],
                });
              this.login_form.reset();
              }

  ngOnInit() {
  }

  onLoginClicled() {
    this.authService.login(this.login_form.value);
    this.login_form.reset();
     // this.navCtrl.navigateRoot('/app/tabs/(home:home)');
    }

}
