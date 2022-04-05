import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication.service';
import { DeviceService } from './services/device.service';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthenticationService,
    AuthService,
    DeviceService,
    TokenService
  ]
})
export class CoreModule { }
