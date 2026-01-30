import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTrimPipe } from 'ng-zorro-antd/pipes';

@Component({
  selector: 'nz-demo-pipes-trim',
  imports: [FormsModule, NzInputModule, NzTrimPipe],
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
  styles: `
    div {
      padding: 8px 12px;
    }
    pre {
      display: inline-block;
      background: #eee;
    }
  `
})
export class NzDemoPipesTrimComponent {
  str = ' Ant Design ';
}
