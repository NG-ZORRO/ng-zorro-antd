/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgStyleInterface } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'nz-tree-drop-indicator',
  exportAs: 'NzTreeDropIndicator',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.ant-tree-drop-indicator]': 'true',
    '[style]': 'style'
  }
})
export class NzTreeDropIndicatorComponent implements OnChanges {
  @Input() dropPosition?: number;
  @Input() level: number = 1;
  @Input() direction: string = 'ltr';
  style: NgStyleInterface = {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(_changes: SimpleChanges): void {
    this.renderIndicator(this.dropPosition!, this.direction);
  }

  renderIndicator(dropPosition: number, direction: string = 'ltr'): void {
    const offset = 4;
    const startPosition = direction === 'ltr' ? 'left' : 'right';
    const endPosition = direction === 'ltr' ? 'right' : 'left';
    const style: NgStyleInterface = {
      [startPosition]: `${offset}px`,
      [endPosition]: '0px'
    };
    switch (dropPosition) {
      case -1:
        style.top = `${-3}px`;
        break;
      case 1:
        style.bottom = `${-3}px`;
        break;
      case 0:
        // dropPosition === 0
        style.bottom = `${-3}px`;
        style[startPosition] = `${offset + 24}px`;
        break;
      default:
        style.display = 'none';
        break;
    }
    this.style = style;
    this.cdr.markForCheck();
  }
}
