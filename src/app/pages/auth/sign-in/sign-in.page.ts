import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserLogin } from 'src/app/core/models/userLogin.model';
import { FormsHelper } from '../../../core/helpers/forms.helper';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  form: FormGroup | any;
  model: UserLogin = {
    userEmail: '',
    userPassword:''
  }
  constructor(private formHelper: FormsHelper) { 

  }

  ngOnInit() {
    this.form = this.formHelper.createForm(this.model);
    this.form = this.formHelper.addValidationRequered(this.form, Object.keys(this.model));
  }

}
