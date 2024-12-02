import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMentionModule } from 'ng-zorro-antd/mention';

@Component({
  selector: 'nz-demo-mention-multilines',
  imports: [FormsModule, NzInputModule, NzMentionModule],
  template: `
    <nz-mention [nzSuggestions]="suggestions">
      <textarea nz-input [nzAutosize]="{ minRows: 4, maxRows: 4 }" [(ngModel)]="inputValue" nzMentionTrigger></textarea>
    </nz-mention>
  `
})
export class NzDemoMentionMultilinesComponent {
  inputValue?: string;
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];
}
