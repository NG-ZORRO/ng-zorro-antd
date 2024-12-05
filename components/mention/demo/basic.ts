import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMentionModule } from 'ng-zorro-antd/mention';

@Component({
  selector: 'nz-demo-mention-basic',
  imports: [FormsModule, NzInputModule, NzMentionModule],
  template: `
    <nz-mention [nzSuggestions]="suggestions" (nzOnSelect)="onSelect($event)">
      <textarea
        rows="1"
        placeholder="input here"
        nzMentionTrigger
        nz-input
        [(ngModel)]="inputValue"
        (ngModelChange)="onChange($event)"
      ></textarea>
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
