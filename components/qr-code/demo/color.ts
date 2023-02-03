import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-qr-code-color',
  template: `
    <nz-qrcode nzValue="https://ng.ant.design/" [nzColor]="color"></nz-qrcode>
    <nz-qrcode nzValue="https://ng.ant.design/" [nzColor]="color1"></nz-qrcode>
    <nz-qrcode
      nzValue="https://ng.ant.design/"
      nzIcon="./assets/img/logo.svg"
      nzErrorLevel="H"
      [nzColor]="color1"
    ></nz-qrcode>
  `,
  styles: [
    `
      nz-qrcode {
        margin-right: 12px;
      }
    `
  ]
})
export class NzDemoQrCodeColorComponent {
  color = { dark: '#ff6600', light: '#f6f6f6' };
  color1 = { dark: '#1677ff', light: '#f6f6f6' };
}
