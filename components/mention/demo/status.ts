import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-demo-mention-status',
  encapsulation: ViewEncapsulation.None,
  template: `
    <nz-mention [nzSuggestions]="suggestions" nzStatus="error">
      <input placeholder="input here" nzMentionTrigger nz-input [(ngModel)]="inputValue" />
    </nz-mention>
    <nz-mention [nzSuggestions]="suggestions" nzStatus="warning">
      <input placeholder="input here" nzMentionTrigger nz-input [(ngModel)]="inputValue" />
    </nz-mention>
  `
})
export class NzDemoMentionStatusComponent {
  inputValue: string = '@afc163';
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];
}
