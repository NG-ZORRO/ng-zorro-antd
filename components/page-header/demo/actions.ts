import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-page-header-actions',
  template: `
    <nz-page-header nzBackIcon>
      <nz-page-header-title>Title</nz-page-header-title>
      <nz-page-header-subtitle>This is a subtitle</nz-page-header-subtitle>
      <nz-page-header-tags>
        <nz-tag [nzColor]="'red'">Warning</nz-tag>
      </nz-page-header-tags>
      <nz-page-header-extra>
        <button nz-button>Operation</button>
        <button nz-button>Operation</button>
        <button nz-button nzType="primary">Primary</button>
      </nz-page-header-extra>
      <nz-page-header-content>
        <div class="wrap">
          <div nz-row class="content padding">
            <nz-descriptions [nzColumn]="2">
              <nz-descriptions-item nzTitle="Created" [nzSpan]="1">Lili Qu</nz-descriptions-item>
              <nz-descriptions-item nzTitle="Association" [nzSpan]="1"><a>421421</a></nz-descriptions-item>
              <nz-descriptions-item nzTitle="Creation Time" [nzSpan]="1">2017-01-10</nz-descriptions-item>
              <nz-descriptions-item nzTitle="Effective Time" [nzSpan]="1">2017-10-10</nz-descriptions-item>
              <nz-descriptions-item nzTitle="Remarks" [nzSpan]="2">
                Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
              </nz-descriptions-item>
            </nz-descriptions>
          </div>
          <div nz-row class="extra-content">
            <div nz-col nzSpan="12">
              <span class="label">Status</span>
              <p class="detail">Pending</p>
            </div>
            <div nz-col nzSpan="12">
              <span class="label"> Price</span>
              <p class="detail">$ 568.08</p>
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
      nz-page-header {
        border: 1px solid rgb(235, 237, 240);
      }

      .wrap {
        display: flex;
      }

      .content {
        flex: 1;
      }

      .content.padding {
        padding-left: 40px;
      }

      .extra-content {
        min-width: 240px;
        text-align: right;
      }

      .extra-content .label {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        line-height: 22px;
      }

      .extra-content .detail {
        font-size: 20px;
        color: rgba(0, 0, 0, 0.85);
        line-height: 28px;
      }
    `
  ]
})
export class NzDemoPageHeaderActionsComponent {}
