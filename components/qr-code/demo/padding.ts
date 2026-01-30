import { Component } from '@angular/core';

import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';

@Component({
  selector: 'nz-demo-qr-code-padding',
  imports: [NzQRCodeModule],
  template: `
    <nz-qrcode [nzPadding]="2" nzValue="https://ng.ant.design/" />
    <nz-qrcode nzType="svg" [nzPadding]="2" nzValue="https://ng.ant.design/" />
  `,
  styles: `
    nz-qrcode {
      margin-right: 12px;
      padding: 0;
    }
  `
})
export class NzDemoQrCodePaddingComponent {}
