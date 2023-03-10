import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { FormsHelper } from '../../core/helpers/forms.helper';
import { GeoLocationHelper } from 'src/app/core/helpers/geoLocationHelper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AuthPage],
  providers:[FormsHelper, GeoLocationHelper]
})
export class AuthPageModule {}
