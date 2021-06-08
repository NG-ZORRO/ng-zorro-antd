/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef } from '@angular/core';
import { select, Selection } from 'd3-selection';

import { NzSVGContainer } from './core/svg-container';

@Directive({
  selector: 'svg[nz-svg-container]',
  providers: [
    {
      provide: NzSVGContainer,
      useExisting: NzSvgContainerDirective
    }
  ]
})
export class NzSvgContainerDirective implements NzSVGContainer {
  readonly selection: Selection<SVGSVGElement, null, null, undefined>;
  readonly svgElement: SVGSVGElement;

  constructor(private elementRef: ElementRef<SVGSVGElement>) {
    this.svgElement = this.elementRef.nativeElement;
    this.selection = select(this.elementRef.nativeElement);
  }
}
