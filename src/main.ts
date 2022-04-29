import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Sentry from "@sentry/angular";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://1af02dc716db4f62aec18ed9f84d7548@o1225742.ingest.sentry.io/6371390",
  integrations: [
    new BrowserTracing({
      tracingOrigins: ["localhost"],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0, // debug only
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
