import { Component } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'nz-demo-card-grid-card',
  imports: [NzCardModule],
  template: `
    <nz-card nzTitle="Cart Title">
      <div nz-card-grid>Content</div>
      <div nz-card-grid>Content</div>
      <div nz-card-grid>Content</div>
      <div nz-card-grid>Content</div>
      <div nz-card-grid>Content</div>
      <div nz-card-grid>Content</div>
      <div nz-card-grid>Content</div>
    </nz-card>
  `,
  styles: [
    `
      [nz-card-grid] {
        width: 25%;
        text-align: center;
      }
    `
  ]
})
export class NzDemoCardGridCardComponent {}
