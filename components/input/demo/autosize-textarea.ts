import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component } from '@angular/core';

import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-autosize-textarea',
  imports: [NzInputModule, CdkTextareaAutosize],
  template: `
    <textarea nz-input placeholder="Autosize height based on content lines" cdkTextareaAutosize></textarea>
    <br />
    <br />
    <textarea
      nz-input
      placeholder="Autosize height with minimum and maximum number of lines"
      cdkTextareaAutosize
      cdkAutosizeMinRows="2"
      cdkAutosizeMaxRows="6"
    ></textarea>
    <br />
    <br />
    <textarea
      nz-input
      placeholder="Controlled autosize"
      cdkTextareaAutosize
      cdkAutosizeMinRows="3"
      cdkAutosizeMaxRows="5"
    ></textarea>
  `
})
export class NzDemoInputAutosizeTextareaComponent {}
