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
            <div nz-col nzSpan="12">
              <div class="description">
                <span class="term">Created</span>
                <p class="detail">Lili Qu</p>
              </div>
            </div>
            <div nz-col nzSpan="12">
              <div class="description">
                <span class="term">Association</span>
                <a>421421</a>
              </div>
            </div>
            <div nz-col nzSpan="12">
              <div class="description">
                <span class="term">Creation Time</span>
                <p class="detail">2017-01-10</p>
              </div>
            </div>
            <div nz-col nzSpan="12">
              <div class="description">
                <span class="term">Effective Time</span>
                <p class="detail">2017-01-10</p>
              </div>
            </div>
            <div nz-col nzSpan="12">
              <div class="description">
                <span class="term">Remarks</span>
                <p class="detail">Gonghu Road, Xihu District, Hangzhou, Zhejiang, China</p>
              </div>
            </div>
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

      .content p {
        margin-bottom: 8px;
      }

      .content .description {
        display: table;
      }

      .description .term {
        display: table-cell;
        margin-right: 8px;
        padding-bottom: 8px;
        white-space: nowrap;
        line-height: 20px;
      }

      .description .term:after {
        position: relative;
        top: -0.5px;
        margin: 0 8px 0 2px;
        content: ':';
      }

      .description .detail {
        display: table-cell;
        padding-bottom: 8px;
        width: 100%;
        line-height: 20px;
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
