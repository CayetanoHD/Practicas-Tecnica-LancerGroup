import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertControllerService } from '../services/ionic-components/alert-controller.service';
import { StorageHelper } from '../helpers/storage.helper';
import { ProfilePage } from '../../pages/home/profile/profile.page';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<ProfilePage> {

  /**
   *
   */
  constructor() {
    
  }
  canDeactivate(component: ProfilePage, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) {
    debugger;
    if(component.tryOut){
      return true;
    }
    return false;
  }

  
}
