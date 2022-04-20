import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private authService: AuthService
  ) {}

  async logout() {
    await this.authService.logoutUser();
  }

}
