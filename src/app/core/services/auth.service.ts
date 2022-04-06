import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { DeviceService } from './device.service';
import { TokenService } from './token.service';

import { SplashScreen } from '@capacitor/splash-screen';
import { BehaviorSubject } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private tokenService: TokenService,
    private deviceService: DeviceService,
    private authService: AuthenticationService,
    private navController: NavController
  ) { }

  async validateRefreshToken() {
    const refreshToken = await this.tokenService.refreshToken;
    const deviceUUID = await this.deviceService.getDeviceUUID();
    if (refreshToken) {
      this.authService.refreshToken({token: refreshToken, deviceUUID}).subscribe(async res => {
        if (res.shouldRedirectToLogin) {
          this.navController.navigateRoot('/login', { replaceUrl:true });
          this.isAuthenticated$.next(false);
          return;
        }
  
        // update refreshToken and 
        await this.tokenService.setAppToken(res.token);
        await this.tokenService.setRefreshToken(res.refreshToken);
  
        // redirect user
        this.navController.navigateForward('/tabs/tab1', { replaceUrl:true });
  
        // wait and hide splash screen
        setTimeout(async () => {await SplashScreen.hide()}, 1000);
        this.isAuthenticated$.next(true);
      });

      return;
    }
    this.isAuthenticated$.next(false);
    this.navController.navigateRoot('/login', { replaceUrl:true });
    setTimeout(async () => {await SplashScreen.hide()}, 1000);
  }

  async logoutUser() {
    await this.tokenService.removeAllTokens();

    setTimeout(() => {
      // redirect user
      this.navController.navigateBack('/login', { replaceUrl:true });
    }, 500);
  }
}
