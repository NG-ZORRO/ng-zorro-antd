import { Component } from '@angular/core';

import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'nz-demo-grid-basic',
  imports: [NzGridModule],
  template: `
    <div nz-row>
      <div nz-col nzSpan="12">col-12</div>
      <div nz-col nzSpan="12">col-12</div>
    </div>
    <div nz-row>
      <div nz-col nzSpan="8">col-8</div>
      <div nz-col nzSpan="8">col-8</div>
      <div nz-col nzSpan="8">col-8</div>
    </div>
    <div nz-row>
      <div nz-col nzSpan="6">col-6</div>
      <div nz-col nzSpan="6">col-6</div>
      <div nz-col nzSpan="6">col-6</div>
      <div nz-col nzSpan="6">col-6</div>
    </div>
  `
})
export class NzDemoGridBasicComponent {}
