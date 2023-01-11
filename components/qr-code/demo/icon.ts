import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-qr-code-icon',
  template: ` <nz-qrcode nzValue="https://ng.ant.design/" nzIcon="./assets/img/logo.svg" nzErrorLevel="H"></nz-qrcode> `
})
export class NzDemoQrCodeIconComponent {}
