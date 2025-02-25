import { Component } from '@angular/core';

import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';

@Component({
  selector: 'nz-demo-qr-code-status',
  imports: [NzQRCodeModule],
  template: `
    <nz-qrcode nzValue="https://ng.ant.design/" nzStatus="loading"></nz-qrcode>
    <nz-qrcode nzValue="https://ng.ant.design/" nzStatus="expired" (nzRefresh)="refresh($event)"></nz-qrcode>
    <nz-qrcode nzValue="https://ng.ant.design/" nzStatus="scanned"></nz-qrcode>
  `,
  styles: [
    `
      nz-qrcode {
        margin-right: 12px;
      }
    `
  ]
})
export class NzDemoQrCodeStatusComponent {
  refresh(val: string): void {
    console.log(val);
  }
}
