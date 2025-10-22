import { Component } from '@angular/core';

import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'nz-demo-typography-title',
  imports: [NzTypographyModule],
  template: `
    <h1 nz-typography>h1. Ant Design</h1>
    <h2 nz-typography>h2. Ant Design</h2>
    <h3 nz-typography>h3. Ant Design</h3>
    <h4 nz-typography>h4. Ant Design</h4>
    <h5 nz-typography>h5. Ant Design</h5>
  `
})
export class NzDemoTypographyTitleComponent {}
