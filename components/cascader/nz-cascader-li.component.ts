/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzCascaderOption } from './nz-cascader-definitions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: '[nz-cascader-option]',
  exportAs: 'nzCascaderOption',
  templateUrl: './nz-cascader-li.component.html',
  host: {
    '[attr.title]': 'option.title || optionLabel',
    '[class.ant-cascader-menu-item-active]': 'activated',
    '[class.ant-cascader-menu-item-expand]': '!option.isLeaf',
    '[class.ant-cascader-menu-item-disabled]': 'option.disabled'
  }
})
export class NzCascaderOptionComponent {
  @Input() optionTemplate: TemplateRef<NzCascaderOption> | null = null;
  @Input() option: NzCascaderOption;
  @Input() activated = false;
  @Input() highlightText: string;
  @Input() nzLabelProperty = 'label';
  @Input() columnIndex: number;

  constructor(private cdr: ChangeDetectorRef, elementRef: ElementRef, renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'ant-cascader-menu-item');
  }

  get optionLabel(): string {
    return this.option[this.nzLabelProperty];
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }
}
