import { Component } from '@angular/core';

import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';

@Component({
  selector: 'nz-demo-qr-code-padding',
  imports: [NzQRCodeModule],
  template: `
    <nz-qrcode [nzPadding]="12" nzValue="https://ng.ant.design/"></nz-qrcode>
    <nz-qrcode [nzPadding]="[12, 24]" nzValue="https://ng.ant.design/"></nz-qrcode>
  `,
  styles: [
    `
      nz-qrcode {
        margin-right: 12px;
      }
    `
  ]
})
export class NzDemoQrCodePaddingComponent {}
