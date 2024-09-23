import { Component } from '@angular/core';

import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-borderless',
  standalone: true,
  imports: [NzInputModule],
  template: `<input nz-input placeholder="borderless" nzBorderless />`
})
export class NzDemoInputBorderlessComponent {}
