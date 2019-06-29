import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-hide-selected',
  template: `
    <nz-select
      style="width: 100%"
      nzMode="multiple"
      nzPlaceHolder="Inserted are removed"
      [nzHideSelectedOptions]="true"
      [(ngModel)]="listOfSelectedValue"
    >
      <ng-container *ngFor="let option of listOfOption">
        <nz-option [nzLabel]="option" [nzValue]="option"></nz-option>
      </ng-container>
    </nz-select>
  `
})
export class NzDemoSelectHideSelectedComponent {
  listOfOption = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
  listOfSelectedValue: string[] = ['Apples', 'Nails'];
}
