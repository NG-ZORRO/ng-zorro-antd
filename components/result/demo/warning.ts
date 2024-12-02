import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'nz-demo-result-warning',
  imports: [NzButtonModule, NzResultModule],
  template: `
    <nz-result nzStatus="warning" nzTitle="There are some problems with your operation">
      <div nz-result-extra>
        <button nz-button nzType="primary">Go Console</button>
      </div>
    </nz-result>
  `
})
export class NzDemoResultWarningComponent {}
