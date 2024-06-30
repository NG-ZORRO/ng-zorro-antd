import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-qr-code-color',
  template: `
    <nz-qrcode nzValue="https://ng.ant.design/" nzColor="#ff6600"></nz-qrcode>
    <nz-qrcode nzValue="https://ng.ant.design/" nzColor="#1677ff"></nz-qrcode>
  `,
  styles: [
    `
      nz-qrcode {
        margin-right: 12px;
      }
    `
  ]
})
export class NzDemoQrCodeColorComponent {}
