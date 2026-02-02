import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'nz-demo-page-header-actions',
  imports: [
    NzButtonModule,
    NzDescriptionsModule,
    NzGridModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzStatisticModule,
    NzTagModule
  ],
  template: `
    <nz-page-header nzBackIcon>
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
    <br />
    <nz-page-header nzBackIcon>
      <nz-page-header-title>Title</nz-page-header-title>
      <nz-page-header-subtitle>This is a subtitle</nz-page-header-subtitle>
      <nz-page-header-tags>
        <nz-tag nzColor="blue">Running</nz-tag>
      </nz-page-header-tags>
      <nz-page-header-extra>
        <nz-space>
          <button *nzSpaceItem nz-button>Operation</button>
          <button *nzSpaceItem nz-button>Operation</button>
          <button *nzSpaceItem nz-button nzType="primary">Primary</button>
        </nz-space>
      </nz-page-header-extra>
      <nz-page-header-content>
        <nz-row>
          <nz-statistic nzTitle="Status" nzValue="Pending" />
          <nz-statistic nzTitle="Price" [nzValue]="568.08" nzPrefix="$" style="margin: 0 32px" />
          <nz-statistic nzTitle="Balance" [nzValue]="3345.08" nzPrefix="$" />
        </nz-row>
      </nz-page-header-content>
    </nz-page-header>
  `
})
export class NzDemoPageHeaderActionsComponent {}
