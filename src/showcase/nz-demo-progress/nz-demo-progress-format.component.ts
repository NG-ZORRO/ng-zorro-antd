import {Component} from '@angular/core';

@Component({
  selector: 'nz-demo-progress-format',
  template: `
    <nz-progress [ngModel]="75" [nzType]="'circle'" [nzFormat]="_formatOne"></nz-progress>
    <nz-progress [ngModel]="100" [nzType]="'circle'" [nzFormat]="_formatTwo"></nz-progress>
  `,
  styles  : []
})
export class NzDemoProgressFormatComponent {
  _formatOne = percent => `${percent} Days`;
  _formatTwo = percent => `Done`;
}
