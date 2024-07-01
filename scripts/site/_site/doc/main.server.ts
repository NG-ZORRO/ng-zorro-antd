import { enableProdMode } from '@angular/core';
import 'zone.js';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule as default } from './app/app.server.module';
