import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pipes-bytes',
  template: `
    <ul>
      <li>{{ 200 | nzBytes }}</li>
      <li>{{ 1024 | nzBytes }}</li>
      <li>{{ 1048576 | nzBytes }}</li>
      <li>{{ 1024 | nzBytes: 0:'KB' }}</li>
      <li>{{ 1073741824 | nzBytes }}</li>
      <li>{{ 1099511627776 | nzBytes }}</li>
      <li>{{ 1073741824 | nzBytes: 0:'B':'MB' }}</li>
    </ul>
  `
})
export class NzDemoPipesBytesComponent {}
