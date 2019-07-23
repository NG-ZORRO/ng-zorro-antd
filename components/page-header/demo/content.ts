import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-page-header-content',
  template: `
    <nz-page-header nzTitle="Page Title">
      <nz-breadcrumb nz-page-header-breadcrumb>
        <nz-breadcrumb-item>First-level Menu</nz-breadcrumb-item>
        <nz-breadcrumb-item>
          <a>Second-level Menu</a>
        </nz-breadcrumb-item>
        <nz-breadcrumb-item>Third-level Menu</nz-breadcrumb-item>
      </nz-breadcrumb>
      <nz-page-header-content>
        <div class="wrap">
          <div class="content">
            <div class="content">
              <p>
                Ant Design interprets the color system into two levels: a system-level color system and a product-level
                color system.
              </p>
              <p>
                Ant Design's design team preferred to design with the HSB color model, which makes it easier for
                designers to have a clear psychological expectation of color when adjusting colors, as well as
                facilitate communication in teams.
              </p>
              <p class="content-link">
                <a>
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" alt="start" />Quick
                  Start
                </a>
                <a>
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" alt="info" />Product
                  Info
                </a>
                <a>
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" alt="doc" />Product Doc
                </a>
              </p>
            </div>
          </div>
          <div class="extra-content">
            <img
              src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
              alt="content"
            />
          </div>
        </div>
      </nz-page-header-content>
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
      [dir='rtl'] .content-link a img {
        margin-right: 8px;
      }

      .extra-content {
        min-width: 240px;
        text-align: right;
      }
    `
  ]
})
export class NzDemoPageHeaderContentComponent {}
