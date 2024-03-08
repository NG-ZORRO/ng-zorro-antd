import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-demo-mention-status',
  encapsulation: ViewEncapsulation.None,
  template: `
    <nz-mention [nzSuggestions]="suggestions" nzStatus="error" style="margin-bottom: 8px;">
      <textarea rows="1" nz-input placeholder="input here" [(ngModel)]="inputValue" nzMentionTrigger></textarea>
    </nz-mention>
    <nz-mention [nzSuggestions]="suggestions" nzStatus="warning">
      <textarea rows="1" nz-input placeholder="input here" [(ngModel)]="inputValue" nzMentionTrigger></textarea>
    </nz-mention>
  `
})
export class NzDemoMentionStatusComponent {
  inputValue: string = '@afc163';
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];
}
