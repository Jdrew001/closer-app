import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { customAnimation } from './core/animations/custom-route.animation';
import * as Sentry from "@sentry/angular";
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({navAnimation: customAnimation}), 
    AppRoutingModule, 
    HttpClientModule,
    CoreModule,
    SwiperModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    }],
  bootstrap: [AppComponent],
})
export class AppModule {
  /**
   *
   */
  constructor(trace: Sentry.TraceService) {}
}
