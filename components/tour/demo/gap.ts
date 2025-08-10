import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTourModule } from 'ng-zorro-antd/tour';

@Component({
  selector: 'nz-demo-tour-gap',
  standalone: true,
  imports: [NzButtonModule, NzTourModule],
  template: `
    <!-- Placeholder demo: gap -->
    <button nz-button>Begin Tour</button>
  `
})
export class NzDemoTourGapComponent {}
