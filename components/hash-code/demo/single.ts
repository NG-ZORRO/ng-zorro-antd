import { Component } from '@angular/core';

import { NzHashCodeModule } from 'ng-zorro-antd/hash-code';

@Component({
  selector: 'nz-demo-hash-code-single',
  imports: [NzHashCodeModule],
  template: `
    <nz-hash-code [nzValue]="value" nzMode="single" />
    <br />
    <nz-hash-code [nzValue]="value" nzMode="single" nzType="primary" />
  `
})
export class NzDemoHashCodeSingleComponent {
  value = 'dfb5fe9ef7b99b2b1db102114a6d7d445d992f40a5d575f801c148990199a068';
}
