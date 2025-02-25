import { Component } from '@angular/core';

import { NzSanitizerPipe } from 'ng-zorro-antd/pipes';

@Component({
  selector: 'nz-demo-pipes-sanitizer',
  imports: [NzSanitizerPipe],
  template: `<div [innerHTML]="html | nzSanitizer: 'html'"></div>`
})
export class NzDemoPipesSanitizerComponent {
  html = `<span>I am <code>innerHTML</code></span>`;
}
