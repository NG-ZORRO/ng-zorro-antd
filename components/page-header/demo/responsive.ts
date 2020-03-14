import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-page-header-responsive',
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
        <div class="content">
          <div class="main">
            <nz-descriptions nzSize="small" [nzColumn]="2">
              <nz-descriptions-item nzTitle="Created" [nzSpan]="1">Lili Qu</nz-descriptions-item>
              <nz-descriptions-item nzTitle="Association" [nzSpan]="1"><a>421421</a></nz-descriptions-item>
              <nz-descriptions-item nzTitle="Creation Time" [nzSpan]="1">2017-01-10</nz-descriptions-item>
              <nz-descriptions-item nzTitle="Effective Time" [nzSpan]="1">2017-10-10</nz-descriptions-item>
              <nz-descriptions-item nzTitle="Remarks" [nzSpan]="2">
                Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
              </nz-descriptions-item>
            </nz-descriptions>
          </div>
          <div class="extra">
            <div>
              <nz-statistic nzTitle="Status" nzValue="Pending"></nz-statistic>
              <nz-statistic nzTitle="Price" [nzValue]="568.08" nzPrefix="$" style="margin: 0 32px"></nz-statistic>
            </div>
          </div>
        </div>
      </nz-page-header-content>
      <nz-page-header-footer>
        <nz-tabset [nzSelectedIndex]="1">
          <nz-tab nzTitle="Details"></nz-tab>
          <nz-tab nzTitle="Rule"></nz-tab>
        </nz-tabset>
      </nz-page-header-footer>
    </nz-page-header>
  `,
  styles: [
    `
      .content {
        display: flex;
      }
      .extra > div {
        display: flex;
        width: max-content;
        justify-content: flex-end;
      }
      @media (max-width: 576px) {
        .content {
          display: block;
        }

        .main {
          width: 100%;
          margin-bottom: 12px;
        }

        .extra {
          width: 100%;
          margin-left: 0;
          text-align: left;
        }
      }
    `
  ]
})
export class NzDemoPageHeaderResponsiveComponent {}
