import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pipes-sanitizer',
  template: ` <div [innerHTML]="html | nzSanitizer: 'html'"></div> `
})
export class NzDemoPipesSanitizerComponent {
  html = `<span>I am <code>innerHTML</code></span>`;
}
