import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popover-triggerType',
  template: `
    <ng-template #contentTemplate>
      <div>
        <p>Content</p>
        <p>Content</p>
      </div>
    </ng-template>
    <button nz-button nz-popover nzTitle="Title" [nzContent]="contentTemplate" nzTrigger="click">Click me</button>
    <button nz-button nz-popover nzTitle="Title" [nzContent]="contentTemplate" nzTrigger="hover">Hover me</button>
    <button nz-button nz-popover nzTitle="Title" [nzContent]="contentTemplate" nzTrigger="focus">Focus me</button>
  `,
  styles  : [
      `
      button {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoPopoverTriggerTypeComponent {
}
