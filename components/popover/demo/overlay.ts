import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@Component({
  selector: 'nz-demo-popover-overlay',
  imports: [NzButtonModule, NzPopoverModule],
  template: `
    <button
      nz-button
      nz-popover
      nzType="primary"
      nzPopoverTitle="Title"
      nzPopoverTrigger="click"
      [nzPopoverContent]="contentTemplate"
      [nzPopoverOverlayClickable]="false"
      [nzPopoverVisible]="visible"
      (nzPopoverVisibleChange)="visibleChange($event)"
      >Click me</button
    >
    <ng-template #contentTemplate>
      <button nz-button nzSize="small" nzType="primary" (click)="visibleChange(false)"> Close me </button>
    </ng-template>
  `
})
export class NzDemoPopoverOverlayComponent {
  visible = false;

  visibleChange(value: boolean): void {
    this.visible = value;
  }
}
