import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/core/guard/can-deactivate.guard';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    canDeactivate:[CanDeactivateGuard],
    component: ProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
