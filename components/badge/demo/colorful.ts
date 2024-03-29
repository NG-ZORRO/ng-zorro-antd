import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-colorful',
  template: `
    <div>
      <h4>Presets:</h4>
      @for (color of colors; track color) {
        <div>
          <nz-badge [nzColor]="color" [nzText]="color"></nz-badge>
        </div>
      }
      <br />
      <h4>Custom:</h4>
      <nz-badge nzColor="#f50" nzText="#f50"></nz-badge>
      <br />
      <nz-badge nzColor="#2db7f5" nzText="#2db7f5"></nz-badge>
      <br />
      <nz-badge nzColor="#87d068" nzText="#87d068"></nz-badge>
      <br />
      <nz-badge nzColor="#108ee9" nzText="#108ee9"></nz-badge>
    </div>
  `
})
export class NzDemoBadgeColorfulComponent {
  colors = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime'
  ];
}
