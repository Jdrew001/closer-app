import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { DeviceInfo } from 'src/app/core/models/device.model';
import { DeviceInfo as DeviceInfoIonic }  from '@capacitor/device';
import { DeviceService } from 'src/app/core/services/device.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }
  
  get email() {
    return this.registerForm.get('email');
  }
  
  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  constructor(
    private fb: FormBuilder,
    private navController: NavController,
    private deviceService: DeviceService,
    private authenticationService: AuthenticationService,
    private alertController: AlertController,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  async register() {
    const deviceDTO = this.generateDeviceInfo((await this.deviceService.getDeviceInfo()), (await this.deviceService.getDeviceId()).uuid);
    this.authenticationService.register(this.generateRegisterDTO(this.registerForm.value, deviceDTO))
      .subscribe(async res => {
        if (!res.isAuthenticated && res.message) {
          // display an error message
          const alert = await this.alertController.create({
            message: res.message,
            header: 'Authetication Error',
            buttons: ['OK']
          });

          await alert.present();
          return;
        }

        this.successfulRegistration(res.token, res.refreshToken);
      });
  }

  back() {
    this.navController.navigateBack('/login');
  }

  private initForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  private generateRegisterDTO(value: any, deviceInfo: DeviceInfo) {
    return {
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: value.password,
      ...deviceInfo
    }
  }

  private generateDeviceInfo(value: DeviceInfoIonic, uuid: string): DeviceInfo {
    return {
      deviceGuid: uuid,
      deviceModel: value.model,
      deviceManufacture: value.manufacturer,
      devicePlatform: value.platform
    }
  }

  private async successfulRegistration(token, refreshToken) {
    this.authService.isAuthenticated$.next(true);
    await this.tokenService.setAppToken(token);
    await this.tokenService.setRefreshToken(refreshToken);
    setTimeout(() => {this.navController.navigateRoot('/tabs/tab1', { replaceUrl:true })}, 1000);
  }
}
