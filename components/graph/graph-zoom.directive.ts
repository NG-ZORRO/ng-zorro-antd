/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { select, Selection } from 'd3-selection';
import { transition as d3Transition } from 'd3-transition';
import { zoom, ZoomBehavior, zoomIdentity, zoomTransform } from 'd3-zoom';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';
import { calculateTransform } from './core/utils';
import { NzZoomTransform, RelativePositionInfo } from './interface';
Selection.bind('transition', d3Transition);

@Directive({
  selector: '[nz-graph-zoom]'
})
export class NzGraphZoomDirective implements OnDestroy, AfterViewInit {
  @Input() nzZoom?: number;
  @Input() nzMinZoom = 0.1;
  @Input() nzMaxZoom = 10;

  @Output() readonly nzTransformEvent: EventEmitter<NzZoomTransform> = new EventEmitter();
  @Output() readonly nzZoomChange: EventEmitter<number> = new EventEmitter();

  svgSelection!: Selection<NzSafeAny, NzSafeAny, NzSafeAny, NzSafeAny>;
  zoomBehavior!: ZoomBehavior<NzSafeAny, NzSafeAny>;

  // TODO
  // Support svg element only now
  svgElement!: SVGSVGElement;
  gZoomElement!: SVGGElement;

  private destroy$ = new Subject<void>();

  constructor(private element: ElementRef, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.bind();
  }

  ngOnDestroy(): void {
    this.unbind();
    this.destroy$.next();
    this.destroy$.complete();
  }

  bind(): void {
    this.svgElement = this.element.nativeElement.querySelector('svg') as SVGSVGElement;
    this.gZoomElement = this.element.nativeElement.querySelector('svg > g') as SVGGElement;
    const { width, height } = this.element.nativeElement.getBoundingClientRect();
    this.svgSelection = select(this.svgElement);
    this.zoomBehavior = zoom()
      .extent([
        [0, 0],
        [width, height]
      ])
      .scaleExtent([this.nzMinZoom, this.nzMaxZoom])
      .on('zoom', e => {
        this.zoomed(e);
      });
    this.svgSelection.call(this.zoomBehavior, zoomIdentity.translate(0, 0).scale(this.nzZoom || 1));
    // Init with nzZoom
    this.reScale(0, this.nzZoom);
  }

  unbind(): void {
    // Destroy listener
    this.svgSelection?.interrupt().selectAll('*').interrupt();
    if (this.zoomBehavior) {
      this.zoomBehavior.on('end', null).on('zoom', null);
    }
  }

  // Methods
  fitCenter(duration: number = 0): void {
    this.reScale(duration);
  }

  focus(id: NzSafeAny, duration: number = 0): void {
    // Make sure this node is under SVG container
    if (!this.svgElement.getElementById(`${id}`)) {
      return;
    }

    const node = this.svgElement.getElementById(`${id}`) as SVGGElement;
    const svgRect = this.svgElement.getBoundingClientRect();
    const position = this.getRelativePositionInfo(node);
    const svgTransform = zoomTransform(this.svgElement);

    const centerX = (position.topLeft.x + position.bottomRight.x) / 2;
    const centerY = (position.topLeft.y + position.bottomRight.y) / 2;
    const dx = svgRect.left + svgRect.width / 2 - centerX;
    const dy = svgRect.top + svgRect.height / 2 - centerY;

    this.svgSelection
      .transition()
      .duration(duration)
      .call(this.zoomBehavior.translateBy, dx / svgTransform.k, dy / svgTransform.k);
  }

  /**
   * Handle zoom event
   * @param transform
   */
  private zoomed({ transform }: NzSafeAny): void {
    const { x, y, k } = transform;
    // Update g element transform
    (this.gZoomElement as SVGGElement).setAttribute('transform', `translate(${x}, ${y})scale(${k})`);
    this.nzZoom = k;
    this.nzZoomChange.emit(this.nzZoom);
    this.nzTransformEvent.emit(transform);
    this.cdr.markForCheck();
  }

  /**
   * Scale with zoom and duration
   * @param duration
   * @param scale
   * @private
   */
  private reScale(duration: number, scale?: number): void {
    const transform = calculateTransform(this.svgElement, this.gZoomElement, scale);
    if (!transform) {
      return;
    }
    const { x, y, k } = transform;
    const zTransform = zoomIdentity.translate(x, y).scale(Math.max(k, this.nzMinZoom));
    this.svgSelection
      .transition()
      .duration(duration)
      .call(this.zoomBehavior.transform, zTransform)
      .on('end.fitted', () => {
        this.zoomBehavior.on('end.fitted', null);
      });
  }

  private getRelativePositionInfo(node: SVGGElement): RelativePositionInfo {
    const nodeBox = node.getBBox();
    const nodeCtm = node.getScreenCTM();
    let pointTL = this.svgElement.createSVGPoint();
    let pointBR = this.svgElement.createSVGPoint();

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
