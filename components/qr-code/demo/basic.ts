import { Component } from '@angular/core';

import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';

@Component({
  selector: 'nz-demo-qr-code-basic',
  imports: [NzQRCodeModule],
  template: `<nz-qrcode nzValue="https://ng.ant.design/" />`
})
export class NzDemoQrCodeBasicComponent {}
