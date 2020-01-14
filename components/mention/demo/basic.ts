import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-demo-mention-basic',
  encapsulation: ViewEncapsulation.None,
  template: `
    <nz-mention [nzSuggestions]="suggestions" (nzOnSelect)="onSelect($event)">
      <input placeholder="input here" nzMentionTrigger nz-input [(ngModel)]="inputValue" (ngModelChange)="onChange($event)" />
    </nz-mention>
  `
})
export class NzDemoMentionBasicComponent {
  inputValue: string = '@afc163';
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];

  onChange(value: string): void {
    console.log(value);
  }

  onSelect(suggestion: string): void {
    console.log(`onSelect ${suggestion}`);
  }
}
