import { BidiModule } from '@angular/cdk/bidi';
import { provideHttpClient, withFetch, withJsonpSupport } from '@angular/common/http';
import { APP_ID, ApplicationConfig, EnvironmentProviders, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';

import { IconDefinition } from '@ant-design/icons-angular';
import { EditOutline, LeftOutline, RightOutline } from '@ant-design/icons-angular/icons';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

import { environment } from '../environments/environment';
import { routes } from './app.routes';

const icons: IconDefinition[] = [LeftOutline, RightOutline, EditOutline];

const nzConfig: NzConfig = {
  codeEditor: {
    monacoEnvironment: { globalAPI: true }
  },
  icon: { nzTwotoneColor: '#1890ff' }
};

const environmentProviders: EnvironmentProviders =  importProvidersFrom(
  BidiModule,
  NzMessageModule,
  QuicklinkModule
);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_ID, useValue: 'docs' },
    provideNzConfig(nzConfig),
    provideNzIcons(icons),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withPreloading(QuicklinkStrategy),
      withInMemoryScrolling({ scrollPositionRestoration: environment.production ? 'enabled' : 'disabled' })
    ),
    provideClientHydration(),
    provideHttpClient(withJsonpSupport(), withFetch()),
    provideServiceWorker('ngsw-worker.js', { enabled: environment.production && !environment.preProduction }),
    provideAnimationsAsync(),
    environmentProviders
  ]
};
