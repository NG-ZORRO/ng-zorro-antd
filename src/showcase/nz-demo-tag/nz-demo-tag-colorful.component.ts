import {Component} from '@angular/core';

@Component({
  selector: 'nz-demo-tag-colorful',
  template: `
  <h4 style="margin-bottom: 16px;">Presets:</h4>
  <div>
    <nz-tag [nzColor]="'pink'">pink</nz-tag>
    <nz-tag [nzColor]="'red'">red</nz-tag>
    <nz-tag [nzColor]="'orange'">orange</nz-tag>
    <nz-tag [nzColor]="'green'">green</nz-tag>
    <nz-tag [nzColor]="'cyan'">cyan</nz-tag>
    <nz-tag [nzColor]="'blue'">blue</nz-tag>
    <nz-tag [nzColor]="'purple'">purple</nz-tag>
  </div>
  <h4 style="margin: 16px 0px;'">Custom:</h4>
  <div>
    <nz-tag [nzColor]="'#f50'">#f50</nz-tag>
    <nz-tag [nzColor]="'#2db7f5'">#2db7f5</nz-tag>
    <nz-tag [nzColor]="'#87d068'">#87d068</nz-tag>
    <nz-tag [nzColor]="'#108ee9'">#108ee9</nz-tag>
  </div>
  <style>
    .ant-tag-root {
        margin-bottom: 8px;
    }
  </style>

  `,
  styles  : []
})
export class NzDemoTagColorfulComponent { }
