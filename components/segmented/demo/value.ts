import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-value',
  standalone: true,
  imports: [FormsModule, NzSegmentedModule],
  template: `
    <nz-segmented
      [nzOptions]="options"
      [(ngModel)]="selectedIndex"
      (ngModelChange)="handleModelChange($event)"
    ></nz-segmented>
    <br />
    <br />
    <nz-segmented
      [nzOptions]="options"
      [(ngModel)]="selectedIndex"
      (ngModelChange)="handleModelChange($event)"
    ></nz-segmented>
    <br />
    <br />
    Selected index: {{ selectedIndex }}
  `
})
export class NzDemoSegmentedValueComponent {
  selectedIndex = 1;
  options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  handleModelChange(index: number): void {
    console.log(index);
  }
}
