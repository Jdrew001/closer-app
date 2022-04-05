import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { SplashScreen } from '@capacitor/splash-screen';
import { AuthenticationService } from './core/services/authentication.service';
import { DeviceService } from './core/services/device.service';
import { Router } from '@angular/router';
import { TokenService } from './core/services/token.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.platform.ready().then(async (source) => {
      await this.authService.validateRefreshToken();
    });
  }
}
