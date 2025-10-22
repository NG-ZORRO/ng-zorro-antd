/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { NzCursorType, NzResizeDirection, NzResizeHandleComponent } from './resize-handle.component';

export const DEFAULT_RESIZE_DIRECTION: NzResizeDirection[] = [
  'bottomRight',
  'topRight',
  'bottomLeft',
  'topLeft',
  'bottom',
  'right',
  'top',
  'left'
];

export interface NzResizeHandleOption {
  direction: NzResizeDirection;
  cursorType: NzCursorType;
}

function normalizeResizeHandleOptions(value: Array<NzResizeDirection | NzResizeHandleOption>): NzResizeHandleOption[] {
  return value.map(val => {
    if (typeof val === 'string') {
      return {
        direction: val,
        cursorType: 'window'
      };
    }

    return val;
  });
}

@Component({
  selector: 'nz-resize-handles',
  exportAs: 'nzResizeHandles',
  template: `
    @for (option of resizeHandleOptions; track option) {
      <nz-resize-handle [nzDirection]="option.direction" [nzCursorType]="option.cursorType" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzResizeHandleComponent]
})
export class NzResizeHandlesComponent implements OnChanges {
  @Input() nzDirections: Array<NzResizeDirection | NzResizeHandleOption> = DEFAULT_RESIZE_DIRECTION;

  resizeHandleOptions = normalizeResizeHandleOptions(this.nzDirections);

  ngOnChanges(changes: SimpleChanges): void {
    const { nzDirections } = changes;
    if (nzDirections) {
      this.resizeHandleOptions = normalizeResizeHandleOptions(nzDirections.currentValue);
    }
  }
}
