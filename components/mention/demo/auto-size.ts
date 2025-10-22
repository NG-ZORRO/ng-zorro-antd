import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMentionModule } from 'ng-zorro-antd/mention';

@Component({
  selector: 'nz-demo-mention-auto-size',
  imports: [FormsModule, NzMentionModule, NzInputModule, CdkTextareaAutosize],
  template: `
    <nz-mention [nzSuggestions]="suggestions" (nzOnSelect)="onSelect($event)">
      <textarea
        nz-input
        placeholder="input here"
        nzMentionTrigger
        [(ngModel)]="inputValue"
        cdkTextareaAutosize
      ></textarea>
    </nz-mention>
  `
})
export class NzDemoMentionAutoSizeComponent {
  readonly inputValue = model('@afc163');
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];

  onSelect(suggestion: string): void {
    console.log(`onSelect ${suggestion}`);
  }
}
