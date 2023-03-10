import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingControllerService {

    constructor(private alertController: LoadingController) {

    }

    async show() {
        const loading = await this.alertController.create({
            message: 'Loading...',
            spinner: 'circles',
          });
          await loading.present();
    }

    async dismiss(){
        this.alertController.dismiss();
    }
}
