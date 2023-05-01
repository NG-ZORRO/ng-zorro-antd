import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-qr-code-status',
  template: `
    <nz-qrcode nzValue="https://ng.ant.design/" nzStatus="loading"></nz-qrcode>
    <nz-qrcode nzValue="https://ng.ant.design/" nzStatus="expired" (nzRefresh)="refresh($event)"></nz-qrcode>
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
