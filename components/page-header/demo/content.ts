import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-page-header-content',
  template: `
    <nz-page-header>
      <nz-page-header-title>Page Title</nz-page-header-title>
      <nz-breadcrumb nz-page-header-breadcrumb>
        <nz-breadcrumb-item>
          Home
        </nz-breadcrumb-item>
        <nz-breadcrumb-item>
          <a>Application List</a>
        </nz-breadcrumb-item>
        <nz-breadcrumb-item>
          An Application
        </nz-breadcrumb-item>
      </nz-breadcrumb>
      <nz-page-header-content>
        <div class="wrap">
          <div class="content">
            <div class="content">
              <p>Ant Design 将色彩体系解读成两个层面：系统级色彩体系和产品级色彩体系。</p>
              <p>Ant Design 的设计团队倾向于采用 HSB 色彩模型进行设计，该模型更便于设计师在调整色彩时对于颜色有明确的心理预期，同时也方便团队间的沟通。</p>
              <p>Ant Design 的基础色板共计 120 个颜色，包含 12 个主色以及衍生色。这些颜色基本可以满足中后台设计中对于颜色的需求</p>
              <p class="content-link">
                <a>
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" alt="start">快速开始
                </a>
                <a>
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" alt="info">产品简介
                </a>
                <a>
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" alt="doc">产品文档
                </a>
              </p>
            </div>
          </div>
          <div class="extra-content">
            <img src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original" alt="content">
          </div>
        </div>
      </nz-page-header-content>
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

      .content p {
        margin-bottom: 8px;
      }

      .content-link {
        padding-top: 16px;
      }

      .content-link a {
        display: inline-block;
        vertical-align: text-top;
        margin-right: 32px;
      }

      .content-link a img {
        margin-right: 8px;
      }

      .extra-content {
        min-width: 240px;
        text-align: right;
      }
    `
  ]
})
export class NzDemoPageHeaderContentComponent {
}
