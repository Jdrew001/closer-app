import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { LoginDTO } from 'src/app/pages/login/models/login.model';
import { RefreshDTO } from 'src/app/pages/login/models/refresh.model';
import { RegistrationDTO } from 'src/app/pages/login/models/registration.model';
import { environment } from 'src/environments/environment';
import { CoreConstants } from '../core.constant';
import { AuthModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  protected baseUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    // this.baseUrl = `${environment.base_url}/Authentication`;
    this.baseUrl = `${environment.base_url}`;
  }
  
  login(dto: LoginDTO): Observable<AuthModel> {
    return this.httpClient.get(`${this.baseUrl}${CoreConstants.LOGIN_URL}`)
      .pipe(
        catchError(error => {
          return observableThrowError(error.message || 'Server error');
        })
      ) as Observable<AuthModel>;
  }

  register(dto: RegistrationDTO): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}${CoreConstants.REGISTER_URL}`, dto)
      .pipe(
        catchError(error => {
          return observableThrowError(error.message || 'Server error');
        })
      ) as Observable<AuthModel>;
  }

  refreshToken(dto: RefreshDTO) {
    return this.httpClient.post(`${this.baseUrl}${CoreConstants.REFRESH_URL}`, dto)
    .pipe(
      catchError(error => {
        return observableThrowError(error.message || 'Server error');
      })
    ) as Observable<AuthModel>;
  }
}

