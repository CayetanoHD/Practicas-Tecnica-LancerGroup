import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from './core/guard/can-activate.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo:'auth/sign-in',
    pathMatch:'full',
    
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'home',
    canActivate:[CanActivateGuard],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
