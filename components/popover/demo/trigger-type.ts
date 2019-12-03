import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popover-trigger-type',
  template: `
    <ng-template #contentTemplate>
      <div>
        <p>Content</p>
        <p>Content</p>
      </div>
    </ng-template>
    <button nz-button nz-popover nzPopoverTitle="Title" [nzPopoverContent]="contentTemplate" nzPopoverTrigger="click">
      Click me
    </button>
    <button nz-button nz-popover nzPopoverTitle="Title" [nzPopoverContent]="contentTemplate" nzPopoverTrigger="hover">
      Hover me
    </button>
    <button nz-button nz-popover nzPopoverTitle="Title" [nzPopoverContent]="contentTemplate" nzPopoverTrigger="focus">
      Focus me
    </button>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoPopoverTriggerTypeComponent {}
