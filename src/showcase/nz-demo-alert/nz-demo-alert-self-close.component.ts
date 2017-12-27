import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-alert-self-close',
  template: `
    <nz-alert [nzType]="'info'" [nzMessage]="'Info Text'" [nzCloseText]="'Close Now'">
    </nz-alert>
  `
})
export class NzDemoAlertSelfCloseComponent { }
