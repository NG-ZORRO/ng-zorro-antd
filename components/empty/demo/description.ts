import { Component } from '@angular/core';

import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'nz-demo-empty-description',
  imports: [NzEmptyModule],
  template: `<nz-empty [nzNotFoundContent]="null" />`
})
export class NzDemoEmptyDescriptionComponent {}
