/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ZoomBehavior } from 'd3-zoom';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export interface NzZoomTransform {
  x: number;
  y: number;
  k: number;
}

export abstract class NzZoomControl {
  abstract getTransform(): NzZoomTransform;

  /**
   * Base the zoom element center zoom to the specified scale,
   * if in transition, wait for transition to complete and then execute.
   */
  abstract scale(scale: number, duration?: number): Promise<void>;

  /**
   * Zoom to the fit size and centered in the svg container.
   * @param duration Animation duration
   * @param fitScale Not the scale of the element relative to the svg container,
   * the scale is based on the fit and then zoomed to that scale
   */
  abstract fitCenter(duration?: number, fitScale?: number): Promise<void>;

  //          svg container
  //     +---------+---------+
  //     |         |         |
  //     |  +----zoom element----+
  //     |  |  +-child--+    |   |
  //     |  |  |   |    |    |   |
  //     +-----|-center-|----+   |
  //     |  |  |   |    |    |   |
  //     |  |  +--------+    |   |
  //     |  |      |         |   |
  //     +---------+---------+   |
  //        |                    |
  //        +--------------------+
  /**
   * Set a child node to the center of the zoom element and center it in the svg container.
   * @param element The child element, throw a error when the svg container is not contain it.
   * The param type is SVGGElement, but in the Angular template always got HTMLElement, throw a error when
   * the type is not SVGGElement.
   * @param duration Animation duration
   */
  abstract centerByElement(element: SVGGElement, duration?: number): Promise<void>;

  /**
   * Same as method centerByElement, but will be scale the node to the fit-size based on the container
   * @param element
   * @param fitScale
   * @param duration
   */
  abstract fitCenterByElement(element: SVGGElement, fitScale?: number, duration?: number): Promise<void>;
}

export abstract class NzZoomContent {
  abstract readonly zoomElement: SVGGElement;
  /**
   * @private
   */
  abstract _getD3ZoomBehavior(): ZoomBehavior<SVGSVGElement, null>;
}
