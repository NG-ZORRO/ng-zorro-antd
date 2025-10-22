import { Component } from '@angular/core';

import { NzHashCodeModule } from 'ng-zorro-antd/hash-code';

@Component({
  selector: 'nz-demo-hash-code-primary',
  imports: [NzHashCodeModule],
  template: `<nz-hash-code [nzValue]="value" nzType="primary"></nz-hash-code>`
})
export class NzDemoHashCodePrimaryComponent {
  value = 'dfb5fe9ef7b99b2b1db102114a6d7d445d992f40a5d575f801c148990199a068';
}
