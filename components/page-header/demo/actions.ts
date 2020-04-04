import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-page-header-actions',
  template: `
    <nz-page-header class="site-page-header" nzBackIcon>
      <nz-page-header-title>Title</nz-page-header-title>
      <nz-page-header-subtitle>This is a subtitle</nz-page-header-subtitle>
      <nz-page-header-extra>
        <button nz-button>Operation</button>
        <button nz-button>Operation</button>
        <button nz-button nzType="primary">Primary</button>
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
        <nz-tag nzColor="blue">Runing</nz-tag>
      </nz-page-header-tags>
      <nz-page-header-extra>
        <button nz-button>Operation</button>
        <button nz-button>Operation</button>
        <button nz-button nzType="primary">Primary</button>
      </nz-page-header-extra>
      <nz-page-header-content>
        <nz-row nzType="flex">
          <nz-statistic nzTitle="Status" nzValue="Pending"></nz-statistic>
          <nz-statistic nzTitle="Price" [nzValue]="568.08" nzPrefix="$" style="margin: 0 32px"></nz-statistic>
          <nz-statistic nzTitle="Balance" [nzValue]="3345.08" nzPrefix="$"></nz-statistic>
        </nz-row>
      </nz-page-header-content>
    </nz-page-header>
  `
})
export class NzDemoPageHeaderActionsComponent {}
