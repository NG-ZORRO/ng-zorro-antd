import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-flex-basic',
  template: `
    <span>Layout:</span>
    <nz-segmented [nzOptions]="layoutSegment" [(ngModel)]="selectedIndex"></nz-segmented>

    <div
      class="ant-flex-basic-wrapper"
      [ngClass]="{ '-horizontal': selectedIndex === 0, '-vertical': selectedIndex === 1 }"
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `
})
export class NzDemoFlexBasicComponent {
  public layoutSegment = ['horizontal', 'vertical'];
  public selectedIndex = 0;
}
