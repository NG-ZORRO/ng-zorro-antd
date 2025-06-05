/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { EnvironmentProviders } from '@angular/core';

import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { provideNzIcons } from 'ng-zorro-antd/icon';

const antDesignIcons = AllIcons as Record<string, IconDefinition>;

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

export const provideNzIconsTesting = (): EnvironmentProviders => provideNzIcons(icons);
