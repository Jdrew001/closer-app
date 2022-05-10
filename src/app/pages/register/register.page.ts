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
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  async register() {
    if (this.registerForm.valid && this.passwordsMatch) {
      this.authService.setValidationType('NEW_ACCOUNT');
      this.authenticationService.register(this.generateRegisterDTO(this.registerForm.value))
      .subscribe(async res => {
        if (!res.data.isUserCreated && res.message && res.error) {
          this.messageService.showErrorMessage(res.message);
          return;
        }

        this.successfulRegistration();
      });
    } else {
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

  private generateRegisterDTO(value: any) {
    let fullName = value.fullName?.split(" ");
    let firstName = fullName[0];
    let lastName = fullName.splice(-(fullName.length - 1));
    return {
      firstName: firstName,
      lastName: lastName.join(" "),
      email: value.email,
      password: value.password
    }
  }

  private async successfulRegistration() {
    this.userService.setUserInfo({email: this.email.value, userId: null, firstName: null, lastName: null});
    setTimeout(() => {this.navController.navigateRoot('/verify-account', { replaceUrl:true })}, 1000);
  }
}
