import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'nz-demo-tooltip-basic',
  template: `
    <nz-tooltip [nzTitle]="'prompt text'">
      <span nz-tooltip>Tooltip will show when mouse enter.</span>
    </nz-tooltip>
  `,
  styles  : []
})
export class NzDemoTooltipBasicComponent implements OnInit {
  ngOnInit() {
  }
}
