import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async getUserInfo(): Promise<{ email: string; userId: string; firstName: string; lastName: string; }> {
    const info = await Storage.get({key: AppConstants.USER_INFORMATION});
    return JSON.parse(info.value) as {email: string, userId: string, firstName: string, lastName: string};
  }

  async setUserInfo(user: {email: string, userId: string, firstName: string, lastName: string}) {
    await Storage.set({key: AppConstants.USER_INFORMATION, value: JSON.stringify(user)});
  }
}
