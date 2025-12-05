import { Component } from '@angular/core';

import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';

@Component({
  selector: 'nz-demo-qr-code-type',
  imports: [NzQRCodeModule],
  template: `
    <nz-qrcode nzValue="https://ng.ant.design/"></nz-qrcode>
    <nz-qrcode nzValue="https://ng.ant.design/" nzType="svg"></nz-qrcode>
  `,
  styles: [
    `
      nz-qrcode {
        margin-right: 12px;
      }
    `
  ]
})
export class NzDemoQrCodeTypeComponent {}
