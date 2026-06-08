import { Component, input } from '@angular/core';

import { NzSanitizerPipe } from 'ng-zorro-antd/pipes';

@Component({
  selector: 'nz-highlight',
  imports: [NzSanitizerPipe],
  template: `
    <pre class="language-angular">
      <code [innerHTML]="nzCode() | nzSanitizer: 'html'"></code>
    </pre>
  `
})
export class NzHighlightComponent {
  nzCode = input<string>();
}
