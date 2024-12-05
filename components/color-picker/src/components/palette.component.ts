/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'color-palette',
  template: `
    <div class="ant-color-picker-palette">
      <ng-content></ng-content>
    </div>
  `
})
export class PaletteComponent {}
