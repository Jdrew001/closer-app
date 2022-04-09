import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async getUserInfo() {
    const info = await Storage.get({key: AppConstants.USER_INFORMATION});
    return info.value;
  }

  getUserId(): Promise<string> {
    return (async () => (await Storage.get({key: AppConstants.USER_ID})).value)();
  }

  async setUserInfo(user: any) {
    await Storage.set({key: AppConstants.USER_INFORMATION, value: user});
  }

  async setUserId(userId: string) {
    await Storage.set({key: AppConstants.USER_ID, value: userId});
  }
}
