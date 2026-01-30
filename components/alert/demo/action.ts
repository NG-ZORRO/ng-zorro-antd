import { Component } from '@angular/core';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-alert-action',
  imports: [NzAlertModule, NzButtonModule, NzSpaceModule],
  template: `
    <nz-alert nzShowIcon nzType="success" nzMessage="Success Text" [nzAction]="actionTemplate1" />
    <ng-template #actionTemplate1>
      <button nz-button nzSize="small" nzType="text" (click)="doAction('undo')">Undo</button></ng-template
    >
    <br />
    <nz-alert
      nzShowIcon
      nzType="error"
      nzMessage="Error Text"
      [nzDescription]="descriptionTemplate1"
      [nzAction]="actionTemplate2"
    />
    <ng-template #descriptionTemplate1>
      <p>Error Description Error Description Error Description Error Description</p>
    </ng-template>
    <ng-template #actionTemplate2>
      <button nz-button nzSize="small" nzType="default" nzDanger (click)="doAction('detail')">Detail</button>
    </ng-template>
    <br />
    <nz-alert nzCloseable nzType="warning" nzMessage="Warning Text" [nzAction]="actionTemplate3" />
    <ng-template #actionTemplate3>
      <button nz-button nzSize="small" nzType="primary" nzGhost (click)="doAction('ignore')">Ignore</button>
    </ng-template>
    <br />
    <nz-alert
      nzShowIcon
      nzType="info"
      nzMessage="Info Text"
      [nzDescription]="descriptionTemplate2"
      [nzAction]="actionTemplate4"
    />
    <ng-template #descriptionTemplate2>
      <p>Info Description Info Description Info Description Info Description</p>
    </ng-template>
    <ng-template #actionTemplate4>
      <nz-space nzDirection="vertical">
        <button *nzSpaceItem nz-button nzSize="small" nzType="primary" (click)="doAction('accept')">Accept</button>
        <button *nzSpaceItem nz-button nzSize="small" nzType="default" nzDanger (click)="doAction('decline')"
          >Decline</button
        >
      </nz-space>
    </ng-template>
  `
})
export class NzDemoAlertActionComponent {
  doAction(action: string): void {
    console.log(`Do alert's action: ${action}`);
  }
}
