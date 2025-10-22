import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCheckboxModule, NzCheckboxOption } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'nz-demo-checkbox-group',
  imports: [FormsModule, NzCheckboxModule],
  template: `
    <nz-checkbox-group [nzOptions]="options1" [(ngModel)]="value" (ngModelChange)="log($event)" />
    <br />
    <br />
    <nz-checkbox-group [nzOptions]="options2" [(ngModel)]="value" (ngModelChange)="log($event)" />
    <br />
    <br />
    <nz-checkbox-group nzDisabled [nzOptions]="options3" [(ngModel)]="value" (ngModelChange)="log($event)" />
  `
})
export class NzDemoCheckboxGroupComponent {
  options1: NzCheckboxOption[] = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' }
  ];
  options2: NzCheckboxOption[] = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: true }
  ];
  options3: NzCheckboxOption[] = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' }
  ];

  value = ['Apple'];

  log(value: string[]): void {
    console.log(value);
  }
}
