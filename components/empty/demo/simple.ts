import { Component } from '@angular/core';

import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'nz-demo-empty-simple',
  imports: [NzEmptyModule],
  template: `<nz-empty nzNotFoundImage="simple"></nz-empty>`
})
export class NzDemoEmptySimpleComponent {}
