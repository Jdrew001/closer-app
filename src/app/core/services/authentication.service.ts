import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {EMPTY, Observable, throwError as observableThrowError} from 'rxjs';
import {tap} from 'rxjs/operators';
import { LoginDTO } from 'src/app/pages/login/models/login.model';
import { RefreshDTO } from 'src/app/pages/login/models/refresh.model';
import { RegistrationDTO } from 'src/app/pages/login/models/registration.model';
import { environment } from 'src/environments/environment';
import { CoreConstants } from '../core.constant';
import { AuthModel, RegisterModel } from '../models/auth.model';
import { GenericReponse } from '../models/generic-response.model';
import { BaseService } from './base.service';
import { MessageService } from './message.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService  {

  protected baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    protected messageService: MessageService
  ) {
    super(messageService);
    this.baseUrl = `${environment.base_url}Authentication/`;
  }
  
  login(dto: LoginDTO): Observable<GenericReponse<AuthModel>> {
    return this.httpClient.post(`${this.baseUrl}${CoreConstants.LOGIN_URL}`, dto) as Observable<GenericReponse<AuthModel>>;
  }

  register(dto: RegistrationDTO): Observable<GenericReponse<RegisterModel>> {
    return this.httpClient.post(`${this.baseUrl}${CoreConstants.REGISTER_URL}`, dto) as Observable<GenericReponse<RegisterModel>>;
  }

  refreshToken(dto: RefreshDTO): Observable<GenericReponse<AuthModel>> {
    return this.httpClient.post(`${this.baseUrl}${CoreConstants.REFRESH_URL}`, dto) as Observable<GenericReponse<AuthModel>>;
  }

  async logout() {
    const userInfo = await this.userService.getUserInfo();
    return (this.httpClient.get(`${this.baseUrl}${CoreConstants.LOGOUT_URL}/${userInfo.userId}`).pipe(tap((res: GenericReponse<any>) => {
      return res;
    })));
  }
}

