import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { LoginDTO } from './models/login.model';

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
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  async login() {
    const deviceInfo = await this.deviceService.getDeviceId();
    this.authService.login(this.generateLoginDTO(this.loginForm.value, deviceInfo.uuid))
      .subscribe((res) => {
        // success
    });
  }

  forgotPassword() {
    console.log('forgot');
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
}
