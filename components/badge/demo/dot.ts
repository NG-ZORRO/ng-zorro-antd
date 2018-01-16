import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-dot',
  template: `
    <nz-badge nzDot>
      <ng-template #content><i class="anticon anticon-notification"></i></ng-template>
    </nz-badge>

    <nz-badge nzDot>
      <ng-template #content>
        <a>Link something</a>
      </ng-template>
    </nz-badge>

  `,
  styles  : [ `
    ::host ::ng-deep .anticon-notification {
      width: 16px;
      height: 16px;
      line-height: 16px;
      font-size: 16px;
    }
  ` ]
})
export class NzDemoBadgeDotComponent { }

