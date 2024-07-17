/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Color } from '../interfaces/color';
import { HsbaColorType } from '../interfaces/type';
import { generateColor } from '../util/util';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'color-gradient',
  standalone: true,
  template: `
    <div
      class="ant-color-picker-gradient"
      style="position: absolute; inset: 0"
      [style.background]="'linear-gradient(' + direction + ', ' + gradientColors + ')'"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class GradientComponent implements OnInit, OnChanges {
  @Input() colors: Color[] | string[] = [];
  @Input() direction: string = 'to right';
  @Input() type: HsbaColorType = 'hue';

  gradientColors: string = '';

  constructor() {}

  ngOnInit(): void {
    this.useMemo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { colors, type } = changes;
    if (colors || type) {
      this.useMemo();
    }
  }

  useMemo(): void {
    this.gradientColors = this.colors
      .map((color, idx) => {
        const result = generateColor(color);
        if (this.type === 'alpha' && idx === this.colors.length - 1) {
          result.setAlpha(1);
        }
        return result.toRgbString();
      })
      .join(',');
  }
}
