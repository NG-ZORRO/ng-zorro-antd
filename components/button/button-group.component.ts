/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';

export type NzButtonGroupSize = 'large' | 'default' | 'small';

@Component({
  selector: 'nz-button-group',
  exportAs: 'nzButtonGroup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.ant-btn-group-lg]': `nzSize === 'large'`,
    '[class.ant-btn-group-sm]': `nzSize === 'small'`
  },
  preserveWhitespaces: false,
  template: `
    <ng-content></ng-content>
  `
})
export class NzButtonGroupComponent {
  @Input() nzSize: NzButtonGroupSize = 'default';

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-btn-group');
  }
}
