import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignInPageRoutingModule } from './sign-in-routing.module';

import { SignInPage } from './sign-in.page';
import { AuthService } from '../../../core/services/authService/auth.service';
import { NativeBiometricHelper } from '../../../core/helpers/native-biometric.helper';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
import { RuntimePlatformHelper } from 'src/app/core/helpers/runtime-platform.helper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SignInPage],
  providers:[
    AuthService, 
    NativeBiometricHelper,
    RuntimePlatformHelper,
  ]
})
export class SignInPageModule {}
