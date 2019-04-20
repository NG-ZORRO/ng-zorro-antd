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
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzListItemMetaComponent } from './nz-list-item-meta.component';

@Component({
  selector: 'nz-list-item',
  exportAs: 'nzListItem',
  templateUrl: './nz-list-item.component.html',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzListItemComponent {
  @ContentChildren(NzListItemMetaComponent) metas!: QueryList<NzListItemMetaComponent>;
  @Input() nzActions: Array<TemplateRef<void>> = [];
  @Input() nzContent: string | TemplateRef<void>;
  @Input() nzExtra: TemplateRef<void>;

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-list-item');
  }
}
