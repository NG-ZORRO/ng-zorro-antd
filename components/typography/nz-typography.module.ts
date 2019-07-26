/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzCopyToClipboardServiceModule, NzTransButtonModule } from 'ng-zorro-antd/core';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { NzTextCopyComponent } from './nz-text-copy.component';
import { NzTextEditComponent } from './nz-text-edit.component';
import { NzTypographyComponent } from './nz-typography.component';

@NgModule({
  imports: [
    CommonModule,
    NzIconModule,
    NzToolTipModule,
    NzInputModule,
    NzI18nModule,
    NzTransButtonModule,
    NzCopyToClipboardServiceModule
  ],
  exports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent, PlatformModule],
  declarations: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent]
})
export class NzTypographyModule {}
