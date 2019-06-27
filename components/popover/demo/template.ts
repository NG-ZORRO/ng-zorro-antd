import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popover-template',
  template: `
    <button nz-button nz-popover [nzTitle]="titleTemplate" [nzContent]="contentTemplate">
      Render Template
    </button>
    <ng-template #titleTemplate><i nz-icon nzType="close"></i> Title</ng-template>
    <ng-template #contentTemplate><i nz-icon nzType="check"></i> Content</ng-template>
  `
})
export class NzDemoPopoverTemplateComponent {}
