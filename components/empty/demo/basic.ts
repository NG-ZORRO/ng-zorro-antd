import { Component } from '@angular/core';

import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'nz-demo-empty-basic',
  standalone: true,
  imports: [NzEmptyModule],
  template: `<nz-empty></nz-empty>`
})
export class NzDemoEmptyBasicComponent {}
