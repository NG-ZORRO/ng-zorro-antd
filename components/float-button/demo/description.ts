import { Component } from '@angular/core';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';

@Component({
  selector: 'nz-demo-float-button-description',
  imports: [NzFloatButtonModule],
  template: `
    <div class="description">
      <nz-float-button nzIcon="file-text" nzDescription="HELP" nzShape="square" style="right: 24px" />
      <nz-float-button nzDescription="HELP" nzShape="square" style="right: 94px" />
    </div>
  `,
  styles: `
    .description {
      height: 300px;
      position: relative;
    }
    nz-float-button {
      position: absolute;
    }
  `
})
export class NzDemoFloatButtonDescriptionComponent {}
