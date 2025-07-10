import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'nz-demo-space-compact-buttons',
  imports: [NzSpaceModule, NzButtonModule, NzIconModule, NzDropDownModule, NzTooltipModule],
  template: `
    <nz-space-compact nzBlock>
      <button nz-button nz-tooltip nzTooltipTitle="Like">
        <nz-icon nzType="like" />
      </button>
      <button nz-button nz-tooltip nzTooltipTitle="Comment">
        <nz-icon nzType="comment" />
      </button>
      <button nz-button nz-tooltip nzTooltipTitle="Star">
        <nz-icon nzType="star" />
      </button>
      <button nz-button nz-tooltip nzTooltipTitle="Heart">
        <nz-icon nzType="heart" />
      </button>
      <button nz-button nz-tooltip nzTooltipTitle="Share">
        <nz-icon nzType="share-alt" />
      </button>
      <button nz-button nz-tooltip nzTooltipTitle="Download">
        <nz-icon nzType="download" />
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
        <nz-icon nzType="ellipsis" />
      </button>
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <button nz-button nzType="primary">Button 1</button>
      <button nz-button nzType="primary">Button 2</button>
      <button nz-button nzType="primary">Button 3</button>
      <button nz-button nzType="primary">Button 4</button>
      <button nz-button nzType="primary" disabled nz-tooltip nzTooltipTitle="Tooltip">
        <nz-icon nzType="download" />
      </button>
      <button nz-button nzType="primary" nz-tooltip nzTooltipTitle="Tooltip">
        <nz-icon nzType="download" />
      </button>
    </nz-space-compact>
    <br />
    <nz-space-compact nzBlock>
      <button nz-button>Button 1</button>
      <button nz-button>Button 2</button>
      <button nz-button>Button 3</button>
      <button nz-button disabled nz-tooltip nzTooltipTitle="Tooltip">
        <nz-icon nzType="download" />
      </button>
      <button nz-button nz-tooltip nzTooltipTitle="Tooltip">
        <nz-icon nzType="download" />
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
        <nz-icon nzType="ellipsis" />
      </button>
    </nz-space-compact>
  `
})
export class NzDemoSpaceCompactButtonsComponent {}
