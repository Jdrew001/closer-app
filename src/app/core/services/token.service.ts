import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { AppConstants } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  get appToken(): Promise<string> {
    return (async () => {
      return (await Storage.get({key: AppConstants.APP_TOKEN})).value;
    })();
  }

  get refreshToken(): Promise<string> {
    return (async () => {
      return (await Storage.get({key: AppConstants.REFRESH_TOKEN})).value;
    })();
  }

  async setAppToken(token: string) {
    await Storage.set({key: AppConstants.APP_TOKEN, value: token});
  }

  async setRefreshToken(token: string) {
    await Storage.set({key: AppConstants.REFRESH_TOKEN, value: token});
  }

  async removeAllTokens() {
    await this.removeRefreshToken();
    await this.removeAppToken();
  }

  async removeRefreshToken() {
    await Storage.remove({key: AppConstants.REFRESH_TOKEN});
  }

  async removeAppToken() {
    await Storage.remove({key: AppConstants.REFRESH_TOKEN});
    await Storage.remove({key: AppConstants.APP_TOKEN});
  }
}
