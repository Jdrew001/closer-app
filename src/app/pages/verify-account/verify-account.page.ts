import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { Keyboard } from '@capacitor/keyboard';
import { MessageService } from 'src/app/core/services/message.service';
import { AuthModel } from 'src/app/core/models/auth.model';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.page.html',
  styleUrls: ['./verify-account.page.scss'],
})
export class VerifyAccountPage implements OnInit {

  email: string;
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
    private tokenService: TokenService,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  get isForResetPassword() { return this.authService.isReset}
  set isForResetPassword(val: boolean) { this.authService.isReset = val; }

  get isModelValid(): boolean {
    let result = true;
    Object.keys(this.verifyModel).forEach(key => {
      if (this.verifyModel[key] == null) {
        result = false;
      }
    });

    return result;
  }

  async ngOnInit() {
    this.email = (await this.userService.getUserInfo()).email;
  }

  async submit() {
    if (this.checkForEmpty()) {
      (await this.authService.verifyAccountCode(this.extractCode())).subscribe(async res => {
        if (res.error && res.message) {
          this.messageService.showErrorMessage(null, res.message);
          return;
        }

        this.authService.setValidationType(null);
        this.successfulVerification(res.data);
      });
    }
  }

  async resendCode(firstElement) {
    const keys = Object.keys(this.verifyModel);
    keys.forEach(key => this.verifyModel[key] = null);
    if (firstElement == null) {
      return;
    } else {
      firstElement.focus();
    }
    this.authService.reissueCode(this.email).subscribe(res => {
      this.reissue = true;
    });
  }

  async onDigitInput(e, nextElement, prevElement) {
    let element;
    if (this.isModelValid) {
      await Keyboard.hide();
    }

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
      if (!this.isModelValid) {
        element.focus();
      }
    }
  }

  checkForEmpty(): boolean {
    let result = false;
    if (this.verifyModel.first !== '') {
      result = true;
    }

    if (this.verifyModel.second !== '') {
      result = true;
    }

    if (this.verifyModel.third !== '') {
      result = true;
    }

    if (this.verifyModel.fourth !== '') {
      result = true;
    }

    return result;
  }

  async successfulVerification(data: AuthModel) {
    this.authService.isAuthenticated$.next(true);
    this.userService.setUserInfo({email: data?.email, userId: data?.userId, firstName: data?.firstName, lastName: data?.lastName});
    await this.tokenService.setAppToken(data.token);

    if (this.isForResetPassword) {
      setTimeout(() => {
        this.navController.navigateRoot('/reset-password', { replaceUrl:true }).finally(() => {
          this.userService.setUserInfo({email: data?.email, userId: data?.userId, firstName: data?.firstName, lastName: data?.lastName});
          this.isForResetPassword = false;
        });
      }, 500);
    } else {
      setTimeout(() => {
        this.navController.navigateRoot('/tabs/dashboard', { replaceUrl:true }).finally(async () => {
          this.userService.setUserInfo({email: data?.email, userId: data?.userId, firstName: data?.firstName, lastName: data?.lastName});
          await this.tokenService.setRefreshToken(data.refreshToken);
          this.isForResetPassword = false;
        });
      }, 500);
    }
  }

  cancel() {
    this.navController.navigateBack('/login');
  }

  private extractCode(): string {
    return `${this.verifyModel.first}${this.verifyModel.second}${this.verifyModel.third}${this.verifyModel.fourth}`
  }
}
