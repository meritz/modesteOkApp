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

  public loginForm: FormGroup;
  isLoading: boolean = false;


  constructor(private formBuilder: FormBuilder,
              public toastController: ToastController,
              private authService: AuthenticationService) {

                this.loginForm = this.formBuilder.group({
                  email: ['', [Validators.required, Validators.email]],
                  password: ['', [Validators.required, Validators.minLength(8)]],
                });
              }

  ngOnInit() {
  }

  login() {
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log('response', response);
        if (response.user_auth === 'success') {
          this.isLoading = true;
          this.authService.setToken(response);
        } else {
          this.isLoading = false;
        }

      });
    }
 
    async presentToast(msg) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }
}
