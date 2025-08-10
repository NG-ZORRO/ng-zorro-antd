import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTourModule } from 'ng-zorro-antd/tour';

@Component({
  selector: 'nz-demo-tour-actions-render',
  standalone: true,
  imports: [NzButtonModule, NzSpaceModule, NzTourModule],
  template: `
    <!-- Placeholder demo: actions-render -->
    <button nz-button>Begin Tour</button>
  `
})
export class NzDemoTourActionsRenderComponent {}
