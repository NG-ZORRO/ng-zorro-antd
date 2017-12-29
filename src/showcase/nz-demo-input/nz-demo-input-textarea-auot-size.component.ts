import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-textarea-auot-size',
  template: `
    <nz-input [(ngModel)]="inputValueOne" nzType="textarea" nzAutosize nzPlaceHolder="Autosize height based on content lines"></nz-input>
    <div style="margin-top: 16px;">
      <nz-input [(ngModel)]="inputValueTwo" nzType="textarea" [nzAutosize]="autosize" nzPlaceHolder="Autosize height with minimum and maximum number of lines"></nz-input>
    </div>
  `,
  styles  : []
})
export class NzDemoInputTextareaAutoSizeComponent {
  inputValueOne: string;
  inputValueTwo: string;
  autosize = {
    minRows: 2,
    maxRows: 6
  };
}
