import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-alert-basic',
  template: `
    <nz-alert [nzType]="'success'">
      <span alert-body>
        <pre>Success Text</pre>
      </span>
    </nz-alert>
  `
})

export class NzDemoAlertBasicComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}

