import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-checkbox-group',
  template: `
    <nz-checkbox-group [(ngModel)]="checkOptionsOne" (ngModelChange)="_log(checkOptionsOne)"></nz-checkbox-group>
    <br>
    <br>
    <nz-checkbox-group [(ngModel)]="checkOptionsTwo" (ngModelChange)="_log(checkOptionsTwo)"></nz-checkbox-group>
    <br>
    <br>
    <nz-checkbox-group [(ngModel)]="checkOptionsThree" (ngModelChange)="_log(checkOptionsThree)"></nz-checkbox-group>
  `,
  styles  : []
})
export class NzDemoCheckboxGroupComponent {
  checkOptionsOne = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];
  checkOptionsTwo = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear', checked: true },
    { label: 'Orange', value: 'Orange' },
  ];
  checkOptionsThree = [
    { label: 'Apple', value: 'Apple', disabled: true, checked: true },
    { label: 'Pear', value: 'Pear', disabled: true },
    { label: 'Orange', value: 'Orange' },
  ];

  _log(value) {
    console.log(value);
  }
}
