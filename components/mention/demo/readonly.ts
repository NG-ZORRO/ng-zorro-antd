import { Component } from '@angular/core';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMentionModule } from 'ng-zorro-antd/mention';

@Component({
  selector: 'nz-demo-mention-readonly',
  imports: [NzInputModule, NzMentionModule],
  template: `
    <nz-mention [nzSuggestions]="suggestions" style="margin-bottom: 8px">
      <textarea rows="1" placeholder="this is disabled Mention" nzMentionTrigger nz-input disabled></textarea>
    </nz-mention>
    <nz-mention [nzSuggestions]="suggestions">
      <textarea rows="1" placeholder="this is readOnly Mention" nzMentionTrigger nz-input readOnly></textarea>
    </nz-mention>
  `
})
export class NzDemoMentionReadonlyComponent {
  readonly suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];
}
