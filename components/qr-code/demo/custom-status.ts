import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';

@Component({
  selector: 'nz-demo-qr-code-custom-status',
  imports: [NzQRCodeModule, NzIconModule],
  template: `
    <nz-qrcode nzValue="https://ng.ant.design/" nzStatusRender="NgZorro"></nz-qrcode>
    <nz-qrcode nzValue="https://ng.ant.design/" [nzStatusRender]="customTemplate"></nz-qrcode>
    <ng-template #customTemplate>
      <div>
        <nz-icon nzType="check-circle" nzTheme="outline" style="color: red" />
        success
      </div>
    </ng-template>
  `,
  styles: [
    `
      nz-qrcode {
        margin-right: 12px;
      }
    `
  ]
})
export class NzDemoQrCodeCustomStatusComponent {}
