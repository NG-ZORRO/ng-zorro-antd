import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMentionModule } from 'ng-zorro-antd/mention';

@Component({
  selector: 'nz-demo-mention-custom-tag',
  imports: [FormsModule, NzInputModule, NzMentionModule],
  template: `
    <nz-mention [nzSuggestions]="webFrameworks" [nzValueWith]="valueWith" (nzOnSelect)="onSelect($event)">
      <textarea rows="1" placeholder="@someone" nz-input nzMentionTrigger [(ngModel)]="inputValue"></textarea>
      <ng-container *nzMentionSuggestion="let framework">
        <span>{{ framework.name }} - {{ framework.type }}</span>
      </ng-container>
    </nz-mention>
  `
})
export class NzDemoMentionCustomTagComponent {
  inputValue?: string;
  webFrameworks = [
    { name: 'React', type: 'JavaScript' },
    { name: 'Angular', type: 'JavaScript' },
    { name: 'Laravel', type: 'PHP' },
    { name: 'Flask', type: 'Python' },
    { name: 'Django', type: 'Python' }
  ];

  valueWith = (data: { name: string; type: string }): string => data.name;

  onSelect(value: string): void {
    console.log(value);
  }
}
