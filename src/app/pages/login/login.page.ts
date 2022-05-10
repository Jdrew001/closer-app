import { CoreConstants } from './../../core/core.constant';
import { MessageService } from './../../core/services/message.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ViewWillLeave } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { LoginDTO } from './models/login.model';
import { TokenService } from 'src/app/core/services/token.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppConstants } from 'src/app/app.constants';
import { UserService } from 'src/app/core/services/user.service';
import { AuthModel } from 'src/app/core/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, ViewWillLeave {

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
    private tokenService: TokenService,
    private navController: NavController,
    private messageService: MessageService,
    private userService: UserService
  ) { }
  
  ngOnInit() {
    this.initForm();
  }

  ionViewWillLeave(): void {
    this.loginForm.reset();
  }

  async login() {
    if (this.loginForm.valid) {
      this.authenticationService.login(this.generateLoginDTO(this.loginForm.value))
        .subscribe(async (res) => {
          if (res.error && res.message) {
            this.messageService.showErrorMessage(res.message);
            return;
          }

          if (!res.data.confirmed && res.data.email) {
            this.sendUserToConfirm(res.data.email);
            return;
          }

          if (res.data.isNewDevice) {
            this.messageService.showSuccessMessage(res.data.message); 
            await this.userService.setUserInfo({email: res.data.email, userId: null, firstName: null, lastName: null});
            this.authService.setValidationType('NEW_DEVICE_LOGIN');
            this.navController.navigateForward('/verify-account');
            return;
          }

          this.successfulLogin(res);
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
    await this.userService.setUserInfo({email: email, userId: null, firstName: null, lastName: null});
    setTimeout(() => {this.navController.navigateRoot('/verify-account', { replaceUrl:true })}, 1000);
  }

  private initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  private generateLoginDTO(value: any): LoginDTO {
    return {
      email: value.email,
      password: value.password
    }
  }

  private async successfulLogin(res) {
    this.authService.isAuthenticated$.next(true);
    this.messageService.showSuccessMessage(res.message);
    await this.tokenService.setAppToken(res.data.token);
    await this.tokenService.setRefreshToken(res.data.refreshToken);
    await this.userService.setUserInfo({email: res.data?.email, userId: res.data?.userId, firstName: res.data?.firstName, lastName: res.data?.lastName});
    setTimeout(() => {this.router.navigateByUrl('/tabs/dashboard', { replaceUrl:true })}, 1000);
  }

  private formValidationError() {
    this.loginForm.markAllAsTouched();
    this.messageService.showErrorMessage("Validation Error", AppConstants.FORM_VALIDATION_ERROR);
  }
}
