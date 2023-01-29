/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

import { NzBreadcrumb } from './breadcrumb';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-breadcrumb-item',
  exportAs: 'nzBreadcrumbItem',
  preserveWhitespaces: false,
  template: `
    <ng-container *ngIf="!!nzOverlay; else noMenuTpl">
      <span class="ant-breadcrumb-overlay-link" nz-dropdown [nzDropdownMenu]="nzOverlay">
        <ng-template [ngTemplateOutlet]="noMenuTpl"></ng-template>
        <span *ngIf="!!nzOverlay" nz-icon nzType="down"></span>
      </span>
    </ng-container>

    <ng-template #noMenuTpl>
      <span class="ant-breadcrumb-link">
        <ng-content></ng-content>
      </span>
    </ng-template>

    <span class="ant-breadcrumb-separator" *ngIf="nzBreadCrumbComponent.nzSeparator">
      <ng-container *nzStringTemplateOutlet="nzBreadCrumbComponent.nzSeparator">
        {{ nzBreadCrumbComponent.nzSeparator }}
      </ng-container>
    </span>
  `
})
export class NzBreadCrumbItemComponent {
  /**
   * Dropdown content of a breadcrumb item.
   */
  @Input() nzOverlay?: NzDropdownMenuComponent;

  constructor(public nzBreadCrumbComponent: NzBreadcrumb) {}
}
