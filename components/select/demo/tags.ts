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
  selector: 'nz-demo-select-tags',
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select nzMode="tags" nzPlaceHolder="Tag Mode" [(ngModel)]="listOfTagOptions">
      @for (option of listOfOption; track option) {
        <nz-option [nzLabel]="option" [nzValue]="option" />
      }
    </nz-select>
  `,
  styles: `
    nz-select {
      width: 100%;
    }
  `
})
export class NzDemoSelectTagsComponent {
  readonly listOfOption: string[] = alphabet();
  listOfTagOptions: string[] = [];
}
