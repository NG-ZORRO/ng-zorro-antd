import { enableProdMode } from '@angular/core';
import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const bootstrap = (context: BootstrapContext) => bootstrapApplication(AppComponent, config, context);

export default bootstrap;
