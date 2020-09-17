import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pipes-trim',
  template: `
    <input type="text" nz-input [(ngModel)]="str" />
    <br />
    <div>
      <pre>{{ str }}</pre>
    </div>
    <div>
      <pre>{{ str | nzTrim }}</pre>
    </div>
  `,
  styles: [
    `
      div {
        padding: 8px 12px;
      }
      pre {
        display: inline-block;
        background: #eee;
      }
    `
  ]
})
export class NzDemoPipesTrimComponent {
  str = ' Ant Design ';
}
