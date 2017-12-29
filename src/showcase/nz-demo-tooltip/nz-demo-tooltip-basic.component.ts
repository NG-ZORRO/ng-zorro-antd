import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tooltip-basic',
  template: `
    <nz-tooltip [nzTitle]="'prompt text'">
      <span nz-tooltip>Tooltip will show when mouse enter.</span>
    </nz-tooltip>
    <br>
    <a nz-tooltip="Most simple prompt text" href="#">Most simple way to trigger a tooltip!</a>
  `,
  styles  : []
})
export class NzDemoTooltipBasicComponent { }
