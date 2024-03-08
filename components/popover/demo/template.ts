import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popover-template',
  template: `
    <button nz-button nz-popover [nzPopoverTitle]="titleTemplate" [nzPopoverContent]="contentTemplate">
      Render Template
    </button>
    <ng-template #titleTemplate>
      <span nz-icon nzType="close"></span>
      Title
    </ng-template>
    <ng-template #contentTemplate>
      <span nz-icon nzType="check"></span>
      Content
    </ng-template>
  `
})
export class NzDemoPopoverTemplateComponent {}
