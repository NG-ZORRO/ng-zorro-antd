import { Component } from '@angular/core';

import { NzImageService } from 'ng-zorro-antd/image';

@Component({
  selector: 'nz-demo-image-controlled-preview',
  template: `
    <div>
      <label>
        <span>scale step:</span>
        <nz-input-number [(ngModel)]="scaleStep" [nzMin]="0.1" [nzStep]="1"></nz-input-number>
      </label>

      <button nz-button nzType="primary" (click)="onClick()">Preview</button>
    </div>
  `,
  styles: [
    `
      div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    `
  ]
})
export class NzDemoImageControlledPreviewComponent {
  scaleStep: number = 0.5;

  constructor(private nzImageService: NzImageService) {}

  onClick(): void {
    const images = [
      {
        src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        alt: ''
      }
    ];
    this.nzImageService.preview(images, { nzZoom: 1, nzRotate: 0, nzScaleStep: this.scaleStep });
  }
}
