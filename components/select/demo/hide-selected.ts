import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-hide-selected',
  template: `
    <nz-select nzMode="multiple" nzPlaceHolder="Inserted are removed" [(ngModel)]="listOfSelectedValue">
      <nz-option *ngFor="let option of listOfOption" [nzLabel]="option" [nzValue]="option" [nzHide]="!isNotSelected(option)"></nz-option>
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
export class NzDemoSelectHideSelectedComponent {
  listOfOption = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
  listOfSelectedValue: string[] = [];

  isNotSelected(value: string): boolean {
    return this.listOfSelectedValue.indexOf(value) === -1;
  }
}
