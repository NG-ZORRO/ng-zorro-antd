import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'nz-demo-result-fof',
  imports: [NzButtonModule, NzResultModule],
  template: `
    <nz-result nzStatus="404" nzTitle="404" nzSubTitle="Sorry, the page you visited does not exist.">
      <div nz-result-extra>
        <button nz-button nzType="primary">Back Home</button>
      </div>
    </nz-result>
  `
})
export class NzDemoResultFofComponent {}
