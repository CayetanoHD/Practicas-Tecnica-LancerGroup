import { Component, OnInit } from '@angular/core';
import { StorageEnum } from 'src/app/core/enums/storage.enum';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { LoginResponse } from 'src/app/core/models/loginResponse.model';
import { AlertControllerService } from 'src/app/core/services/ionic-components/alert-controller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  userModel: LoginResponse

  constructor(
    private alertCtrl: AlertControllerService,
    private storage: StorageHelper,
    private router: Router
  ) { }

  async ionViewWillEnter() {
    this.userModel = await this.storage.getStorageKey(StorageEnum.USERDATA);
    console.log(this.userModel);
  }

  async logOut(){

    this.alertCtrl.confirmation(async ()=> {
      await this.storage.clear();
      this.router.navigate(['auth/sign-in']);
    }, 'Are you sure to exit?', 'Exit', 'Yes', ()=>{})

  }

}
