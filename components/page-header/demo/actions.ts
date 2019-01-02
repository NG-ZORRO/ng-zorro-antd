import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-page-header-actions',
  template: `
    <nz-page-header nzBackIcon>
      <nz-page-header-title>Page Title</nz-page-header-title>
      <nz-page-header-subtitle>The Page Subtitle</nz-page-header-subtitle>
      <nz-page-header-tags>
        <nz-tag [nzColor]="'red'">警告</nz-tag>
      </nz-page-header-tags>
      <nz-page-header-extra>
        <button nz-button>次操作</button>
        <button nz-button>次操作</button>
        <button nz-button nzType="primary">主操作</button>
      </nz-page-header-extra>
      <nz-page-header-content>
        <div class="wrap">
          <div nz-row class="content padding">
            <div nz-col nzSpan="12">
              <div class="description">
                <span class="term">创建</span>
                <p class="detail">曲丽丽</p>
              </div>
            </div>
            <div nz-col nzSpan="12">
              <div class="description">
                <span class="term">关联单据</span>
                <a>421421</a>
              </div>
            </div>
            <div nz-col nzSpan="12">
              <div class="description">
                <span class="term">创建时间</span>
                <p class="detail">2017-01-10</p>
              </div>
            </div>
            <div nz-col nzSpan="12">
              <div class="description">
                <span class="term">生效日期</span>
                <p class="detail">2017-01-10</p>
              </div>
            </div>
            <div nz-col nzSpan="12">
              <div class="description">
                <span class="term">单据备注</span>
                <p class="detail">浙江省杭州市西湖区工专路</p>
              </div>
            </div>
          </div>
          <div nz-row class="extra-content">
            <div nz-col nzSpan="12">
              <span class="label">状态</span>
              <p class="detail">待审批</p>
            </div>
            <div nz-col nzSpan="12">
              <span class="label"> 订单价格</span>
              <p class="detail">¥ 568.08</p>
            </div>
          </div>
        </div>
      </nz-page-header-content>
      <nz-page-header-footer>
        <nz-tabset [nzSelectedIndex]="1">
          <nz-tab nzTitle="详情"></nz-tab>
          <nz-tab nzTitle="规则"></nz-tab>
        </nz-tabset>
      </nz-page-header-footer>
    </nz-page-header>
  `,
  styles  : [
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
        content: ":";
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
export class NzDemoPageHeaderActionsComponent {
}
