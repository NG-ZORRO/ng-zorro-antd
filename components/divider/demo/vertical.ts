import { Component } from '@angular/core';

import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'nz-demo-divider-vertical',
  imports: [NzDividerModule],
  template: `
    <div>
      Text
      <nz-divider nzType="vertical" />
      <a href="#">Link</a>
      <nz-divider nzType="vertical" />
      <a href="#">Link</a>
    </div>
  `
})
export class NzDemoDividerVerticalComponent {}
