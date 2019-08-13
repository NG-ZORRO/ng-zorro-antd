import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popover-control',
  template: `
    <button
      nz-button
      nzType="primary"
      nz-popover
      nzPopoverTitle="Title"
      [(nzVisible)]="visible"
      (nzVisibleChange)="change($event)"
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
  visible: boolean;

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }
}
