import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertControllerService {

    constructor(private alertController: AlertController) {

    }

    async confirmation(
        ok: (params?: any) => void,
        message: string,
        title: string,
        confirmText: string,
        cancel: (params?: any) => void,
        ) {

        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: title,
            animated: true,
            message: message,
            mode:'ios',
            buttons: [
                {
                    text: 'Not',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        cancel();
                    }
                }, {
                    text: confirmText,
                    handler: () => {
                        ok();
                    }
                }
            ],
            id:'ionic-alert'
        });
        await alert.present();

    }

    async show(header: string, message: string, textbtn?:string) {
        const alert = await this.alertController.create({
            backdropDismiss: false,
            cssClass: 'my-custom-class',
            header: header,
            message: message,
            mode: 'ios',
            buttons: [
                {
                    text: textbtn || 'Ok',
                    handler: () => {
                    }
                },
            ],
            id:'ionic-alert'


        });
        await alert.present();

        const { role } = await alert.onDidDismiss();
    }

    async error(header: string, message: string) {
        const alert = await this.alertController.create({
            backdropDismiss: false,
            cssClass: 'my-custom-class',
            header: header,
            message: message,
            mode: 'ios',
            buttons: [
                {
                    text: 'Ok',
                    cssClass:'text-danger',
                    handler: () => {
                    }
                },
            ],
            id:'ionic-alert'


        });
        
        await alert.present();

        await alert.onDidDismiss();
    }


}
