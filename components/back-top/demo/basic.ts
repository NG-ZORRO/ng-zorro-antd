import { Component } from '@angular/core';

import { NzBackTopModule } from 'ng-zorro-antd/back-top';

@Component({
  standalone: true,
  selector: 'nz-demo-back-top-basic',
  imports: [NzBackTopModule],
  template: `
    <nz-back-top></nz-back-top>
    Scroll down to see the bottom-right
    <strong>gray</strong>
    button.
  `,
  styles: [
    `
      strong {
        color: rgba(64, 64, 64, 0.6);
      }
    `
  ]
})
export class NzDemoBackTopBasicComponent {}
