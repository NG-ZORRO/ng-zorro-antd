import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-demo-mention-readonly',
  encapsulation: ViewEncapsulation.None,
  template: `
    <nz-mention [nzSuggestions]="suggestions" style="margin-bottom: 8px">
      <textarea
        rows="1"
        placeholder="this is disabled Mention"
        nzMentionTrigger
        nz-input
        disabled
        [(ngModel)]="inputValue"
      ></textarea>
    </nz-mention>
    <nz-mention [nzSuggestions]="suggestions">
      <textarea
        rows="1"
        placeholder="this is readOnly Mention"
        nzMentionTrigger
        nz-input
        readOnly
        [(ngModel)]="inputValue"
      ></textarea>
    </nz-mention>
  `
})
export class NzDemoMentionReadonlyComponent {
  inputValue?: string;
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];
}
