import {Component} from '@angular/core';

@Component({
  selector: 'nz-demo-progress-format',
  template: `
    <nz-progress [nzPercent]="75" nzType="circle" [nzFormat]="formatOne"></nz-progress>
    <nz-progress [nzPercent]="100" nzType="circle" [nzFormat]="formatTwo"></nz-progress>
  `
})
export class NzDemoProgressFormatComponent {
  formatOne = percent => `${percent} Days`;
  formatTwo = () => `Done`;
}
