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

  async showGenericMessage(opts: ToastOptions, buttons?:ToastButton[]) {
    opts.buttons = buttons;
    const toast = await this.toastController.create(opts);
    await toast.present();
  }

  async showSuccessMessage(header: string = null, message: string = null, duration = 2000) {
    const toast = await this.toastController.create({
      icon: 'checkmark-circle',
      position: 'bottom',
      duration: duration,
      color: 'secondary',
      header: header ? header: 'Success',
      message: message ? message: 'Successful Action',
      cssClass: 'success-message-style'
    });
    await toast.present();
  }

  async showErrorMessage(header: string = null, message: string = null, duration = 2000) {
    const toast = await this.toastController.create({
      icon: 'alert-circle',
      position: 'bottom',
      duration: duration,
      color: 'secondary',
      header: header ? header: 'Error',
      message: message ? message: 'An error has occurred',
      cssClass: 'error-message-style'
    });
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
