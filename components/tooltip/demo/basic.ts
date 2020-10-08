import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tooltip-basic',
  template: `
    <span nz-tooltip nzTooltipTitle="prompt text" [nzTooltipMouseLeaveDelay]="2">Tooltip will show when mouse enter.</span>
  `
})
export class NzDemoTooltipBasicComponent {}
