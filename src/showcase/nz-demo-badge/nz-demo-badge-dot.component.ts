import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-dot',
  template: `
    <nz-badge nzDot>
      <ng-template #content><i class="anticon anticon-notification"></i></ng-template>
    </nz-badge>

    <nz-badge nzDot>
      <ng-template #content>
        <a>一个链接</a>
      </ng-template>
    </nz-badge>

  `,
  styles  : [ `
    :host ::ng-deep .ant-badge {
      margin-right: 16px;
    }

    .head-example {
      width: 42px;
      height: 42px;
      border-radius: 6px;
      background: #eee;
      display: inline-block;
    }
  ` ]
})
export class NzDemoBadgeDotComponent { }

