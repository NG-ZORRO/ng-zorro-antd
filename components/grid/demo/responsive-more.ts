import { Component } from '@angular/core';

import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'nz-demo-grid-responsive-more',
  imports: [NzGridModule],
  template: `
    <div nz-row>
      <div nz-col [nzXs]="{ span: 5, offset: 1 }" [nzLg]="{ span: 6, offset: 2 }">Col</div>
      <div nz-col [nzXs]="{ span: 11, offset: 1 }" [nzLg]="{ span: 6, offset: 2 }">Col</div>
      <div nz-col [nzXs]="{ span: 5, offset: 1 }" [nzLg]="{ span: 6, offset: 2 }">Col</div>
    </div>
  `
})
export class NzDemoGridResponsiveMoreComponent {}
