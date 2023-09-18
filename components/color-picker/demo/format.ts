import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-color-picker-format',
  template: `
    <nz-color-picker nzFormat="hex" [(ngModel)]="hex"></nz-color-picker> HEX: {{ hex }}
    <br />
    <br />
    <nz-color-picker nzFormat="hsb" [(ngModel)]="hsb"></nz-color-picker> HSB: {{ hsb }}
    <br />
    <br />
    <nz-color-picker nzFormat="rgb" [(ngModel)]="rgb"></nz-color-picker> RGB: {{ rgb }}
  `
})
export class NzDemoColorPickerFormatComponent {
  hex: string = '#1677ff';
  hsb: string = 'hsb(215, 91%, 100%)';
  rgb: string = 'rgb(22, 119, 255)';
}
