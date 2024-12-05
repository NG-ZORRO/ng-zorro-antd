import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@Component({
  selector: 'nz-demo-popover-basic',
  imports: [NzButtonModule, NzPopoverModule],
  template: `
    <button nz-button nz-popover nzType="primary" nzPopoverTitle="Title" nzPopoverContent="Content">Hover me</button>
  `
})
export class NzDemoPopoverBasicComponent {}
