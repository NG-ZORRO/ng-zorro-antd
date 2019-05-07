import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { IconDefinition } from '@ant-design/icons-angular';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { NZ_ICONS } from 'ng-zorro-antd'

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

// Import the require modules
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, NzI18nModule, NZ_I18N } from 'ng-zorro-antd/i18n';
import * as AllIcons from '@ant-design/icons-angular/icons';
import zh from '@angular/common/locales/zh';
import en from '@angular/common/locales/en';

registerLocaleData(zh, 'zh-cn');
registerLocaleData(en);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

// @dynamic
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    HttpClientModule,
    NoopAnimationsModule,
    NzI18nModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class AppServerModule {}
