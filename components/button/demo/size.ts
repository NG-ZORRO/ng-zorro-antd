import { Component } from '@angular/core';

import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'nz-demo-button-size',
  template: `
    <nz-radio-group [(ngModel)]="size">
      <label nz-radio-button nzValue="large">Large</label>
      <label nz-radio-button nzValue="default">Default</label>
      <label nz-radio-button nzValue="small">Small</label>
    </nz-radio-group>
    <br />
    <br />
    <button nz-button [nzSize]="size" nzType="primary">Primary</button>
    <button nz-button [nzSize]="size" nzType="default">Default</button>
    <button nz-button [nzSize]="size" nzType="dashed">Dashed</button>
    <a nz-button [nzSize]="size" nzType="link">Link</a>
    <br />
    <button nz-button nzType="primary" [nzSize]="size"><span nz-icon nzType="download"></span></button>
    <button nz-button nzType="primary" [nzSize]="size" nzShape="circle"><span nz-icon nzType="download"></span></button>
    <button nz-button nzType="primary" [nzSize]="size" nzShape="round"><span nz-icon nzType="download"></span></button>
    <button nz-button nzType="primary" [nzSize]="size" nzShape="round">
      <span nz-icon nzType="download"></span>
      Download
    </button>
    <button nz-button nzType="primary" [nzSize]="size">
      <span nz-icon nzType="download"></span>
      Download
    </button>
    <br />
    <nz-button-group [nzSize]="size">
      <button nz-button nzType="primary">
        <span nz-icon nzType="left"></span>
        Backward
      </button>
      <button nz-button nzType="primary">
        Forward
        <span nz-icon nzType="right"></span>
      </button>
    </nz-button-group>
  `,
  styles: [
    `
      [nz-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }

      nz-button-group [nz-button] {
        margin-right: 0;
      }
    `
  ]
})
export class NzDemoButtonSizeComponent {
  size: NzButtonSize = 'large';
}
