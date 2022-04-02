import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { AppConstants } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {

  constructor(private router: Router) {}

  async canLoad(
    route: Route,
    segments: UrlSegment[]): Promise<boolean> {
      const hasSeenIntro = await Storage.get({key: AppConstants.INTRO_KEY});      
      if (hasSeenIntro && (hasSeenIntro.value === 'true')) {
        return true;
      } else {
        this.router.navigateByUrl('/intro', { replaceUrl:true });
        return false;
      }
  }
}
