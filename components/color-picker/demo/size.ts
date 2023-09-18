import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-color-picker-size',
  template: `
    <nz-color-picker nzSize="large"></nz-color-picker>
    <br />
    <br />
    <nz-color-picker></nz-color-picker>
    <br />
    <br />
    <nz-color-picker nzSize="small"></nz-color-picker>
  `
})
export class NzDemoColorPickerSizeComponent {}
