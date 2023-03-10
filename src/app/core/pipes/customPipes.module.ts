import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [DomSanitizerPipe ],
  providers: [DomSanitizerPipe],
  exports:[DomSanitizerPipe]
})
export class CustomPipesModule {}
