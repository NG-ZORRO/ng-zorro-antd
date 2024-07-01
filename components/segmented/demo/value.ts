import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-segmented-value',
  template: `<nz-segmented
      [nzOptions]="options"
      [(ngModel)]="selectedIndex"
      (ngModelChange)="handleModelChange($event)"
    ></nz-segmented
    ><br /><nz-segmented
      [nzOptions]="options"
      [(ngModel)]="selectedIndex"
      (ngModelChange)="handleModelChange($event)"
    ></nz-segmented
    ><br />
    Selected index: {{ selectedIndex }}`,
  styles: [
    `
      .code-box-demo {
        overflow-x: auto;
      }

      .ant-segmented {
        margin-bottom: 10px;
      }
    `
  ]
})
export class NzDemoSegmentedValueComponent {
  selectedIndex = 1;
  options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  handleModelChange(index: number): void {
    console.log(index);
  }
}
