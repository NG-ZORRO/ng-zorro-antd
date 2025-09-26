import { provideHttpClient, withFetch, withJsonpSupport } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';

import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { provideNzIcons } from 'ng-zorro-antd/icon';

import { environment } from '../environments/environment';
import { routes } from './app.routes';

const antDesignIcons = AllIcons as Record<string, IconDefinition>;
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

const nzConfig: NzConfig = {
  codeEditor: {
    monacoEnvironment: { globalAPI: true }
  },
  icon: { nzTwotoneColor: '#1890ff' }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideNzConfig(nzConfig),
    provideNzIcons(icons),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: environment.production ? 'enabled' : 'disabled' })
    ),
    provideClientHydration(),
    provideHttpClient(withJsonpSupport(), withFetch()),
    provideServiceWorker('ngsw-worker.js', { enabled: environment.production }),
    provideAnimationsAsync()
  ]
};
