import { Component, OnInit } from '@angular/core';6
import { Platform } from '@ionic/angular';
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
