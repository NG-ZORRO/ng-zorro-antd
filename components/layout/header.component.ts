/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-header',
  exportAs: 'nzHeader',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class NzHeaderComponent {
  constructor(
    public elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-layout-header');
  }
}
