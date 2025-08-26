import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { NzSanitizerPipe } from 'ng-zorro-antd/pipes';

@Component({
  selector: 'nz-highlight',
  imports: [NzSanitizerPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pre class="language-angular">
      <code [innerHTML]="nzCode() | nzSanitizer: 'html'"></code>
    </pre>
  `
})
export class NzHighlightComponent {
  nzCode = input<string>();
}
