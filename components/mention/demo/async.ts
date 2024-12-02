import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { MentionOnSearchTypes, NzMentionModule } from 'ng-zorro-antd/mention';

@Component({
  selector: 'nz-demo-mention-async',
  imports: [FormsModule, NzInputModule, NzMentionModule],
  template: `
    <nz-mention [nzSuggestions]="suggestions" [nzLoading]="loading" (nzOnSearchChange)="onSearchChange($event)">
      <textarea rows="1" nzMentionTrigger nz-input [(ngModel)]="inputValue"></textarea>
    </nz-mention>
  `
})
export class NzDemoMentionAsyncComponent {
  inputValue?: string;
  loading = false;
  suggestions: string[] = [];

  onSearchChange({ value }: MentionOnSearchTypes): void {
    console.log(`search: ${value}`);
    this.loading = true;
    this.fetchSuggestions(value, suggestions => {
      console.log(suggestions);
      this.suggestions = suggestions;
      this.loading = false;
    });
  }

  fetchSuggestions(value: string, callback: (suggestions: string[]) => void): void {
    const users = ['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai'];
    setTimeout(() => callback(users.filter(item => item.indexOf(value) !== -1)), 500);
  }
}
