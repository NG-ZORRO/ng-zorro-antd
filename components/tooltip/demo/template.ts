import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tooltip-template',
  template: `
    <a nz-tooltip [nzTitle]="titleTemplate">This Tooltip Have Icon</a>
    <ng-template #titleTemplate>
      <i nz-icon type="file" style="margin-right: 8px"></i> <span>Tooltip With Icon</span>
    </ng-template>
  `
})
export class NzDemoTooltipTemplateComponent {
}
