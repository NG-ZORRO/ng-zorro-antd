/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzBreadcrumb } from './breadcrumb';
import { NzBreadCrumbSeparatorComponent } from './breadcrumb-separator.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-breadcrumb-item',
  exportAs: 'nzBreadcrumbItem',
  preserveWhitespaces: false,
  standalone: true,
  imports: [NgIf, NgTemplateOutlet, NzBreadCrumbSeparatorComponent, NzDropDownModule, NzIconModule, NzOutletModule],
  template: `
    <ng-container *ngIf="!!nzOverlay; else noMenuTpl">
      <span class="ant-breadcrumb-overlay-link" nz-dropdown [nzDropdownMenu]="nzOverlay">
        <ng-template [ngTemplateOutlet]="noMenuTpl"></ng-template>
        <span nz-icon nzType="down"></span>
      </span>
    </ng-container>

    <ng-template #noMenuTpl>
      <span class="ant-breadcrumb-link">
        <ng-content></ng-content>
      </span>
    </ng-template>

    <nz-breadcrumb-separator *ngIf="nzBreadCrumbComponent.nzSeparator">
      <ng-container *nzStringTemplateOutlet="nzBreadCrumbComponent.nzSeparator">
        {{ nzBreadCrumbComponent.nzSeparator }}
      </ng-container>
    </nz-breadcrumb-separator>
  `
})
export class NzBreadCrumbItemComponent {
  /**
   * Dropdown content of a breadcrumb item.
   */
  @Input() nzOverlay?: NzDropdownMenuComponent;

  constructor(public nzBreadCrumbComponent: NzBreadcrumb) {}
}
