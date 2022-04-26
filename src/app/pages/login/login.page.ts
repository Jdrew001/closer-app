import { CoreConstants } from './../../core/core.constant';
import { MessageService } from './../../core/services/message.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { LoginDTO } from './models/login.model';
import { TokenService } from 'src/app/core/services/token.service';
import { AuthService } from 'src/app/core/services/auth.service';

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
    private alertController: AlertController,
    private router: Router,
    private deviceService: DeviceService,
    private tokenService: TokenService,
    private navController: NavController,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  async login() {
    const deviceInfo = await this.deviceService.getDeviceId();
    this.authenticationService.login(this.generateLoginDTO(this.loginForm.value, deviceInfo.uuid))
      .subscribe(async (res) => {
        if (res.error && res.message) {
          this.messageService.showMessage(CoreConstants.GENERIC_ERROR_TOAST);
          return;
        }

        this.successfulLogin(res.token, res.refreshToken);
    });
  }

  registerPage() {
    this.router.navigateByUrl('/register');
  }

  forgotPassword() {
    this.navController.navigateForward('/forget-password');
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

  private async successfulLogin(token, refreshToken) {
    this.authService.isAuthenticated$.next(true);
    this.messageService.showMessage(CoreConstants.GENERIC_SUCCESS_TOAST);
    await this.tokenService.setAppToken(token);
    await this.tokenService.setRefreshToken(refreshToken);
    setTimeout(() => {this.router.navigateByUrl('/tabs/dashboard', { replaceUrl:true })}, 1000);
  }
}
