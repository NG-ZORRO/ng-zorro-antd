import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { MentionOnSearchTypes, NzMentionModule } from 'ng-zorro-antd/mention';

@Component({
  selector: 'nz-demo-mention-prefix',
  imports: [FormsModule, NzInputModule, NzMentionModule],
  template: `
    <nz-mention [nzSuggestions]="suggestions" (nzOnSearchChange)="onSearchChange($event)" [nzPrefix]="['#', '@']">
      <textarea
        rows="1"
        placeholder="input @ to mention people, # to mention tag"
        nzMentionTrigger
        nz-input
        [(ngModel)]="inputValue"
      ></textarea>
    </nz-mention>
  `
})
export class NzDemoMentionPrefixComponent {
  inputValue?: string;
  suggestions: string[] = [];
  users = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];
  tags = ['1.0', '2.0', '3.0'];

  onSearchChange({ value, prefix }: MentionOnSearchTypes): void {
    console.log('nzOnSearchChange', value, prefix);
    this.suggestions = prefix === '@' ? this.users : this.tags;
  }
}
