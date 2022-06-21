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
import { AuthModel, ResetEmailModel, ValidationCodeModel, ValidationType } from '../models/auth.model';
import { GenericReponse } from '../models/generic-response.model';
import { Storage } from '@capacitor/storage';
import { AppConstants } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isReset: boolean = false;
  protected baseUrl: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthenticationService,
    private navController: NavController,
    private httpClient: HttpClient,
    private userService: UserService
  ) {
    this.baseUrl = `${environment.base_url}Authentication/`;
  }

  get validationType(): Promise<string> {
    return (async () => {
      return (await Storage.get({key: AppConstants.VALIDATION_TYPE})).value;
    })();
  }

  async setValidationType(value: 'NEW_ACCOUNT' | 'RESET_PASSWORD' | 'NEW_DEVICE_LOGIN') {
    await Storage.set({key: AppConstants.VALIDATION_TYPE, value: value});
  }

  async validateRefreshToken() {
    const refreshToken = await this.tokenService.refreshToken;
    if (refreshToken) {
      this.authService.refreshToken({token: refreshToken}).subscribe(async res => {
        if (res.data.shouldRedirectToLogin) {
          this.navController.navigateRoot('/login', { replaceUrl:true });
          this.isAuthenticated$.next(false);
          return;
        }

        // update refreshToken
        await this.tokenService.setAppToken(res.data.token);
        await this.tokenService.setRefreshToken(res.data.refreshToken);

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

  async verifyAccountCode(code: string): Promise<Observable<GenericReponse<AuthModel>>> {
    const userInfo = await this.userService.getUserInfo();
    const validationType = await this.validationType;
    const body: ValidationCodeModel = {
      code: code,
      email: userInfo.email,
      validationType: (validationType as 'NEW_ACCOUNT' | 'RESET_PASSWORD' | 'NEW_DEVICE_LOGIN')
    }
    return this.httpClient.post(`${this.baseUrl}${CoreConstants.VERIFY_URL}`, body) as Observable<GenericReponse<AuthModel>>;
  }

  reissueCode(email: string): Observable<GenericReponse<AuthModel>> {
    return this.httpClient.get(`${this.baseUrl}${CoreConstants.REISSUE_VERIFICATION}/${email}`) as Observable<GenericReponse<AuthModel>>;
  }

  sendEmailForReset(email: string): Observable<GenericReponse<ResetEmailModel>> {
    return this.httpClient.get(`${this.baseUrl}${CoreConstants.EMAIL_FOR_RESET}/${email}`) as Observable<GenericReponse<ResetEmailModel>>;
  }

  sendPasswordForReset(password: string, userId: string): Observable<GenericReponse<AuthModel>> {
    return this.httpClient.post(`${this.baseUrl}${CoreConstants.PASSWORD_RESET}`, { userId: userId, password: password }) as Observable<GenericReponse<AuthModel>>;
  }

  async logoutUser() {
    await this.tokenService.removeAllTokens();

    setTimeout(() => {
      this.navController.navigateBack('/login', { replaceUrl:true });
    }, 500);
  }
}
