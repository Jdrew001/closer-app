import { MessageService } from './services/message.service';
import { LoaderService } from './services/loader.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication.service';
import { DeviceService } from './services/device.service';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthenticationService,
    AuthService,
    DeviceService,
    TokenService,
    UserService,
    LoaderService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  exports: [LoaderComponent]
})
export class CoreModule { }
