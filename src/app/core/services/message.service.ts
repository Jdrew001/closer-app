import { Injectable } from '@angular/core';
import { ToastButton, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _toast: HTMLIonToastElement;

  constructor(
    private toastController: ToastController
  ) { }

  async showMessage(opts: ToastOptions, buttons?:ToastButton[]) {
    opts.buttons = buttons;
    const toast = await this.toastController.create(opts);
    await toast.present();
  }
}

/**
 * header: 'Toast header',
      message: 'Click to Close',
      icon: 'information-circle',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
 * 
 */
