import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-alert-closable',
  template: `
    <nz-alert [nzType]="'warning'" nzCloseable [nzMessage]="'Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text'" (nzOnClose)="afterClose()"></nz-alert>

    <nz-alert [nzType]="'error'" nzCloseable [nzMessage]="'Error Text'" [nzDescription]="'Error Description Error Description Error Description Error Description Error Description Error Description'" (nzOnClose)="afterClose()"></nz-alert>
  `
})
export class NzDemoAlertClosableComponent {
  afterClose(): void {
    console.log('close');
  }
}
