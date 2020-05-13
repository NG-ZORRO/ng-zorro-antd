import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-space-size',
  template: `
    <nz-radio-group [(ngModel)]="size">
      <label nz-radio nzValue="small">Small</label>
      <label nz-radio nzValue="middle">Middle</label>
      <label nz-radio nzValue="large">Large</label>
    </nz-radio-group>
    <nz-space [nzSize]="size">
      <nz-space-item>
        <button nz-button nzType="primary">Button</button>
      </nz-space-item>
      <nz-space-item>
        <button nz-button nzType="default">Default</button>
      </nz-space-item>
      <nz-space-item>
        <button nz-button nzType="dashed">Dashed</button>
      </nz-space-item>
      <nz-space-item>
        <a nz-button nzType="link">Link</a>
      </nz-space-item>
    </nz-space>
  `
})
export class NzDemoSpaceSizeComponent {
  size: 'small' | 'middle' | 'large' | number = 'small';
}
