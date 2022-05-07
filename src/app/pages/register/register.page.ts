import { UserService } from 'src/app/core/services/user.service';
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
import { MessageService } from 'src/app/core/services/message.service';
import { AppConstants } from 'src/app/app.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  get fullName() {
    return this.registerForm.get('fullName');
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

  get passwordsMatch() {
    return this.password.value == '' || this.confirmPassword.value == '' ? false: this.password.value === this.confirmPassword.value;
  }

  constructor(
    private fb: FormBuilder,
    private navController: NavController,
    private deviceService: DeviceService,
    private authenticationService: AuthenticationService,
    private alertController: AlertController,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  async register() {
    const deviceDTO = this.generateDeviceInfo((await this.deviceService.getDeviceInfo()), (await this.deviceService.getDeviceId()).uuid);

    if (this.registerForm.valid && this.passwordsMatch) {
      this.authenticationService.register(this.generateRegisterDTO(this.registerForm.value, deviceDTO))
      .subscribe(async res => {
        if (!res.data.isUserCreated && res.message && res.error) {
          // display an error message
          const alert = await this.alertController.create({
            message: res.message,
            header: 'Registration Error',
            buttons: ['OK']
          });

          await alert.present();
          return;
        }

        this.successfulRegistration();
      });
    } else {
      // display an error message
      this.messageService.showErrorMessage(AppConstants.FORM_VALIDATION_ERROR);
      this.registerForm.markAllAsTouched();
    }
  }

  back() {
    this.navController.navigateBack('/login');
  }

  private initForm() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  private generateRegisterDTO(value: any, deviceInfo: DeviceInfo) {
    let fullName = value.fullName?.split(" ");
    let firstName = fullName[0];
    let lastName = fullName.splice(-(fullName.length - 1));
    return {
      firstName: firstName,
      lastName: lastName.join(" "),
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

  private async successfulRegistration() {
    // save the email of user for verification
    this.userService.setUserInfo({email: this.email.value, userId: null, firstName: null, lastName: null});
    //navigate to the verification screen
    setTimeout(() => {this.navController.navigateRoot('/verify-account', { replaceUrl:true })}, 1000);
  }
}
