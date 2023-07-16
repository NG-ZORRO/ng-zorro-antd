import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-qr-code-padding',
  template: `
    <nz-qrcode [nzPadding]="50" nzValue="https://ng.ant.design/"></nz-qrcode>
    <nz-qrcode [nzPadding]="[10, 20]" nzValue="https://ng.ant.design/"></nz-qrcode>
  `,
  styles: [
    `
      nz-qrcode {
        margin-right: 12px;
        background-color: #f6f6f6;
      }
    `
  ]
})
export class NzDemoQrCodePaddingComponent {}
