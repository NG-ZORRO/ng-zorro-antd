/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Selection } from 'd3-selection';

export abstract class NzSVGContainer {
  abstract readonly selection: Selection<SVGSVGElement, null, null, undefined>;
  abstract readonly svgElement: SVGSVGElement;
}
