import { Component, ViewEncapsulation } from '@angular/core';
import { MentionOnSearchTypes } from 'ng-zorro-antd/mention';

@Component({
  selector: 'nz-demo-mention-async',
  encapsulation: ViewEncapsulation.None,
  template: `
    <nz-mention [nzSuggestions]="suggestions" [nzLoading]="loading" (nzOnSearchChange)="onSearchChange($event)">
      <input nzMentionTrigger nz-input [(ngModel)]="inputValue" />
    </nz-mention>
  `
})
export class NzDemoMentionAsyncComponent {
  inputValue: string;
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
    setTimeout(() => {
      return callback(users.filter(item => item.indexOf(value) !== -1));
    }, 500);
  }
}
