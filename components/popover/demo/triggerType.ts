import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popover-triggerType',
  template: `
    <nz-popover [nzTitle]="'Title'" [nzTrigger]="'click'">
      <button nz-button nz-popover>Click me</button>
      <ng-template #nzTemplate>
        <div><p>Content</p>
          <p>Content</p></div>
      </ng-template>
    </nz-popover>
    <nz-popover [nzTitle]="'Title'" [nzTrigger]="'hover'">
      <button nz-button nz-popover>Hover me</button>
      <ng-template #nzTemplate>
        <div><p>Content</p>
          <p>Content</p></div>
      </ng-template>
    </nz-popover>
    <nz-popover [nzTitle]="'Title'" [nzTrigger]="'focus'">
      <button nz-button nz-popover>Focus me</button>
      <ng-template #nzTemplate>
        <div><p>Content</p>
          <p>Content</p></div>
      </ng-template>
    </nz-popover>
  `
})
export class NzDemoPopoverTriggerTypeComponent {
}
