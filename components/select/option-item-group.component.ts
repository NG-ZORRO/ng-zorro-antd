/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ElementRef, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'nz-option-item-group',
  template: ` <ng-container *nzStringTemplateOutlet="nzLabel">{{ nzLabel }}</ng-container> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzOptionItemGroupComponent {
  @Input() nzLabel: string | number | TemplateRef<NzSafeAny> | null = null;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-select-item', 'ant-select-item-group');
  }
}
