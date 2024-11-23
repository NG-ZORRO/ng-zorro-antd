import { Component } from '@angular/core';

import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  standalone: true,
  selector: 'nz-demo-affix-basic',
  imports: [NzAffixModule, NzButtonModule],
  template: `
    <nz-affix [nzOffsetTop]="offsetTop">
      <button nz-button nzType="primary" (click)="setOffsetTop()">
        <span>Affix top</span>
      </button>
    </nz-affix>
    <br />
    <nz-affix [nzOffsetBottom]="nzOffsetBottom" (click)="setOffsetBottom()">
      <button nz-button nzType="primary">
        <span>Affix bottom</span>
      </button>
    </nz-affix>
  `
})
export class NzDemoAffixBasicComponent {
  offsetTop = 10;
  nzOffsetBottom = 10;

  setOffsetTop(): void {
    this.offsetTop += 10;
  }

  setOffsetBottom(): void {
    this.nzOffsetBottom += 10;
  }
}
