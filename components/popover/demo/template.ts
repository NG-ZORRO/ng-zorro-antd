import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@Component({
  selector: 'nz-demo-popover-template',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, NzPopoverModule],
  template: `
    <button nz-button nz-popover [nzPopoverTitle]="titleTemplate" [nzPopoverContent]="contentTemplate">
      Render Template
    </button>
    <ng-template #titleTemplate>
      <span nz-icon nzType="close"></span>
      Title
    </ng-template>
    <ng-template #contentTemplate>
      <span nz-icon nzType="check"></span>
      Content
    </ng-template>
  `
})
export class NzDemoPopoverTemplateComponent {}
