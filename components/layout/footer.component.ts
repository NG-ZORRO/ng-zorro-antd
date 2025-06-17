/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ElementRef, inject, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-footer',
  exportAs: 'nzFooter',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzFooterComponent {
  constructor() {
    inject(Renderer2).addClass(inject(ElementRef<HTMLElement>).nativeElement, 'ant-layout-footer');
  }
}
