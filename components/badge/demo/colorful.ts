import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-colorful',
  template: `
    <div>
      <h4 style="margin-bottom: 16px">Presets:</h4>
      <div *ngFor="let color of colors">
        <nz-badge [nzColor]="color" [nzText]="color"></nz-badge>
      </div>
      <h4 style="margin:16px 0">Custom:</h4>
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
  colors = ['pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime'];
}
