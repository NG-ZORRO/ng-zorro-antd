import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-value',
  imports: [FormsModule, NzSegmentedModule],
  template: `
    <nz-segmented [nzOptions]="options" [(ngModel)]="selectedValue" (ngModelChange)="handleModelChange($event)" />
    <br />
    Selected value: {{ selectedValue }}
  `,
  styles: [
    `
      .ant-segmented {
        margin-bottom: 10px;
      }
    `
  ]
})
export class NzDemoSegmentedValueComponent {
  selectedValue = 'Weekly';
  options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  handleModelChange(value: string): void {
    console.log(value);
  }
}
