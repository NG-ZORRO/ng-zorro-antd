import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'nz-demo-qr-code-download',
  template: `
    <div id="download">
      <nz-qrcode nzValue="https://ng.ant.design/"></nz-qrcode>
      <a #download></a>
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
  @ViewChild('download', { static: false }) download!: ElementRef;

  downloadImg(): void {
    const canvas = document.getElementById('download')?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
      this.download.nativeElement.href = canvas.toDataURL('image/png');
      this.download.nativeElement.download = 'ng-zorro-antd';
      const event = new MouseEvent('click');
      this.download.nativeElement.dispatchEvent(event);
    }
  }
}
