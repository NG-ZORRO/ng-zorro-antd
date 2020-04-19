import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tooltip-template',
  template: `
    <a nz-tooltip [nzTooltipTitle]="titleTemplate">This Tooltip has an Icon</a>
    <ng-template #titleTemplate> <i nz-icon nzType="file" style="margin-right: 8px"></i> <span>Tooltip With Icon</span> </ng-template>
  `
})
export class NzDemoTooltipTemplateComponent {}
