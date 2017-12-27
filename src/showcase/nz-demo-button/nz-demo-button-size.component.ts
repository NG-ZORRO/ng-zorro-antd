import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-button-size',
  template: `
    <nz-radio-group [(ngModel)]="size">
      <label nz-radio-button [nzValue]="'large'"><span>Large</span></label>
      <label nz-radio-button [nzValue]="'default'"><span>Default</span></label>
      <label nz-radio-button [nzValue]="'small'"><span>Small</span></label>
    </nz-radio-group>
    <br>
    <br>
    <button nz-button [nzType]="'primary'" [nzSize]="size" [nzShape]="'circle'">
      <i class="anticon anticon-download"></i>
    </button>
    <button nz-button [nzType]="'primary'" [nzSize]="size">
      <i class="anticon anticon-download"></i><span>Download</span>
    </button>
    <button nz-button [nzType]="'primary'" [nzSize]="size">
      <span>Normal</span>
    </button>
    <br>
    <nz-button-group [nzSize]="size">
      <button nz-button [nzType]="'primary'">
        <i class="anticon anticon-left"></i><span>Backward</span>
      </button>
      <button nz-button [nzType]="'primary'">
        <span>Forward</span><i class="anticon anticon-right"></i>
      </button>
    </nz-button-group>
  `,
  styles  : []
})
export class NzDemoButtonSizeComponent {
  size = 'default';
}
