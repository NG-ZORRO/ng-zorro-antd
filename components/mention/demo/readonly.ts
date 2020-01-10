import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-demo-mention-readonly',
  encapsulation: ViewEncapsulation.None,
  template: `
    <nz-mention [nzSuggestions]="suggestions">
      <input
        style="margin-bottom: 10px"
        placeholder="this is disabled Mention"
        nzMentionTrigger
        nz-input
        disabled
        [(ngModel)]="inputValue"
      />
      <input placeholder="this is readOnly Mention" nzMentionTrigger nz-input readOnly [(ngModel)]="inputValue" />
    </nz-mention>
  `
})
export class NzDemoMentionReadonlyComponent {
  inputValue: string;
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];
}
