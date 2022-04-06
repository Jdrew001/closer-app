import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  isAuthenticated = false;

  constructor(
    private authService: AuthService
  ) {
    this.authService.isAuthenticated$.subscribe(value => this.isAuthenticated = value);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('is authenticated', this.isAuthenticated);
    return this.isAuthenticated;
  }
}
