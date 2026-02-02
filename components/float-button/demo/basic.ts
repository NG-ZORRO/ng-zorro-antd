import { Component } from '@angular/core';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';

@Component({
  selector: 'nz-demo-float-button-basic',
  imports: [NzFloatButtonModule],
  template: `
    <div class="basic">
      <nz-float-button />
    </div>
  `,
  styles: `
    .basic {
      height: 300px;
      position: relative;
    }
    nz-float-button {
      position: absolute;
    }
  `
})
export class NzDemoFloatButtonBasicComponent {}
