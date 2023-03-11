import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertControllerService } from '../services/ionic-components/alert-controller.service';
import { StorageHelper } from '../helpers/storage.helper';
import { ProfilePage } from '../../pages/home/profile/profile.page';
import { StorageEnum } from '../enums/storage.enum';

@Injectable({
  providedIn: 'root'
})
export class CanActivateSignIn implements CanActivate {

  /**
   *
   */
  constructor(private storageHelper: StorageHelper, private router: Router) {
    
  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let value = false;
    const result = await this.storageHelper.getStorageKey(StorageEnum.USERDATA);
      !result ? value = true : this.router.navigate(['home/profile']);
      return value;
  }
  

  
}
