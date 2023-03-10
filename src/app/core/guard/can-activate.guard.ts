import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageHelper } from '../helpers/storage.helper';
import { StorageEnum } from '../enums/storage.enum';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {

  /**
   *
   */
  constructor(private storageHelper: StorageHelper, private router: Router) {
    
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      debugger;
    const result = await this.storageHelper.getStorageKey(StorageEnum.USERDATA) != null;
    !result ? this.router.navigate(['auth/sign-in']): ()=> {};
    return result;
  }
  
}
