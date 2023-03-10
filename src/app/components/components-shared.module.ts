import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { CustomPipesModule } from '../core/pipes/customPipes.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomPipesModule
  ],
  declarations: [ProfileInfoComponent],
  exports: [ProfileInfoComponent],
  providers:[]
})
export class ComponentSharedModule {}
