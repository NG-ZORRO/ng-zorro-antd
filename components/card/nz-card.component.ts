/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { InputBoolean, NzConfigService, NzSizeDSType, WithConfig } from 'ng-zorro-antd/core';
import { NzCardGridDirective } from './nz-card-grid.directive';
import { NzCardTabComponent } from './nz-card-tab.component';

const NZ_CONFIG_COMPONENT_NAME = 'card';

@Component({
  selector: 'nz-card',
  exportAs: 'nzCard',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './nz-card.component.html',
  styles: [
    `
      nz-card {
        display: block;
      }
    `
  ],
  host: {
    '[class.ant-card-loading]': 'nzLoading',
    '[class.ant-card-bordered]': 'nzBordered',
    '[class.ant-card-hoverable]': 'nzHoverable',
    '[class.ant-card-small]': 'nzSize === "small"',
    '[class.ant-card-contain-grid]': 'grids && grids.length',
    '[class.ant-card-type-inner]': 'nzType === "inner"',
    '[class.ant-card-contain-tabs]': '!!tab'
  }
})
export class NzCardComponent {
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, true) @InputBoolean() nzBordered: boolean;
  @Input() @InputBoolean() nzLoading = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzHoverable: boolean;
  @Input() nzBodyStyle: { [key: string]: string };
  @Input() nzCover: TemplateRef<void>;
  @Input() nzActions: Array<TemplateRef<void>> = [];
  @Input() nzType: string;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'default') nzSize: NzSizeDSType;
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzExtra: string | TemplateRef<void>;
  @ContentChild(NzCardTabComponent, { static: false }) tab: NzCardTabComponent;
  @ContentChildren(NzCardGridDirective) grids: QueryList<NzCardGridDirective>;

  constructor(public nzConfigService: NzConfigService, renderer: Renderer2, elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-card');
  }
}
