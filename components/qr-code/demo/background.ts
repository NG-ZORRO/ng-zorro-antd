import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-qr-code-background',
  template: `
    <nz-qrcode nzBgColor="#f6f6f6" nzColor="#ff6600" nzValue="https://ng.ant.design/"></nz-qrcode>
    <nz-qrcode nzBgColor="#f6f6f6" nzColor="#1677ff" nzValue="https://ng.ant.design/"></nz-qrcode>
  `,
  styles: [
    `
      nz-qrcode {
        margin-right: 12px;
      }
    `
  ]
})
export class NzDemoQrCodeBackgroundComponent {}
