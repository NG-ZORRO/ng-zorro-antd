import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import zh from '@angular/common/locales/zh';
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { provideNzIcons } from 'ng-zorro-antd/icon';

import { appConfig } from './app.config';

registerLocaleData(zh, 'zh-cn');
registerLocaleData(en);

const antDesignIcons = AllIcons as Record<string, IconDefinition>;
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideNzIcons(icons)
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
