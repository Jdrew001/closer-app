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
    private httpClient: HttpClient
  ) {
    this.baseUrl = `${environment.base_url}`;
  }

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
    this.navController.navigateRoot('/login', { replaceUrl:true });
    setTimeout(async () => {await SplashScreen.hide()}, 1000);
  }

  verifyAccountCode(dto) {
    return this.httpClient.get(`${this.baseUrl}${CoreConstants.VERIFY_URL}`).pipe(
      catchError(error => observableThrowError(error.message || 'Server error'))
    ) as Observable<AuthModel>; //should be post
  }

  reissueCode(userId: string) {
    return this.httpClient.get(`${this.baseUrl}${CoreConstants.REISSUE_VERIFICATION}`).pipe(
      catchError(error => observableThrowError(error.message || 'Server error'))
    ) as Observable<AuthModel>; //should be post
  }

  sendEmailForReset(email: string) {
    return this.httpClient.get(`${this.baseUrl}${CoreConstants.EMAIL_FOR_RESET}`).pipe(
      catchError(error => observableThrowError(error.message || 'Server error'))
    ) as Observable<ResetEmailModel>; //should be post
  }

  sendPasswordForReset(password: string, userId: string) {
    return this.httpClient.get(`${this.baseUrl}${CoreConstants.PASSWORD_RESET}`).pipe(
      catchError(error => observableThrowError(error.message || 'Server error'))
    ) as Observable<ResetPasswordResultModel>; //should be post
  }

  async logoutUser() {
    await this.tokenService.removeAllTokens();

    setTimeout(() => {
      // redirect user
      this.navController.navigateBack('/login', { replaceUrl:true });
    }, 500);
  }
}
