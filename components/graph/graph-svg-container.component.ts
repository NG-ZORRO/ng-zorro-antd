/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { select, Selection } from 'd3-selection';
// Need to import for select
// @ts-ignore
import { interrupt, transition } from 'd3-transition';
import { zoom, ZoomBehavior, zoomIdentity, zoomTransform } from 'd3-zoom';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NZ_GRAPH_LAYOUT_SETTING } from './interface';

export interface NzZoomTransform {
  x: number;
  y: number;
  k: number;
}

export interface RelativePositionInfo {
  topLeft: { x: number; y: number };
  bottomRight: { x: number; y: number };
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-graph-svg-container',
  exportAs: 'nzGraphSvgContainer',
  template: `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" #container width="100%" height="100%">
      <rect width="100%" height="100%" fill="transparent" class="nz-graph-background"></rect>
      <g #zoom [attr.transform]="transformStyle" class="nz-graph-zoom">
        <ng-content></ng-content>
      </g>
    </svg>
  `,
  host: {
    '[class.nz-graph-svg-container]': 'true'
  }
})
export class NzGraphSvgContainerComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) containerElement!: ElementRef<SVGSVGElement>;
  @ViewChild('zoom', { static: true }) zoomElement!: ElementRef<SVGAElement>;
  @Input() maxZoomLevel = 10;
  @Input() minZoomLevel = 0.1;
  @Input() zoom = 1;

  @Output() readonly zoomEvent: EventEmitter<number> = new EventEmitter();
  @Output() readonly transformEvent: EventEmitter<NzZoomTransform> = new EventEmitter();
  transform: NzZoomTransform = { x: 0, y: 0, k: 1 };
  transformStyle = '';
  svgSelect!: Selection<NzSafeAny, NzSafeAny, NzSafeAny, NzSafeAny>;
  zoomController!: ZoomBehavior<NzSafeAny, NzSafeAny>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.bind();
  }

  ngOnDestroy(): void {
    this.unbind();
  }

  bind(): void {
    this.svgSelect = select(this.containerElement.nativeElement);
    this.zoomController = zoom()
      .scaleExtent([this.minZoomLevel, this.maxZoomLevel])
      .on('zoom', ({ transform }: NzSafeAny) => {
        const { x, y, k } = transform;
        this.zoom = k;
        this.zoomEvent.emit(k);
        this.transform = transform;
        this.transformEvent.emit(transform);
        this.transformStyle = `translate(${x} ,${y})scale(${k})`;
        this.cdr.detectChanges();
      });
    this.svgSelect.call(this.zoomController, zoomIdentity.translate(0, 0).scale(this.zoom));
  }

  unbind(): void {
    this.svgSelect?.interrupt().selectAll('*').interrupt();
    if (this.zoomController) {
      this.zoomController.on('end', null).on('zoom', null);
      this.transformEvent.complete();
    }
  }

  /**
   * Zoom to fit
   */
  fit(duration: number = 500, scale: number = 0.9): void {
    const svgRect = this.containerElement.nativeElement.getBoundingClientRect();
    let sceneSize = null;
    try {
      sceneSize = this.zoomElement.nativeElement.getBBox();
      if (sceneSize.width === 0) {
        // There is no scene anymore. We have been detached from the dom.
        return;
      }
    } catch (e) {
      // Firefox produced NS_ERROR_FAILURE if we have been
      // detached from the dom.
      return;
    }
    const fitScale = Math.min(svgRect.width / sceneSize.width, svgRect.height / sceneSize.height, 2) * scale;

    const dx = (svgRect.width - sceneSize.width * fitScale) / 2;
    const dy = (svgRect.height - sceneSize.height * fitScale) / 2;
    const params = NZ_GRAPH_LAYOUT_SETTING.graph;

    const transform = zoomIdentity.translate(dx + params.padding.paddingLeft, dy + params.padding.paddingTop).scale(fitScale);
    this.svgSelect
      .transition()
      .duration(duration)
      .call(this.zoomController.transform, transform)
      .on('end.fitted', () => {
        // Remove the listener for the zoomend event,
        // so we don't get called at the end of regular zoom events,
        // just those that fit the graph to screen.
        this.zoomController.on('end.fitted', null);
      });
  }

  // Move node to center
  setNodeToCenter(node: SVGGElement): void {
    // Make sure this node is under SVG container
    if (!node || !this.containerElement.nativeElement.contains(node)) {
      return;
    }

    const svgRect = this.containerElement.nativeElement.getBoundingClientRect();
    const position = this.getRelativePositionInfo(node);
    const svgTransform = zoomTransform(this.containerElement.nativeElement);

    const centerX = (position.topLeft.x + position.bottomRight.x) / 2;
    const centerY = (position.topLeft.y + position.bottomRight.y) / 2;
    const dx = svgRect.left + svgRect.width / 2 - centerX;
    const dy = svgRect.top + svgRect.height / 2 - centerY;

    select(this.containerElement.nativeElement)
      .transition()
      .duration(250)
      .call(this.zoomController.translateBy, dx / svgTransform.k, dy / svgTransform.k);
  }

  private getRelativePositionInfo(node: SVGGElement): RelativePositionInfo {
    const nodeBox = node.getBBox();
    const nodeCtm = node.getScreenCTM();
    let pointTL = this.containerElement.nativeElement.createSVGPoint();
    let pointBR = this.containerElement.nativeElement.createSVGPoint();

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
