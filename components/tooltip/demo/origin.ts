import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzElementPatchDirective } from 'ng-zorro-antd/core/element-patch';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'nz-demo-tooltip-origin',
  imports: [NzButtonModule, NzTooltipModule, NzElementPatchDirective],
  template: `
    <button nz-button nz-element #button="nzElement">Action</button>
    <a nz-tooltip nzTooltipTitle="This action could not be revoked!" [nzTooltipOrigin]="button.elementRef">Notice</a>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoTooltipOriginComponent {}
