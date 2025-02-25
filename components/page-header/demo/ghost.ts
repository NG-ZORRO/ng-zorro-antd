import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-page-header-ghost',
  imports: [NzButtonModule, NzDescriptionsModule, NzPageHeaderModule, NzSpaceModule],
  template: `
    <nz-page-header nzBackIcon [nzGhost]="false">
      <nz-page-header-title>Title</nz-page-header-title>
      <nz-page-header-subtitle>This is a subtitle</nz-page-header-subtitle>
      <nz-page-header-extra>
        <nz-space>
          <button *nzSpaceItem nz-button>Operation</button>
          <button *nzSpaceItem nz-button>Operation</button>
          <button *nzSpaceItem nz-button nzType="primary">Primary</button>
        </nz-space>
      </nz-page-header-extra>
      <nz-page-header-content>
        <nz-descriptions nzSize="small" [nzColumn]="3">
          <nz-descriptions-item nzTitle="Created" [nzSpan]="1">Lili Qu</nz-descriptions-item>
          <nz-descriptions-item nzTitle="Association" [nzSpan]="1"><a>421421</a></nz-descriptions-item>
          <nz-descriptions-item nzTitle="Creation Time" [nzSpan]="1">2017-01-10</nz-descriptions-item>
          <nz-descriptions-item nzTitle="Effective Time" [nzSpan]="1">2017-10-10</nz-descriptions-item>
          <nz-descriptions-item nzTitle="Remarks" [nzSpan]="2">
            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
          </nz-descriptions-item>
        </nz-descriptions>
      </nz-page-header-content>
    </nz-page-header>
  `
})
export class NzDemoPageHeaderGhostComponent {}
