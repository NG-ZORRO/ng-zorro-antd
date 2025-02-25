import { Component } from '@angular/core';

import { NzHashCodeModule } from 'ng-zorro-antd/hash-code';

@Component({
  selector: 'nz-demo-hash-code-strip',
  imports: [NzHashCodeModule],
  template: `
    <nz-hash-code [nzValue]="value" nzMode="strip"></nz-hash-code>
    <br />
    <nz-hash-code [nzValue]="value" nzMode="strip" nzType="primary"></nz-hash-code>
  `
})
export class NzDemoHashCodeStripComponent {
  value = 'dfb5fe9ef7b99b2b1db102114a6d7d445d992f40a5d575f801c148990199a068';
}
