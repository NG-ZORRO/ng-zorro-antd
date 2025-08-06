import { provideServerRendering } from '@angular/ssr';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import zh from '@angular/common/locales/zh';
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';

import { appConfig } from './app.config';

registerLocaleData(zh, 'zh-cn');
registerLocaleData(en);

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
