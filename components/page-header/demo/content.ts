import { Component } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/animation';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'nz-demo-page-header-content',
  imports: [
    NzAvatarModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzDropdownModule,
    NzGridModule,
    NzIconModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzTagModule,
    NzTypographyModule,
    NzNoAnimationDirective
  ],
  template: `
    <nz-page-header>
      <!--breadcrumb-->
      <nz-breadcrumb nz-page-header-breadcrumb>
        <nz-breadcrumb-item>First-level Menu</nz-breadcrumb-item>
        <nz-breadcrumb-item>
          <a>Second-level Menu</a>
        </nz-breadcrumb-item>
        <nz-breadcrumb-item>Third-level Menu</nz-breadcrumb-item>
      </nz-breadcrumb>

      <!--avatar-->
      <nz-avatar nz-page-header-avatar nzSrc="https://avatars0.githubusercontent.com/u/22736418?s=88&v=4" />

      <!--title-->
      <nz-page-header-title>Title</nz-page-header-title>

      <!--subtitle-->
      <nz-page-header-subtitle>This is a subtitle</nz-page-header-subtitle>

      <!--tags-->
      <nz-page-header-tags>
        <nz-tag nzColor="blue">Running</nz-tag>
      </nz-page-header-tags>

      <!--extra-->
      <nz-page-header-extra>
        <nz-space>
          <button *nzSpaceItem nz-button>Operation</button>
          <button *nzSpaceItem nz-button>Operation</button>
          <button *nzSpaceItem nz-button nzType="primary">Primary</button>
          <button
            *nzSpaceItem
            nz-button
            nzNoAnimation
            nz-dropdown
            [nzDropdownMenu]="menu"
            nzPlacement="bottomRight"
            style="border: none; padding: 0"
          >
            <nz-icon nzType="more" nzTheme="outline" style="font-size: 20px; vertical-align: top;" />
          </button>
        </nz-space>
        <nz-dropdown-menu #menu="nzDropdownMenu">
          <ul nz-menu>
            <li nz-menu-item>1st menu item length</li>
            <li nz-menu-item>2nd menu item length</li>
            <li nz-menu-item>3rd menu item length</li>
          </ul>
        </nz-dropdown-menu>
      </nz-page-header-extra>

      <!--content-->
      <nz-page-header-content>
        <div nz-row>
          <div class="content">
            <p nz-paragraph>
              Ant Design interprets the color system into two levels: a system-level color system and a product-level
              color system.
            </p>
            <p nz-paragraph>
              Ant Design's design team preferred to design with the HSB color model, which makes it easier for designers
              to have a clear psychological expectation of color when adjusting colors, as well as facilitate
              communication in teams.
            </p>
            <div class="content-link">
              <a>
                <img src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" alt="start" />
                Quick Start
              </a>
              <a>
                <img src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" alt="info" />
                Product Info
              </a>
              <a>
                <img src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" alt="doc" />
                Product Doc
              </a>
            </div>
          </div>
          <div class="content-image">
            <img src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg" alt="content" />
          </div>
        </div>
      </nz-page-header-content>
    </nz-page-header>
  `,
  styles: `
    .content {
      flex: 1;
    }

    .content p {
      margin-bottom: 1em;
    }

    .content-link a {
      margin-right: 16px;
    }

    .content-link a img {
      margin-right: 8px;
    }

    .content-image {
      margin: 0 0 0 60px;
      display: flex;
      align-items: center;
    }

    .content-image img {
      width: 100%;
    }

    @media (max-width: 768px) {
      .content-image {
        flex: 100%;
        margin: 24px 0 0;
      }
    }
  `
})
export class NzDemoPageHeaderContentComponent {}
