import { Component, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@Component({
  selector: 'nz-demo-popover-control',
  imports: [NzButtonModule, NzPopoverModule],
  template: `
    <button
      nz-button
      nzType="primary"
      nz-popover
      nzPopoverTitle="Title"
      [(nzPopoverVisible)]="visible"
      (nzPopoverVisibleChange)="change($event)"
      nzPopoverTrigger="click"
      [nzPopoverContent]="contentTemplate"
    >
      Click me
    </button>
    <ng-template #contentTemplate>
      <a (click)="clickMe()">Close</a>
    </ng-template>
  `
})
export class NzDemoPopoverControlComponent {
  readonly visible = signal(false);

  clickMe(): void {
    this.visible.set(false);
  }

  change(value: boolean): void {
    console.log(value);
  }
}
