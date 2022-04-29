import { LoginDTO } from 'src/app/pages/login/models/login.model';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { DeviceService } from './device.service';
import { TokenService } from './token.service';

import { SplashScreen } from '@capacitor/splash-screen';
import { BehaviorSubject, Observable, throwError as observableThrowError } from 'rxjs';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CoreConstants } from '../core.constant';
import { AuthModel, ResetEmailModel, ResetPasswordResultModel } from '../models/auth.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isReset: boolean = false;
  protected baseUrl: string;

  constructor(
    private tokenService: TokenService,
    private deviceService: DeviceService,
    private authService: AuthenticationService,
    private navController: NavController,
    private httpClient: HttpClient,
    private userService: UserService
  ) {
    this.baseUrl = `${environment.base_url}Authentication/`;
  }

  async validateRefreshToken() {
    const refreshToken = await this.tokenService.refreshToken;
    const deviceUUID = await this.deviceService.getDeviceUUID();
    if (refreshToken) {
      this.authService.refreshToken({token: refreshToken, deviceUUID}).subscribe(async res => {
        if (res.shouldRedirectToLogin) {
          this.navController.navigateRoot('/reset-password', { replaceUrl:true });
          this.isAuthenticated$.next(false);
          return;
        }

        // update refreshToken
        await this.tokenService.setAppToken(res.token);
        await this.tokenService.setRefreshToken(res.refreshToken);

        // redirect user
        this.navController.navigateForward('/tabs/dashboard', { replaceUrl:true });

        // wait and hide splash screen
        setTimeout(async () => {await SplashScreen.hide()}, 2000);
        this.isAuthenticated$.next(true);
      });

      return;
    }
    this.isAuthenticated$.next(false);
    this.navController.navigateRoot('/reset-password', { replaceUrl:true });
    setTimeout(async () => {await SplashScreen.hide()}, 1000);
  }

  async verifyAccountCode(code: string) {
    const deviceUUID = await this.deviceService.getDeviceUUID();
    const userEmail = await this.userService.getUserEmail();
    return this.httpClient.get(`${this.baseUrl}${CoreConstants.VERIFY_URL}/${code}/${userEmail}/${deviceUUID}/${this.isReset}`) as Observable<AuthModel>;
  }

  reissueCode(email: string) {
    return this.httpClient.get(`${this.baseUrl}${CoreConstants.REISSUE_VERIFICATION}/${email}`) as Observable<AuthModel>;
  }

  sendEmailForReset(email: string) {
    return this.httpClient.get(`${this.baseUrl}${CoreConstants.EMAIL_FOR_RESET}/${email}`) as Observable<ResetEmailModel>;
  }

  sendPasswordForReset(password: string, userId: string) {
    return this.httpClient.post(`${this.baseUrl}${CoreConstants.PASSWORD_RESET}`, { userId: userId, password: password }) as Observable<AuthModel>;
  }

  async logoutUser() {
    await this.tokenService.removeAllTokens();

    setTimeout(() => {
      this.navController.navigateBack('/login', { replaceUrl:true });
    }, 500);
  }
}
