import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-page-header-content',
  template: `
    <nz-page-header nzTitle="Page Title">
      <nz-breadcrumb nz-page-header-breadcrumb>
        <nz-breadcrumb-item>First-level</nz-breadcrumb-item>
        <nz-breadcrumb-item>
          <a>Second-level</a>
        </nz-breadcrumb-item>
        <nz-breadcrumb-item>Third-level</nz-breadcrumb-item>
      </nz-breadcrumb>
      <nz-page-header-content>
        <div class="wrap">
          <div class="content">
            <div class="content">
              <p>Ant Design, a design language for background applications, is refined by Ant UED Team.</p>
              <p>We supply a series of design principles, practical patterns and high quality design resources
                (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
              <p class="content-link">
                <a>
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" alt="start">Set Up
                </a>
                <a>
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" alt="info">Information
                </a>
                <a>
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" alt="doc">Document
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
