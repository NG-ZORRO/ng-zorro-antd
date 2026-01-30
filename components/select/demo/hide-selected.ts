import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-select-hide-selected',
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select nzMode="multiple" nzPlaceHolder="Inserted are removed" [(ngModel)]="listOfSelected">
      @for (option of listOfOption; track option) {
        <nz-option [nzLabel]="option" [nzValue]="option" [nzHide]="!isSelected(option)" />
      }
    </nz-select>
  `,
  styles: `
    nz-select {
      width: 100%;
    }
  `
})
export class NzDemoSelectHideSelectedComponent {
  listOfOption = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
  listOfSelected: string[] = [];

  isSelected(value: string): boolean {
    return this.listOfSelected.indexOf(value) !== -1;
  }
}
