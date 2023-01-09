import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-qr-code-error-level',
  template: `
    <nz-qrcode nzValue="https://ng.ant.design/" [nzErrorLevel]="errorLevel"></nz-qrcode>
    <nz-segmented [nzOptions]="options" (nzValueChange)="handleIndexChange($event)"></nz-segmented>
  `,
  styles: [
    `
      :host {
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
export class NzDemoQrCodeErrorLevelComponent {
  options: string[] = ['L', 'M', 'Q', 'H'];
  errorLevel: 'L' | 'M' | 'Q' | 'H' = 'H';

  handleIndexChange(e: number): void {
    // @ts-ignore
    this.errorLevel = this.options[e];
  }
}
