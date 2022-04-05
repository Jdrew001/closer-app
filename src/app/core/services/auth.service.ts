import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { DeviceService } from './device.service';
import { TokenService } from './token.service';

import { SplashScreen } from '@capacitor/splash-screen';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  isAuthenticated: boolean = false;

  constructor(
    private tokenService: TokenService,
    private deviceService: DeviceService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  async validateRefreshToken() {
    const refreshToken = await this.tokenService.refreshToken;
    const deviceUUID = await this.deviceService.getDeviceUUID();
    this.authService.refreshToken({token: refreshToken, deviceUUID}).subscribe(async res => {
      if (res.shouldRedirectToLogin) {
        this.router.navigateByUrl('/login', { replaceUrl:true });
        this.isAuthenticated = false;
        return;
      }

      // update refreshToken and 
      await this.tokenService.setAppToken(res.token);
      await this.tokenService.setRefreshToken(res.refreshToken);

      // redirect user
      this.router.navigateByUrl('/tabs/tab1', { replaceUrl:true });

      // wait and hide splash screen
      setTimeout(async () => {await SplashScreen.hide()}, 1000);
      this.isAuthenticated = true;
    });
  }

  async logoutUser() {
    await this.tokenService.removeAllTokens();

    setTimeout(() => {
      // redirect user
      this.router.navigateByUrl('/login', { replaceUrl:true });
    }, 500);
  }
}
