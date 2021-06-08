/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

import { select, Selection } from 'd3-selection';
import { transition as d3Transition } from 'd3-transition';
import { D3ZoomEvent, zoom, ZoomBehavior, zoomIdentity, ZoomTransform, zoomTransform } from 'd3-zoom';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzSVGContainer } from './core/svg-container';

import { NzZoomContent, NzZoomControl, NzZoomTransform } from './core/zoom';
import { RelativePositionInfo } from './interface';

// https://stackoverflow.com/questions/43653228/property-transition-does-not-exist-on-type-selectionbasetype-null-unde
select.prototype.transition = d3Transition;

@Directive({
  selector: 'g[nz-zoom], svg:g[nzZoom]',
  exportAs: 'NzSvgGZoom',
  providers: [
    {
      provide: NzZoomControl,
      useExisting: NzSvgGZoomDirective
    }
  ]
})
export class NzSvgGZoomDirective implements NzZoomControl, OnChanges, OnInit, NzZoomContent, OnDestroy {
  readonly zoomElement: SVGGElement;
  @Input() nzZoomMinScale: number = Number.MIN_SAFE_INTEGER;
  @Input() nzZoomMaxScale: number = Number.MAX_SAFE_INTEGER;
  @Output() readonly nzBeforeZoomEvents = new EventEmitter<WheelEvent | MouseEvent>();
  @Output() readonly nzTransformChanged = new EventEmitter<NzZoomTransform>();

  private selection: Selection<SVGGElement, null, null, undefined>;
  private zoomBehavior: ZoomBehavior<SVGSVGElement, null> = zoom();
  private transform$ = new Subject<ZoomTransform>();
  private destroy$ = new Subject<void>();

  constructor(private elementRef: ElementRef<SVGGElement>, private svgContainer: NzSVGContainer) {
    this.zoomElement = elementRef.nativeElement;
    this.selection = select(this.elementRef.nativeElement);
    this.transform$.pipe(takeUntil(this.destroy$)).subscribe(transform => {
      const { x, y, k } = transform;
      this.selection.attr('transform', transform.toString());
      this.nzTransformChanged.emit({ x, y, k });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzZoomMinScale, nzZoomMaxScale } = changes;
    if (nzZoomMaxScale || nzZoomMinScale) {
      this.registerZoom();
    }
  }

  ngOnInit(): void {
    this.registerZoom();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * @private
   */
  _getD3ZoomBehavior(): ZoomBehavior<SVGSVGElement, null> {
    return this.zoomBehavior;
  }

  getTransform(): NzZoomTransform {
    const { x, y, k } = zoomTransform(this.zoomElement);
    return { x, y, k };
  }

  scale(scale: number, duration: number = 0): Promise<void> {
    return this.svgContainer.selection
      .transition()
      .duration(duration)
      .call(this.zoomBehavior.scaleTo, Math.min(this.nzZoomMaxScale, Math.max(this.nzZoomMinScale, scale)))
      .on('end.fitted', () => {
        this.zoomBehavior.on('end.fitted', null);
      })
      .end();
  }

  fitCenter(duration: number = 0, fitScale: number = 1): Promise<void> {
    const viewBoxSize = this.getViewBoxSize();
    const zoomBoxSize = this.elementRef.nativeElement.getBBox();
    const scale = this.getScaleToContainer(this.elementRef.nativeElement) * fitScale;

    const dx = (viewBoxSize.width - zoomBoxSize.width * scale) / 2;
    const dy = (viewBoxSize.height - zoomBoxSize.height * scale) / 2;
    const transform = zoomIdentity.translate(dx, dy).scale(scale);

    return this.svgContainer.selection
      .transition()
      .duration(duration)
      .call(this.zoomBehavior.transform, transform)
      .on('end.fitted', () => {
        this.zoomBehavior.on('end.fitted', null);
      })
      .end();
  }

  centerByElement(element: SVGGElement, duration: number = 0): Promise<void> {
    const gElement = this.asChildGElement(element);

    const { x, y } = this.getCenterPointByElement(gElement);

    return this.svgContainer.selection
      .transition()
      .duration(duration)
      .call(this.zoomBehavior.translateBy, x, y)
      .on('end.fitted', () => {
        this.zoomBehavior.on('end.fitted', null);
      })
      .end();
  }

  fitCenterByElement(element: SVGGElement, fitScale: number = 1, duration: number = 0): Promise<void> {
    const gElement = this.asChildGElement(element);

    const { x: x0, y: y0, k: k0 } = this.getTransform();
    const oldTransform = zoomIdentity.translate(x0, y0).scale(k0);

    const scale = (this.getScaleToContainer(element) * fitScale) / oldTransform.k;
    this.svgContainer.selection.call(this.zoomBehavior.scaleBy, scale);

    const { x: dx, y: dy } = this.getCenterPointByElement(gElement);
    this.svgContainer.selection.call(this.zoomBehavior.translateBy, dx, dy);

    const { x: x1, y: y1, k: k1 } = this.getTransform();
    const transform = zoomIdentity.translate(x1, y1).scale(k1);

    if (duration <= 0) {
      return Promise.resolve();
    }
    return this.svgContainer.selection
      .call(this.zoomBehavior.transform, oldTransform)
      .transition()
      .duration(duration)
      .call(this.zoomBehavior.transform, transform)
      .on('end.fitted', () => {
        this.zoomBehavior.on('end.fitted', null);
      })
      .end();
  }

  private getScaleToContainer(element: SVGGElement): number {
    const viewBoxSize = this.getViewBoxSize();
    const elementSize = element.getBBox();
    return Math.min(viewBoxSize.width / elementSize.width, viewBoxSize.height / elementSize.height);
  }

  private asChildGElement(element: Element): SVGGElement {
    if (!this.svgContainer.svgElement.contains(element)) {
      throw new Error('The element must be contained in the svg container.');
    }
    if (!(element instanceof SVGGElement)) {
      throw new Error('The element must be instance of SVGGElement.');
    }
    return element as SVGGElement;
  }

  private registerZoom(): void {
    this.unregisterZoom();
    const { width, height } = this.getViewBoxSize();
    this.zoomBehavior
      .extent([
        [0, 0],
        [width, height]
      ])
      .scaleExtent([this.nzZoomMinScale, this.nzZoomMaxScale])
      .filter((e: MouseEvent | WheelEvent) => {
        this.nzBeforeZoomEvents.emit(e);
        return !e.defaultPrevented;
      })
      .on('zoom', (e: D3ZoomEvent<SVGSVGElement, null>) => {
        this.transform$.next(e.transform);
      });
    this.svgContainer.selection.call(this.zoomBehavior);
  }

  private unregisterZoom(): void {
    this.zoomBehavior.on('end', null).on('zoom', null);
  }

  private getViewBoxSize(): DOMRect {
    return this.svgContainer.svgElement.getBoundingClientRect();
  }

  private getCenterPointByElement(element: SVGGElement): { x: number; y: number } {
    const viewBoxSize = this.getViewBoxSize();
    const position = this.getRelativePositionInfo(element);
    const svgTransform = zoomTransform(this.svgContainer.svgElement);
    const centerX = (position.topLeft.x + position.bottomRight.x) / 2;
    const centerY = (position.topLeft.y + position.bottomRight.y) / 2;
    const dx = viewBoxSize.left + viewBoxSize.width / 2 - centerX;
    const dy = viewBoxSize.top + viewBoxSize.height / 2 - centerY;
    return {
      x: dx / svgTransform.k,
      y: dy / svgTransform.k
    };
  }

  /**
   * Get information about the relative position of the node(SVGGElement) in the SVG container
   */
  private getRelativePositionInfo(node: SVGGElement): RelativePositionInfo {
    const nodeBox = node.getBBox();
    const nodeCtm = node.getScreenCTM();
    let pointTL = this.svgContainer.svgElement.createSVGPoint();
    let pointBR = this.svgContainer.svgElement.createSVGPoint();

    pointTL.x = nodeBox.x;
    pointTL.y = nodeBox.y;
    pointBR.x = nodeBox.x + nodeBox.width;
    pointBR.y = nodeBox.y + nodeBox.height;
    pointTL = pointTL.matrixTransform(nodeCtm!);
    pointBR = pointBR.matrixTransform(nodeCtm!);

    return {
      topLeft: pointTL,
      bottomRight: pointBR
    };
  }
}
