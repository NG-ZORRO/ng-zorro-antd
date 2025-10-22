import { Component } from '@angular/core';

import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'nz-demo-tooltip-basic',
  imports: [NzTooltipModule],
  template: `<span nz-tooltip nzTooltipTitle="prompt text">Tooltip will show when mouse enter.</span>`
})
export class NzDemoTooltipBasicComponent {}
