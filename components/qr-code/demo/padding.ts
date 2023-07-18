import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-qr-code-padding',
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
