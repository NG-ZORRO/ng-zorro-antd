import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-checkbox-single',
  template: `
    <nz-checkbox-group nzSingle [(ngModel)]="checkOptions" (ngModelChange)="log(checkOptions)"></nz-checkbox-group>
  `
})
export class NzDemoCheckboxSingleComponent {
  checkOptions = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' }
  ];

  log(value: object[]): void {
    console.log(value);
  }
}
