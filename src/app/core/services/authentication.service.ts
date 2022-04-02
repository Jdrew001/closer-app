import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { LoginDTO } from 'src/app/pages/login/models/login.model';
import { RefreshDTO } from 'src/app/pages/login/models/refresh.model';
import { RegistrationDTO } from 'src/app/pages/login/models/registration.model';
import { CoreConstants } from '../core.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  protected baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') url: string,
  ) {
    this.baseUrl = `${url}/Authentication`;
  }
  
  login(dto: LoginDTO): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}${CoreConstants.LOGIN_URL}`, dto)
      .pipe(
        catchError(error => {
          return observableThrowError(error.message || 'Server error');
        })
      );
  }

  register(dto: RegistrationDTO): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}${CoreConstants.REGISTER_URL}`, dto)
      .pipe(
        catchError(error => {
          return observableThrowError(error.message || 'Server error');
        })
      );
  }

  refreshToken(dto: RefreshDTO) {
    return this.httpClient.post(`${this.baseUrl}${CoreConstants.REFRESH_URL}`, dto)
    .pipe(
      catchError(error => {
        return observableThrowError(error.message || 'Server error');
      })
    );
  }
}

