import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'nz-demo-result-info',
  imports: [NzButtonModule, NzResultModule],
  template: `
    <nz-result nzStatus="info" nzTitle="Your operation has been executed">
      <div nz-result-extra>
        <button nz-button nzType="primary">Go Console</button>
      </div>
    </nz-result>
  `
})
export class NzDemoResultInfoComponent {}
