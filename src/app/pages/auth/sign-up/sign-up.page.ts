import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseCodeEnum } from 'src/app/core/enums/responseCode.enum';
import { StorageEnum } from 'src/app/core/enums/storage.enum';
import { FormsHelper } from 'src/app/core/helpers/forms.helper';
import { GeoLocationHelper } from 'src/app/core/helpers/geoLocationHelper';
import { LoginResponse } from 'src/app/core/models/loginResponse.model';
import { UserSignUp } from 'src/app/core/models/userSignUp.model';
import { AuthService } from 'src/app/core/services/authService/auth.service';
import { AlertControllerService } from 'src/app/core/services/ionic-components/alert-controller.service';
import { LoadingControllerService } from 'src/app/core/services/ionic-components/loading-controller.service';
import { StorageHelper } from '../../../core/helpers/storage.helper';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit, OnDestroy {

  form: FormGroup;
  model: UserSignUp = {
    userEmail: '',
    userPassword: '',
    userName: '',
    userPhoneNumber: '',
    userProfilePic: '',
    userLastName: '',
    type: 1,
    answer: 'UBER',
    userPasswordConfirm: ''
  }
  base64textString: string;
  constructor(
    private formHelper: FormsHelper,
    private authService: AuthService,
    private loadingCtrl: LoadingControllerService,
    private alertCtrl: AlertControllerService,
    private router: Router,
    private geoHelper: GeoLocationHelper,
    private storage: StorageHelper
  ) {

  }
  ngOnDestroy(): void {
    this.clear();
  }

  ngOnInit() {
    this.form = this.formHelper.createForm(this.model);
    this.form = this.formHelper.addValidationRequered(this.form, Object.keys(this.model));

    this.form.controls['userPasswordConfirm'].valueChanges.subscribe({
      next: (value) => {
        debugger;
        const passControl = this.form.get('userPassword');
        const passConfirmControl = this.form.get('userPasswordConfirm');
        if (passControl?.value !== value) {
          passConfirmControl?.setErrors({ notMatch: 'The pass is not the same' });
        }
        else {
          passConfirmControl?.setErrors(null);
        }
      }
    })

    this.form.controls['userEmail'].valueChanges.subscribe({
      next: (value) => {
        debugger;
        const userEmail = this.form.get('userEmail');
        if (!this.validarEmail(value)) {
          userEmail?.setErrors({ notValid: 'the email is not a valid email' });
        }
        else {
          userEmail?.setErrors(null);
        }
      }
    });

    this.form.controls['userPassword'].valueChanges.subscribe({
      next: (value) => {
        const userPass = this.form.get('userPassword');
        if(value.length < 8){
          userPass?.setErrors({error: 'MinLegth is 8'});
          return;
        }
        else if (value.length > 8 && value.length > 16){
          userPass?.setErrors({error: 'MaxLength is 16'});
          return
        }
        else{
          userPass?.setErrors(null);
        }

        debugger;
        let containsLettersAndNumbers = this.containsLettersAndNumber(value)

        if(!containsLettersAndNumbers){
          userPass?.setErrors({error: 'the password must contains letters and numbers'});
        }
        else{
          userPass?.setErrors(null);
        }
        
      }
    });
  }

  containsLettersAndNumber(value: string) {
    const result = /^(?=.*[a-zA-Z])(?=.*\d)/.test(value);
    return result
  }

  signUp() {

    this.model = this.form.value;
    if(!this.model.userProfilePic.length){
      this.alertCtrl.show('Select a picture', 'please, select a picture');
      return;
    }

    if (this.form.valid) {
      this.loadingCtrl.show();
      this.model.userName = `${this.model.userName} ${this.model.userLastName}`
      this.authService.singUp(this.model).subscribe({
        next: async (response: LoginResponse) => {
          response.code == ResponseCodeEnum.INCORRECT_PASSWORD ? this.alertCtrl.error('Error', 'This user already exist') : null;
          response.code == ResponseCodeEnum.SUCCESS ? this.signUpSuccess(response) : null;
          console.log(response)
        },
        complete: () => {
          this.loadingCtrl.dismiss();
        },
        error: (err) => {
          debugger;
          this.loadingCtrl.dismiss();
          this.alertCtrl.error('Error', JSON.stringify(err))
        },
      })
    }
  }

  async signUpSuccess(response: LoginResponse) {
    let location = await this.geoHelper.printCurrentPosition();
    await this.storage.setStorageKey(StorageEnum.GEOLOCATION, location);
    await this.storage.setStorageKey(StorageEnum.USERDATA, response);
    this.alertCtrl.show('Bienvenido', response.User.custumerName).then(()=> {
      this.clear();
      this.router.navigate(['home/profile']);
    });
  }

  redirectToSignIn() {
    this.router.navigate(['auth/sign-in']);
  }

  getClass(control: FormControl | AbstractControl) {
    return this.formHelper.getClassesBs(control)
  }

  validarEmail(email: string) {
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(email);
  }

  get f() {
    return this.form.controls;
  }

  uploadPhoto(event: any) {
    debugger;
    if (event.target.files.length > 0) {
      var files = event.target.files;
      var file = files[0];

      if (files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      }
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(btoa(binaryString));
    this.model.userProfilePic = this.base64textString;
    this.form.get('userProfilePic')?.setValue(`data:image/png;base64,${this.model.userProfilePic}`);
  }

  clear(){
    Object.keys(this.model).forEach(p => {
      this.model[p as keyof Object] = '' as any; 
    });
    this.model.type = 1;
    this.model.answer = 'UBER',
    this.model.userPasswordConfirm = ''
    this.form = this.formHelper.createForm(this.model);
  }
}
