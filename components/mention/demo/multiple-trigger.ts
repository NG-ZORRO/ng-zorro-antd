import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-mention-multiple-trigger',
  encapsulation: ViewEncapsulation.None,
  template     : `
  <nz-mention
    [nzSuggestions]="suggestions"
    [nzPrefix]="['#', '@']">
    <input
      placeholder="input @ to mention people, # to mention tag"
      nzMentionTrigger
      nz-input
      [(ngModel)]="inputValue">
  </nz-mention>
`
})
export class NzDemoMentionMultipleTriggerComponent {
  inputValue: string;
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];

}
