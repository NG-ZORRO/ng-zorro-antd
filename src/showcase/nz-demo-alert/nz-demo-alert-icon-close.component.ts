import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-alert-icon-close',
  template: `
    <nz-alert [nzType]="'info'" [nzMessage]="'Info Text'" [nzCloseText]="'Close Now'">
    </nz-alert>
  `
})

export class NzDemoAlertIconCloseComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
