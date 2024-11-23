import { Component } from '@angular/core';

import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';

@Component({
  selector: 'nz-demo-qr-code-basic',
  standalone: true,
  imports: [NzQRCodeModule],
  template: `<nz-qrcode nzValue="https://ng.ant.design/"></nz-qrcode>`
})
export class NzDemoQrCodeBasicComponent {}
