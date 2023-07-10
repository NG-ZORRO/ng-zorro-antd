import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-color-picker-block',
  template: `
    <nz-color-block nzSize="small"></nz-color-block>
    <nz-color-block></nz-color-block>
    <nz-color-block nzSize="large"></nz-color-block>
  `,
  styles: [
    `
      nz-color-block {
        margin-right: 12px;
      }
    `
  ]
})
export class NzDemoColorPickerBlockComponent {}
