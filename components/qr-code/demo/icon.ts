import { Component } from '@angular/core';

import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';

@Component({
  selector: 'nz-demo-qr-code-icon',
  imports: [NzQRCodeModule],
  template: `
    <nz-qrcode
      nzValue="https://ng.ant.design/"
      nzIcon="https://img.alicdn.com/imgextra/i2/O1CN01TBIkzL1Nk3IBB0DLA_!!6000000001607-2-tps-106-120.png"
      nzLevel="H"
    />
  `
})
export class NzDemoQrCodeIconComponent {}
