import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-scrolling-reposition',
  template: `
    <nz-scrolling nzCustomContent [nzViewportHeight]="150">
      <div style="height: 100px"></div>
      <span nz-tooltip [nzTooltipVisible]="true" [nzTooltipTitle]="'Reposition when scroll.'" [nzTooltipTrigger]="'click'">
        Reposition when scroll.
      </span>
      <div style="height: 200px"></div>
    </nz-scrolling>
  `
})
export class NzDemoScrollingRepositionComponent {}
