import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tooltip-template',
  template: `
    <nz-tooltip>
      <button nz-button nz-tooltip>This Tooltip Have Icon</button>
      <ng-template #nzTemplate>
        <i class="anticon anticon-file"></i> <span>带图标的Tooltip</span>
      </ng-template>
    </nz-tooltip>
  `,
  styles  : []
})
export class NzDemoTooltipTemplateComponent { }
