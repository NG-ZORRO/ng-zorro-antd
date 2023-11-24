import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-spin-fullscreen',
  template: `
    <button nz-button nzType="default" (click)="showSpinner()">Show fullscreen for 3s</button>
    <nz-spin nzSimple [nzSpinning]="isSpinning" [nzFullscreen]="true"></nz-spin>
  `
})
export class NzDemoSpinFullscreenComponent {
  public isSpinning = false;

  public showSpinner(): void {
    this.isSpinning = true;

    setTimeout(() => {
      this.isSpinning = false;
    }, 3000);
  }
}
