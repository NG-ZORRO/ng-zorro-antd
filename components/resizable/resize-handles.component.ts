/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { NzResizeDirection } from './resize-handle.component';

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

@Component({
  selector: 'nz-resize-handles',
  exportAs: 'nzResizeHandles',
  template: ` <nz-resize-handle *ngFor="let dir of directions" [nzDirection]="dir"></nz-resize-handle> `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzResizeHandlesComponent implements OnChanges {
  @Input() nzDirections: NzResizeDirection[] = DEFAULT_RESIZE_DIRECTION;
  directions: Set<NzResizeDirection>;

  constructor() {
    this.directions = new Set(this.nzDirections);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzDirections) {
      this.directions = new Set(changes.nzDirections.currentValue);
    }
  }
}
