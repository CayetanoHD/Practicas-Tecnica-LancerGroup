import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResponseCodeEnum } from 'src/app/core/enums/responseCode.enum';
import { LoginResponse } from 'src/app/core/models/loginResponse.model';
import { UserLogin } from 'src/app/core/models/userLogin.model';
import { AuthService } from 'src/app/core/services/authService/auth.service';
import { LoadingControllerService } from 'src/app/core/services/ionic-components/loading-controller.service';
import { FormsHelper } from '../../../core/helpers/forms.helper';
import { AlertControllerService } from '../../../core/services/ionic-components/alert-controller.service';

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
    ) { 

  }

  ngOnInit() {
    this.form = this.formHelper.createForm(this.model);
    this.form = this.formHelper.addValidationRequered(this.form, Object.keys(this.model));
  }

  signIn(){
    debugger;
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

  loginSuccess(response: LoginResponse){
    this.alertCtrl.show('Bienvenido', response.User.custumerName)
  }
}
