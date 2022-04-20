import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from './core/services/auth.service';
import { TokenService } from './core/services/token.service';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.platform.ready().then(async (source) => {
      await this.authService.validateRefreshToken();

      this.platform.pause.subscribe(val => {
        // check the route -- if on the reset password page, then remove the user id set in storage
        if (this.router.url.includes('reset-password')) {
          this.tokenService.removeAppToken();
        }
      });
    });
    
  }
}
