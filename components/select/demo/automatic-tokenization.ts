import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSelectModule } from 'ng-zorro-antd/select';

function alphabet(): string[] {
  const children: string[] = [];
  for (let i = 10; i < 36; i++) {
    children.push(i.toString(36) + i);
  }
  return children;
}

@Component({
  selector: 'nz-demo-select-automatic-tokenization',
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      [(ngModel)]="listOfTagOptions"
      nzMode="tags"
      [nzTokenSeparators]="[',']"
      nzPlaceHolder="automatic tokenization"
    >
      @for (option of listOfOption; track option.value) {
        <nz-option [nzLabel]="option.label" [nzValue]="option.value"></nz-option>
      }
    </nz-select>
  `,
  styles: [
    `
      nz-select {
        width: 100%;
      }
    `
  ]
})
export class NzDemoSelectAutomaticTokenizationComponent {
  readonly listOfOption: Array<{ label: string; value: string }> = alphabet().map(item => ({
    label: item,
    value: item
  }));
  listOfTagOptions: string[] = [];
}
