import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-alert-4-style',
  template: `
    <nz-alert [nzType]="'success'">
      <span alert-body>
        <pre>Success Text</pre>
      </span>
    </nz-alert>
    <nz-alert [nzType]="'info'">
      <span alert-body>
        <pre>Info Text</pre>
      </span>
    </nz-alert>
    <nz-alert [nzType]="'warning'">
      <span alert-body>
        <pre>Warning Text</pre>
      </span>
    </nz-alert>
    <nz-alert [nzType]="'error'">
      <span alert-body>
        <pre>Error Text</pre>
      </span>
    </nz-alert>
  `
})
export class NzDemoAlert4TypeComponent { }
