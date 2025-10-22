import { Component } from '@angular/core';

import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'nz-demo-affix-on-change',
  imports: [NzAffixModule, NzButtonModule],
  template: `
    <nz-affix [nzOffsetTop]="120" (nzChange)="onChange($event)">
      <button nz-button>
        <span>120px to affix top</span>
      </button>
    </nz-affix>
  `
})
export class NzDemoAffixOnChangeComponent {
  onChange(status: boolean): void {
    console.log(status);
  }
}
