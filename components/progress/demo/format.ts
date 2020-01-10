import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-format',
  template: `
    <nz-progress [nzPercent]="75" nzType="circle" [nzFormat]="formatOne"></nz-progress>
    <nz-progress [nzPercent]="100" nzType="circle" [nzFormat]="formatTwo"></nz-progress>
  `,
  styles: [
    `
      nz-progress {
        margin-right: 8px;
        margin-bottom: 8px;
        display: inline-block;
      }
    `
  ]
})
export class NzDemoProgressFormatComponent {
  formatOne = (percent: number) => `${percent} Days`;
  formatTwo = () => `Done`;
}
