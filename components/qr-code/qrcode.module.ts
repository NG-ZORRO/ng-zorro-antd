/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { NzQRCodeComponent } from './qrcode.component';

@NgModule({
  declarations: [NzQRCodeComponent],
  exports: [NzQRCodeComponent],
  imports: [NzSpinModule, CommonModule, NzButtonModule, NzIconModule]
})
export class NzQRCodeModule {}
