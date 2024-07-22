import { BidiModule } from '@angular/cdk/bidi';
import { provideHttpClient, withFetch, withJsonpSupport } from '@angular/common/http';
import { APP_ID, ApplicationConfig, EnvironmentProviders, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { IconDefinition } from '@ant-design/icons-angular';
import { EditOutline, LeftOutline, RightOutline } from '@ant-design/icons-angular/icons';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
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

const environmentProviders: EnvironmentProviders[] =  [
  BidiModule,
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  NzIconModule.forRoot(icons),
  NzI18nModule,
  NzMessageModule,
  QuicklinkModule,
  RouterModule.forRoot(
    routes,
    environment.production
      ? {
        preloadingStrategy: QuicklinkStrategy,
        scrollPositionRestoration: 'enabled'
      }
      : { preloadingStrategy: QuicklinkStrategy }
  ),
  ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production && !environment.preProduction })
].map(module => importProvidersFrom(module));

export const appConfig: ApplicationConfig = {
  providers: [
    Title,
    { provide: APP_ID, useValue: 'docs' },
    provideNzConfig(nzConfig),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withJsonpSupport(), withFetch()),
    ...environmentProviders
  ]
};
