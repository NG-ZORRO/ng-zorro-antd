/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'svg:defs[nz-graph-defs]',
  template: `
    <svg:marker
      class="nz-graph-edge-marker"
      id="edge-end-arrow"
      viewBox="1 0 20 20"
      refX="8"
      refY="3.5"
      markerWidth="10"
      markerHeight="10"
      orient="auto"
    >
      <svg:polygon points="0 0, 10 3.5, 0 7"></svg:polygon>
    </svg:marker>
  `
})
export class NzGraphDefsComponent {}
