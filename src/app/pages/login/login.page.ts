import { CoreConstants } from './../../core/core.constant';
import { MessageService } from './../../core/services/message.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { LoginDTO } from './models/login.model';
import { TokenService } from 'src/app/core/services/token.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppConstants } from 'src/app/app.constants';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  get email() {
    return this.loginForm.get('email');
  }
  
  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private authService: AuthService,
    private router: Router,
    private deviceService: DeviceService,
    private tokenService: TokenService,
    private navController: NavController,
    private messageService: MessageService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  async login() {
    if (this.loginForm.valid) {
      const deviceInfo = await this.deviceService.getDeviceId();
      this.authenticationService.login(this.generateLoginDTO(this.loginForm.value, deviceInfo.uuid))
        .subscribe(async (res) => {
          if (res.error && res.message) {
            this.messageService.showErrorMessage(res.message);
            return;
          }

          if (!res.confirmed && res.email) {
            this.sendUserToConfirm(res.email);
            return;
          }

          this.successfulLogin(res.token, res.refreshToken, res.message);
      });
      return;
    }
    
    this.formValidationError();
  }

  registerPage() {
    this.router.navigateByUrl('/register');
  }

  forgotPassword() {
    this.navController.navigateForward('/forget-password');
  }

  private async sendUserToConfirm(email: string) {
    await this.userService.setUserEmail(email);
    setTimeout(() => {this.navController.navigateRoot('/verify-account', { replaceUrl:true })}, 1000);
  }

  private initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  private generateLoginDTO(value: any, uuid: string): LoginDTO {
    return {
      email: value.email,
      password: value.password,
      deviceUUID: uuid
    }
  }

  private async successfulLogin(token, refreshToken, message) {
    this.authService.isAuthenticated$.next(true);
    this.messageService.showSuccessMessage(message);
    await this.tokenService.setAppToken(token);
    await this.tokenService.setRefreshToken(refreshToken);
    setTimeout(() => {this.router.navigateByUrl('/tabs/dashboard', { replaceUrl:true })}, 1000);
  }

  private formValidationError() {
    this.loginForm.markAllAsTouched();
    this.messageService.showErrorMessage("Validation Error", AppConstants.FORM_VALIDATION_ERROR);
  }
}
