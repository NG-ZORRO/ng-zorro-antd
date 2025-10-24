import { Component } from '@angular/core';

import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-search-input-loading',
  imports: [NzInputModule],
  template: `
    <nz-input-search nzLoading>
      <input nz-input placeholder="input search loading default" />
    </nz-input-search>
    <br />
    <br />
    <nz-input-search nzLoading nzEnterButton>
      <input nz-input placeholder="input search loading with enterButton" />
    </nz-input-search>
    <br />
    <br />
    <nz-input-search nzLoading nzEnterButton="Search">
      <input nz-input placeholder="input search text" nzSize="large" />
    </nz-input-search>
  `
})
export class NzDemoInputSearchInputLoadingComponent {}
