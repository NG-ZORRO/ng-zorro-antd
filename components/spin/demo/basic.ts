import { Component } from '@angular/core';

import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'nz-demo-spin-basic',
  imports: [NzSpinModule],
  template: `<nz-spin nzSimple></nz-spin>`
})
export class NzDemoSpinBasicComponent {}
