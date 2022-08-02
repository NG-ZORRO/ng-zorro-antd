import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tooltip-template',
  template: `
    <a nz-tooltip [nzTooltipTitle]="titleTemplate" [nzTooltipTitleContext]="{ $implicit: 'Icon' }"
      >This Tooltip has an Icon</a
    >
    <ng-template #titleTemplate let-thing>
      <i nz-icon nzType="file"></i>
      <span>Tooltip With {{ thing }}</span>
    </ng-template>
  `,
  styles: [
    `
      .anticon {
        margin-right: 8px;
        margin-left: 8px;
      }
    `
  ]
})
export class NzDemoTooltipTemplateComponent {}
