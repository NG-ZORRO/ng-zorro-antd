/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { warnDeprecation } from 'ng-zorro-antd/core';

@Component({
  selector: 'nz-form-extra',
  exportAs: 'nzFormExtra',
  templateUrl: './nz-form-extra.component.html',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      nz-form-extra {
        display: block;
      }
    `
  ]
})
/**
 * @deprecated Use `[nzExtra]` in `NzFormControlComponent` instead, will remove in 9.0.0.
 */
export class NzFormExtraComponent {
  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-form-extra');
    warnDeprecation(
      `'nz-form-extra' is going to be removed in 9.0.0. Use [nzExtra] in nz-form-control instead. Read https://ng.ant.design/components/form/en`
    );
  }
}
