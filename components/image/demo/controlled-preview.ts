import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzImageModule, NzImageService } from 'ng-zorro-antd/image';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-image-controlled-preview',
  imports: [FormsModule, NzButtonModule, NzImageModule, NzInputNumberModule],
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
  private nzImageService = inject(NzImageService);
  scaleStep = 0.5;
  readonly images = [
    {
      src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      alt: ''
    }
  ];

  onClick(): void {
    this.nzImageService.preview(this.images, { nzZoom: 1, nzRotate: 0, nzScaleStep: this.scaleStep });
  }
}
