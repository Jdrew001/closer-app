import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.page.html',
  styleUrls: ['./verify-account.page.scss'],
})
export class VerifyAccountPage implements OnInit {

  reissue = false;
  verifyModel = {
    first: null,
    second: null,
    third: null,
    fourth: null
  };

  constructor(
    private navController: NavController,
    private authService: AuthService,
    private alertController: AlertController,
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  submit() {
    if (this.checkForEmpty()) {
      this.authService.verifyAccountCode({}).subscribe(async res => {
        if (!res.isAuthenticated && res.message) {
          // display an error message
          const alert = await this.alertController.create({
            message: res.message,
            header: 'Verification Error',
            buttons: ['OK']
          });

          await alert.present();
          return;
        }

        this.successfulVerification(res.token, res.refreshToken, res.userId);
      });
    }
  }

  async resendCode(firstElement) {
    const userId = await this.userService.getUserId();
    const keys = Object.keys(this.verifyModel);
    keys.forEach(key => this.verifyModel[key] = null);
    if (firstElement == null) {
      return;
    } else {
      firstElement.focus();
    }
    this.authService.reissueCode(userId).subscribe(res => {
      this.reissue = true;
    });
  }

  onDigitInput(e, nextElement, prevElement) {
    let element;
    if (e.key !== 'Backspace') {
      element = nextElement;
    }

    if (e.key === 'Backspace') {
      element = prevElement;
    }

    if (element == null)
    {
      return;
    }
    else
    {
      element.focus();
    }
  }

  checkForEmpty(): boolean {
    let result = false;
    if (this.verifyModel.first) {
      result = true;
    }

    if (this.verifyModel.second) {
      result = true;
    }

    if (this.verifyModel.third) {
      result = true;
    }

    if (this.verifyModel.fourth) {
      result = true;
    }

    return result;
  }

  async successfulVerification(token, refreshToken, userId: string) {
    this.authService.isAuthenticated$.next(true);
    this.userService.setUserId(userId);
    await this.tokenService.setAppToken(token);
    await this.tokenService.setRefreshToken(refreshToken);

    setTimeout(() => {this.navController.navigateRoot('/tabs/tab1', { replaceUrl:true })}, 1000);
  }

}
