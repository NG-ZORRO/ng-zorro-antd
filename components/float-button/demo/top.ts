import { Component } from '@angular/core';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';

@Component({
  selector: 'nz-demo-float-button-top',
  imports: [NzFloatButtonModule],
  template: `
    <nz-float-button-top></nz-float-button-top>
    Scroll down to see the back to top button on the bottom right
  `
})
export class NzDemoFloatButtonTopComponent {}
