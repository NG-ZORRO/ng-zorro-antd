/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ElementRef, Renderer2 } from '@angular/core';

import { NzSpaceDirection } from './types';

/**
 * @deprecated NzSpaceItemLegacyComponent will be removed on 12.0.0.
 * @breaking-change 12.0.0
 */
@Component({
  selector: 'nz-space-item, [nz-space-item]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-content></ng-content> `,
  host: {
    class: 'ant-space-item'
  }
})
export class NzSpaceItemLegacyComponent {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  setDirectionAndSize(direction: NzSpaceDirection, size: number): void {
    if (direction === 'horizontal') {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'margin-bottom');
      this.renderer.setStyle(this.elementRef.nativeElement, 'margin-right', `${size}px`);
    } else {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'margin-right');
      this.renderer.setStyle(this.elementRef.nativeElement, 'margin-bottom', `${size}px`);
    }
  }
}
