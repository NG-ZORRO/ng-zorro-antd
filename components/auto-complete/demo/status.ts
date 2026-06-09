import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-auto-complete-status',
  imports: [FormsModule, NzAutocompleteModule, NzFlexModule, NzInputModule],
  template: `
    <nz-flex nzVertical nzGap="1rem">
      <input nz-input [(ngModel)]="value" [nzAutocomplete]="auto" nzStatus="error" />
      <input nz-input [(ngModel)]="value" [nzAutocomplete]="auto" nzStatus="warning" />
    </nz-flex>
    <nz-autocomplete [nzDataSource]="['12345', '23456', '34567']" #auto />
  `
})
export class NzDemoAutoCompleteStatusComponent {
  value?: string;
}
