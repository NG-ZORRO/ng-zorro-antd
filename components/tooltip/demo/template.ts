import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'nz-demo-tooltip-template',
  imports: [NzIconModule, NzTooltipModule],
  template: `
    <a nz-tooltip [nzTooltipTitle]="titleTemplate" [nzTooltipTitleContext]="{ $implicit: 'Icon' }"
      >This Tooltip has an Icon</a
    >
    <ng-template #titleTemplate let-thing>
      <nz-icon nzType="file" />
      <span>Tooltip With {{ thing }}</span>
    </ng-template>
  `,
  styles: `
    .anticon {
      margin-right: 8px;
      margin-left: 8px;
    }
  `
})
export class NzDemoTooltipTemplateComponent {}
