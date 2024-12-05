import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-autosize-textarea',
  imports: [FormsModule, NzInputModule],
  template: `
    <textarea nz-input placeholder="Autosize height based on content lines" nzAutosize></textarea>
    <textarea
      nz-input
      placeholder="Autosize height with minimum and maximum number of lines"
      [nzAutosize]="{ minRows: 2, maxRows: 6 }"
    ></textarea>
    <textarea nz-input placeholder="Controlled autosize" [nzAutosize]="{ minRows: 3, maxRows: 5 }"></textarea>
  `,
  styles: [
    `
      textarea + textarea {
        margin-top: 24px;
      }
    `
  ]
})
export class NzDemoInputAutosizeTextareaComponent {}
