import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'nz-demo-space-compact-buttons',
  imports: [NzSpaceModule, NzButtonModule, NzIconModule, NzDropDownModule, NzToolTipModule],
  template: `
    <nz-space-compact nzBlock>
      <button nz-button nz-tooltip nzTooltipTitle="Like">
        <span nz-icon nzType="like"></span>
      </button>
      <button nz-button nz-tooltip nzTooltipTitle="Comment">
        <span nz-icon nzType="comment"></span>
      </button>
      <button nz-button nz-tooltip nzTooltipTitle="Star">
        <span nz-icon nzType="star"></span>
      </button>
      <button nz-button nz-tooltip nzTooltipTitle="Heart">
        <span nz-icon nzType="heart"></span>
      </button>
      <button nz-button nz-tooltip nzTooltipTitle="Share">
        <span nz-icon nzType="share-alt"></span>
      </button>
      <button nz-button nz-tooltip nzTooltipTitle="Download">
        <span nz-icon nzType="download"></span>
      </button>
      <nz-dropdown-menu #menu>
        <ul nz-menu>
          <li nz-menu-item>
            <a>1st item</a>
          </li>
          <li nz-menu-item>
            <a>2nd item</a>
          </li>
          <li nz-menu-item>
            <a>3rd item</a>
          </li>
        </ul>
      </nz-dropdown-menu>
      <button nz-button nz-dropdown [nzDropdownMenu]="menu">
        <span nz-icon nzType="ellipsis"></span>
      </button>
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <button nz-button nzType="primary">Button 1</button>
      <button nz-button nzType="primary">Button 2</button>
      <button nz-button nzType="primary">Button 3</button>
      <button nz-button nzType="primary">Button 4</button>
      <button nz-button nzType="primary" disabled nz-tooltip nzTooltipTitle="Tooltip">
        <span nz-icon nzType="download"></span>
      </button>
      <button nz-button nzType="primary" nz-tooltip nzTooltipTitle="Tooltip">
        <span nz-icon nzType="download"></span>
      </button>
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <button nz-button>Button 1</button>
      <button nz-button>Button 2</button>
      <button nz-button>Button 3</button>
      <button nz-button disabled nz-tooltip nzTooltipTitle="Tooltip">
        <span nz-icon nzType="download"></span>
      </button>
      <button nz-button nz-tooltip nzTooltipTitle="Tooltip">
        <span nz-icon nzType="download"></span>
      </button>
      <button nz-button nzType="primary">Button 4</button>
      <nz-dropdown-menu #menu>
        <ul nz-menu>
          <li nz-menu-item>
            <a>1st item</a>
          </li>
          <li nz-menu-item>
            <a>2nd item</a>
          </li>
          <li nz-menu-item>
            <a>3rd item</a>
          </li>
        </ul>
      </nz-dropdown-menu>
      <button nz-button nzType="primary" nz-dropdown [nzDropdownMenu]="menu">
        <span nz-icon nzType="ellipsis"></span>
      </button>
    </nz-space-compact>
  `
})
export class NzDemoSpaceCompactButtonsComponent {}
