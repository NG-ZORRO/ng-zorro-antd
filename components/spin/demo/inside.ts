import { Component } from '@angular/core';

import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'nz-demo-spin-inside',
  imports: [NzSpinModule],
  template: `
    <div class="container">
      <nz-spin nzSimple />
    </div>
  `,
  styles: `
    .container {
      text-align: center;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      padding: 30px 50px;
      margin: 20px 0;
    }
  `
})
export class NzDemoSpinInsideComponent {}
