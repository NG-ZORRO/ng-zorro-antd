import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-qr-code-download',
  template: `
    <div id="download">
      <nz-qrcode nzValue="https://ng.ant.design/"></nz-qrcode>
      <button nz-button nzType="primary" (click)="downloadImg()">Download</button>
    </div>
  `,
  styles: [
    `
      div {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
      }

      nz-qrcode {
        margin-bottom: 12px;
      }
    `
  ]
})
export class NzDemoQrCodeDownloadComponent {
  downloadImg(): void {
    const canvas = document.getElementById('download')?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'QRCode';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
}
