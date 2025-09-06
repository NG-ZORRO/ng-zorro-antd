import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMentionModule } from 'ng-zorro-antd/mention';

@Component({
  selector: 'nz-demo-mention-clear',
  imports: [FormsModule, NzInputModule, NzMentionModule],
  template: `
    <nz-mention [nzSuggestions]="suggestions" (nzOnSelect)="onSelect($event)" nzAllowClear (nzOnClear)="onClear()">
      <textarea rows="1" placeholder="input here" nzMentionTrigger nz-input [(ngModel)]="inputValue"></textarea>
    </nz-mention>
    <br />
    <br />
    <nz-mention [nzSuggestions]="suggestions" (nzOnSelect)="onSelect($event)" nzAllowClear (nzOnClear)="onClear()">
      <textarea rows="3" placeholder="input here" nzMentionTrigger nz-input [(ngModel)]="inputValue"></textarea>
    </nz-mention>
  `
})
export class NzDemoMentionClearComponent {
  inputValue = model('@afc163');
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];

  onSelect(e: string): void {
    console.log(e);
  }

  onClear(): void {
    console.log('onClear');
  }
}
