import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'nz-demo-empty-customize',
  imports: [NzButtonModule, NzEmptyModule],
  template: `
    <nz-empty
      nzNotFoundImage="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      [nzNotFoundContent]="contentTpl"
      [nzNotFoundFooter]="footerTpl"
    >
      <ng-template #contentTpl>
        <span>
          Customize
          <a href="#API">Description</a>
        </span>
      </ng-template>
      <ng-template #footerTpl>
        <button nz-button nzType="primary" (click)="onClick()">Create Now</button>
      </ng-template>
    </nz-empty>
  `
})
export class NzDemoEmptyCustomizeComponent {
  onClick(): void {
    console.log('clicked');
  }
}
