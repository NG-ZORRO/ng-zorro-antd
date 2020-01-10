import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-checkbox-check-all',
  template: `
    <div style="border-bottom: 1px solid rgb(233, 233, 233);">
      <label nz-checkbox [(ngModel)]="allChecked" (ngModelChange)="updateAllChecked()" [nzIndeterminate]="indeterminate">
        Check all
      </label>
    </div>
    <br />
    <nz-checkbox-group [(ngModel)]="checkOptionsOne" (ngModelChange)="updateSingleChecked()"></nz-checkbox-group>
  `
})
export class NzDemoCheckboxCheckAllComponent {
  allChecked = false;
  indeterminate = true;
  checkOptionsOne = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear', checked: false },
    { label: 'Orange', value: 'Orange', checked: false }
  ];

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne = this.checkOptionsOne.map(item => {
        return {
          ...item,
          checked: true
        };
      });
    } else {
      this.checkOptionsOne = this.checkOptionsOne.map(item => {
        return {
          ...item,
          checked: false
        };
      });
    }
  }

  updateSingleChecked(): void {
    if (this.checkOptionsOne.every(item => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every(item => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }
}
