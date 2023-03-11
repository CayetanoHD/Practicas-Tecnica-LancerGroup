import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateSignIn } from 'src/app/core/guard/can-activate-signIn.guard';

import { AuthPage } from './auth.page';
import { SignInPage } from './sign-in/sign-in.page';


const routes: Routes = [
  {
    path: '',
    component: AuthPage
  },
  {
    path: 'sign-up',
    canActivate:[CanActivateSignIn],
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'sign-in',
    canActivate:[CanActivateSignIn],
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
