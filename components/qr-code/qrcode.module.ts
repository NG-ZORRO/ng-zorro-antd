/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzQrcodeCanvasComponent } from './qrcode-canvas.component';
import { NzQrcodeSvgComponent } from './qrcode-svg.component';
import { NzQRCodeComponent } from './qrcode.component';

@NgModule({
  imports: [NzQRCodeComponent, NzQrcodeCanvasComponent, NzQrcodeSvgComponent],
  exports: [NzQRCodeComponent]
})
export class NzQRCodeModule {}
