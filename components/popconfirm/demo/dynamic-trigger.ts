import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popconfirm-dynamic-trigger',
  template: `
    <nz-popconfirm [nzTitle]="'Are you sure delete this task?'" [nzCondition]="switchValue" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()">
      <a nz-popconfirm>Delete a task</a>
    </nz-popconfirm>
    <br>
    <br>
    Whether directly execute:
    <nz-switch [(ngModel)]="switchValue"></nz-switch>
  `
})

export class NzDemoPopconfirmDynamicTriggerComponent {
  switchValue = false;

  cancel(): void {
    // this.message.info('click cancel');
    console.log('click cancel');
  }

  confirm(): void {
    // this.message.info('click confirm');
    console.log('click confirm');
  }

}
