/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

import { NzBreadCrumbComponent } from './nz-breadcrumb.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-breadcrumb-item',
  exportAs: 'nzBreadcrumbItem',
  preserveWhitespaces: false,
  templateUrl: './nz-breadcrumb-item.component.html',
  styles: [
    `
      nz-breadcrumb-item:last-child {
        color: rgba(0, 0, 0, 0.65);
      }

      nz-breadcrumb-item:last-child .ant-breadcrumb-separator {
        display: none;
      }
    `
  ]
})
export class NzBreadCrumbItemComponent {
  /**
   * Dropdown content of a breadcrumb item.
   */
  @Input() nzOverlay?: NzDropdownMenuComponent;

  constructor(public nzBreadCrumbComponent: NzBreadCrumbComponent) {}
}
