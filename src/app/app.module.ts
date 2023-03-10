import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomPipesModule } from './core/pipes/customPipes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
    
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, KeychainTouchId],
  bootstrap: [AppComponent],
})
export class AppModule {}
