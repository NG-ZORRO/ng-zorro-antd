import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-button-size',
  imports: [FormsModule, NzButtonModule, NzIconModule, NzRadioModule, NzSpaceModule],
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
    <button nz-button nzType="primary" [nzSize]="size">
      <nz-icon nzType="download" />
    </button>
    <button nz-button nzType="primary" [nzSize]="size" nzShape="circle">
      <nz-icon nzType="download" />
    </button>
    <button nz-button nzType="primary" [nzSize]="size" nzShape="round">
      <nz-icon nzType="download" />
    </button>
    <button nz-button nzType="primary" [nzSize]="size" nzShape="round">
      <nz-icon nzType="download" />
      Download
    </button>
    <button nz-button nzType="primary" [nzSize]="size">
      <nz-icon nzType="download" />
      Download
    </button>
    <br />
    <nz-space-compact [nzSize]="size">
      <button nz-button nzType="primary">
        <nz-icon nzType="left" />
        Backward
      </button>
      <button nz-button nzType="primary">
        Forward
        <nz-icon nzType="right" />
      </button>
    </nz-space-compact>
  `,
  styles: [
    `
      [nz-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }
    `
  ]
})
export class NzDemoButtonSizeComponent {
  size: NzButtonSize = 'large';
}
