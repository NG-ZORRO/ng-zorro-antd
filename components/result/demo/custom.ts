import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'nz-demo-result-custom',
  imports: [NzButtonModule, NzResultModule],
  template: `
    <nz-result nzIcon="smile-o" nzTitle="Great, we have done all the operators!">
      <div nz-result-extra>
        <button nz-button nzType="primary">Next</button>
      </div>
    </nz-result>
  `
})
export class NzDemoResultCustomComponent {}
