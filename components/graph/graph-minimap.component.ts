/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ElementRef, OnInit } from '@angular/core';
import { ZoomBehavior, ZoomTransform } from 'd3-zoom';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Minimap } from './core/minimap';
import { NZ_GRAPH_LAYOUT_SETTING } from './interface';

@Component({
  selector: 'nz-graph-minimap',
  template: `
    <svg>
      <defs>
        <filter id="minimapDropShadow" x="-20%" y="-20%" width="150%" height="150%">
          <feOffset result="offOut" in="SourceGraphic" dx="1" dy="1"></feOffset>
          <feColorMatrix
            result="matrixOut"
            in="offOut"
            type="matrix"
            values="0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.5 0"
          ></feColorMatrix>
          <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>
        </filter>
      </defs>
      <rect></rect>
    </svg>
    <canvas class="viewport"></canvas>
    <!-- Additional canvas to use as buffer to avoid flickering between updates -->
    <canvas class="buffer"></canvas>
  `
})
export class NzGraphMinimapComponent implements OnInit {
  minimap?: Minimap;
  constructor(private elementRef: ElementRef<HTMLElement>) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('nz-graph-minimap');
  }

  ngOnInit(): void {}

  init(svgEle: SVGSVGElement, zoomEle: SVGGElement, zoomBehavior: ZoomBehavior<NzSafeAny, NzSafeAny>): void {
    this.minimap = new Minimap(
      svgEle,
      zoomEle,
      zoomBehavior,
      this.elementRef.nativeElement,
      NZ_GRAPH_LAYOUT_SETTING.minimap.size,
      NZ_GRAPH_LAYOUT_SETTING.subscene.meta.labelHeight
    );
  }

  zoom(transform: ZoomTransform): void {
    if (this.minimap) {
      this.minimap.zoom(transform);
    }
  }

  update(): void {
    if (this.minimap) {
      this.minimap.update();
    }
  }
}
