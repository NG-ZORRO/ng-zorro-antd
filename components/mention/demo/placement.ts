import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-demo-mention-placement',
  encapsulation: ViewEncapsulation.None,
  template: `
    <nz-mention nzPlacement="top" [nzSuggestions]="suggestions" (nzOnSelect)="onSelect($event)">
      <textarea
        rows="1"
        nzMentionTrigger
        nz-input
        [(ngModel)]="inputValue"
        (ngModelChange)="onChange($event)"
      ></textarea>
    </nz-mention>
  `
})
export class NzDemoMentionPlacementComponent {
  inputValue?: string;
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];

  onChange(value: string): void {
    console.log(value);
  }

  onSelect(suggestion: string): void {
    console.log(`onSelect ${suggestion}`);
  }
}
