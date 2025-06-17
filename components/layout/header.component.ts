/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ElementRef, inject, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-header',
  exportAs: 'nzHeader',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzHeaderComponent {
  constructor() {
    inject(Renderer2).addClass(inject(ElementRef<HTMLElement>).nativeElement, 'ant-layout-header');
  }
}
