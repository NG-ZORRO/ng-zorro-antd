import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-segmented-disabled',
  template: `<nz-segmented [nzOptions]="['Map', 'Transit', 'Satellite']" nzDisabled></nz-segmented>
    <br />
    <nz-segmented [nzOptions]="options"></nz-segmented>`,
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
export class NzDemoSegmentedDisabledComponent {
  options = [
    'Daily',
    { label: 'Weekly', value: 'Weekly', disabled: true },
    'Monthly',
    { label: 'Quarterly', value: 'Quarterly', disabled: true },
    'Yearly'
  ];
}
