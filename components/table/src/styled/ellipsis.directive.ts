/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input, Renderer2, afterNextRender, booleanAttribute, inject } from '@angular/core';

import { NzCellFixedDirective } from '../cell/cell-fixed.directive';

@Directive({
  selector: 'th[nzEllipsis],td[nzEllipsis]',
  host: {
    '[class.ant-table-cell-ellipsis]': 'nzEllipsis'
  }
})
export class NzCellEllipsisDirective {
  @Input({ transform: booleanAttribute }) nzEllipsis = true;

  constructor() {
    if (!inject(NzCellFixedDirective, { optional: true, self: true })) {
      return;
    }

    const element = inject(ElementRef<HTMLElement>).nativeElement;
    const renderer = inject(Renderer2);

    afterNextRender({
      write: () => {
        const content = renderer.createElement('span');
        renderer.addClass(content, 'ant-table-cell-content');

        while (element.firstChild) {
          renderer.appendChild(content, element.firstChild);
        }

        renderer.appendChild(element, content);
      }
    });
  }
}
