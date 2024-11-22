import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  standalone: true,
  selector: 'nz-demo-auto-complete-status',
  imports: [FormsModule, NzAutocompleteModule, NzInputModule, NzSpaceModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <nz-space nzDirection="vertical" style="width: 100%">
      <input *nzSpaceItem nz-input [(ngModel)]="value" [nzAutocomplete]="auto" nzStatus="error" />
      <input *nzSpaceItem nz-input [(ngModel)]="value" [nzAutocomplete]="auto" nzStatus="warning" />
      <nz-autocomplete [nzDataSource]="['12345', '23456', '34567']" #auto></nz-autocomplete>
    </nz-space>
  `
})
export class NzDemoAutoCompleteStatusComponent {
  value?: string;
}
