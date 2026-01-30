import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-select-default-value',
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select nzMode="multiple" nzPlaceHolder="Inserted are removed" [(ngModel)]="listOfSelectedValue">
      @for (option of listOfOption; track option) {
        <nz-option [nzLabel]="option" [nzValue]="option" />
      }
      @for (option of defaultOption; track option) {
        <nz-option [nzLabel]="option" [nzValue]="option" nzHide />
      }
    </nz-select>
    <br />
    <br />
    <nz-select [(ngModel)]="selectedValue">
      @for (option of listOfOption; track option) {
        <nz-option [nzLabel]="option" [nzValue]="option" />
      }
      <nz-option nzLabel="Default Value" nzValue="Default" nzHide />
    </nz-select>
  `,
  styles: `
    nz-select {
      width: 100%;
    }
  `
})
export class NzDemoSelectDefaultValueComponent {
  listOfOption = ['Option 01', 'Option 02'];
  listOfSelectedValue = ['Default 01', 'Default 02'];
  defaultOption = [...this.listOfSelectedValue];
  selectedValue = 'Default';
}
