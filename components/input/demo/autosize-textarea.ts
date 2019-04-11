import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-autosize-textarea',
  template: `
    <div>
      <textarea nz-input placeholder="Autosize height based on content lines" ngModel nzAutosize></textarea>
      <div style="margin:24px 0;"></div>
      <textarea
        nz-input
        placeholder="Autosize height with minimum and maximum number of lines"
        [(ngModel)]="value"
        [nzAutosize]="{ minRows: 2, maxRows: 6 }"
      ></textarea>
    </div>
  `
})
export class NzDemoInputAutosizeTextareaComponent {
  value: string;
}
