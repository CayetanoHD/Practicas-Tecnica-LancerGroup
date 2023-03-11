import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseCodeEnum } from 'src/app/core/enums/responseCode.enum';
import { LoginResponse } from 'src/app/core/models/loginResponse.model';
import { UserLogin } from 'src/app/core/models/userLogin.model';
import { AuthService } from 'src/app/core/services/authService/auth.service';
import { LoadingControllerService } from 'src/app/core/services/ionic-components/loading-controller.service';
import { FormsHelper } from '../../../core/helpers/forms.helper';
import { AlertControllerService } from '../../../core/services/ionic-components/alert-controller.service';
import { StorageHelper } from '../../../core/helpers/storage.helper';
import { StorageEnum } from '../../../core/enums/storage.enum';
import { NativeBiometricHelper } from '../../../core/helpers/native-biometric.helper';
import { Platform } from '@ionic/angular';
import { RuntimePlatformHelper } from 'src/app/core/helpers/runtime-platform.helper';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  form: FormGroup;
  model: UserLogin = {
    userEmail: '',
    userPassword:''
  }
  constructor(
    private formHelper: FormsHelper, 
    private authService: AuthService, 
    private loadingCtrl: LoadingControllerService,
    private alertCtrl: AlertControllerService,
    private router: Router,
    private storage: StorageHelper,
    private nativeBiometric: NativeBiometricHelper,
    private platform: RuntimePlatformHelper,

    ) { 

  }

  ngOnInit() {
    this.form = this.formHelper.createForm(this.model);
    this.form = this.formHelper.addValidationRequered(this.form, Object.keys(this.model));
  }

  signIn(){
    
    if(this.form.valid){
      this.loadingCtrl.show();
      this.authService.signIn(this.form.value).subscribe({
        next: async (response: LoginResponse) => {
        response.code == ResponseCodeEnum.INCORRECT_PASSWORD ? this.alertCtrl.error('Error', 'the password is not correct') : null;
        response.code == ResponseCodeEnum.USER_NOT_FOUND ? this.alertCtrl.error('Error', 'this user does not exist') : null;
        response.code == ResponseCodeEnum.SUCCESS ? this.loginSuccess(response): null;  
        console.log(response)
        },
        complete: ()=> {
          this.loadingCtrl.dismiss();
        },
        error: (err) => {
          this.loadingCtrl.dismiss();
          this.alertCtrl.error('Error', JSON.stringify(err))
        },
      })
    }
  }

   async loginSuccess(response: LoginResponse){
      await this.storage.setStorageKey(StorageEnum.USERDATA, response);
      this.openNativeBiometric()
  }

  async openNativeBiometric() {
    if (this.platform.getPlatformName() == 'web') {
      this.alertCtrl.error(
        'Biometric is not available',
        'Biometric is not available in web version, but you can continue'
      ).then(()=> {
        this.router.navigate(['home/profile'])
      });
      return;
    }

    const isAvailable = await this.nativeBiometric.isAvailable();
    if (isAvailable.isAvailable) {
      await this.nativeBiometric
        .verifyIdentity({
          title: 'LancerGroup App - Put your finger or face',
          description: 'Your biometric data will be used for authentication on this device',
        })
        .then(async () => {
            this.alertCtrl.show('Biometric', 'Biometric success').then(()=> {
              this.router.navigate(['home/profile'])
            });
        })
        .catch((error) => {
        });
    }
  }

  redirectToSignUp(){
    this.router.navigate(['auth/sign-up']);
  }
}
