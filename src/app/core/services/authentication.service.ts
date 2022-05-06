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
  
  login(dto: LoginDTO): Observable<AuthModel> {
    return this.httpClient.post(`${this.baseUrl}${CoreConstants.LOGIN_URL}`, dto) as Observable<AuthModel>;
  }

  register(dto: RegistrationDTO): Observable<RegisterModel> {
    return this.httpClient.post(`${this.baseUrl}${CoreConstants.REGISTER_URL}`, dto) as Observable<RegisterModel>;
  }

  refreshToken(dto: RefreshDTO) {
    return this.httpClient.post(`${this.baseUrl}${CoreConstants.REFRESH_URL}`, dto) as Observable<AuthModel>;
  }

  async logout() {
    const userId = await this.userService.getUserId();
    return (this.httpClient.get(`${this.baseUrl}${CoreConstants.LOGOUT_URL}/bef5173d-cbc6-11ec-9d39-e0d55e253d93`).pipe(tap((res: GenericReponse<any>) => {
      return res;
    })));
  }
}

