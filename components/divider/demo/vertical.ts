import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-divider-vertical',
  template: `
    <div>
      Text
      <nz-divider nzType="vertical"></nz-divider>
      <a href="#">Link</a>
      <nz-divider nzType="vertical"></nz-divider>
      <a href="#">Link</a>
    </div>
  `
})
export class NzDemoDividerVerticalComponent {}
