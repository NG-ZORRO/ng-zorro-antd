import { Component } from '@angular/core';

import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'nz-demo-empty-description',
  standalone: true,
  imports: [NzEmptyModule],
  template: `<nz-empty [nzNotFoundContent]="null"></nz-empty>`
})
export class NzDemoEmptyDescriptionComponent {}
