import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

registerLocaleData(zh);

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig).catch(err => console.log(err));
