/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Optional,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { CascaderOption } from './nz-cascader-definitions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: '[nz-cascader-option]',
  exportAs: 'nzCascaderOption',
  templateUrl: './nz-cascader-li.component.html',
  host: {
    '[attr.title]': 'option.title || getOptionLabel()',
    '[class.ant-cascader-menu-item-active]': 'activated',
    '[class.ant-cascader-menu-item-expand]': '!option.isLeaf',
    '[class.ant-cascader-menu-item-disabled]': 'option.disabled'
  }
})
export class NzCascaderOptionComponent {
  @Input() option: CascaderOption;
  @Input() activated = false;
  @Input() highlightText: string;
  @Input() nzLabelProperty = 'label';

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    elementRef: ElementRef,
    renderer: Renderer2,
    @Optional() private dir: Directionality
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-cascader-menu-item');
  }

  getOptionLabel(): string {
    return this.option ? this.option[this.nzLabelProperty] : '';
  }

  renderHighlightString(str: string): SafeHtml {
    const replaceStr = str.replace(
      new RegExp(this.highlightText, 'g'),
      `<span class="ant-cascader-menu-item-keyword">${this.highlightText}</span>`
    );

    return this.sanitizer.bypassSecurityTrustHtml(replaceStr);
  }
  markForCheck(): void {
    this.cdr.markForCheck();
  }
  getLayoutDirection(): Direction {
    return this.dir.value === 'rtl' ? 'rtl' : 'ltr';
  }
  isRtlLayout(): boolean {
    return this.getLayoutDirection() === 'rtl';
  }
}
