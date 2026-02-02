import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-auto-complete-status',
  imports: [FormsModule, NzAutocompleteModule, NzInputModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <input nz-input [(ngModel)]="value" [nzAutocomplete]="auto" nzStatus="error" />
    <br />
    <br />
    <input nz-input [(ngModel)]="value" [nzAutocomplete]="auto" nzStatus="warning" />
    <nz-autocomplete [nzDataSource]="['12345', '23456', '34567']" #auto />
  `
})
export class NzDemoAutoCompleteStatusComponent {
  value?: string;
}
