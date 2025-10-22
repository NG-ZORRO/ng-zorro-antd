/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgZone } from '@angular/core';

import { drag } from 'd3-drag';
import { pointer, select } from 'd3-selection';
import { ZoomBehavior, zoomIdentity, ZoomTransform } from 'd3-zoom';

import { requestAnimationFrame } from 'ng-zorro-antd/core/polyfill';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzZoomTransform } from '../interface';

const FRAC_VIEWPOINT_AREA = 0.8;

export class Minimap {
  private canvas: HTMLCanvasElement;
  private canvasRect: DOMRect;
  private canvasBuffer: HTMLCanvasElement;
  private minimapSvg: SVGSVGElement;
  private viewpoint: SVGRectElement;
  private scaleMinimap!: number;
  private scaleMain!: number;
  private translate!: [number, number];
  private viewpointCoord: { x: number; y: number };
  private minimapSize!: { width: number; height: number };

  private unlisteners: VoidFunction[] = [];

  constructor(
    private ngZone: NgZone,
    private svg: SVGSVGElement,
    private zoomG: SVGGElement,
    private mainZoom: ZoomBehavior<NzSafeAny, NzSafeAny>,
    private minimap: HTMLElement,
    private maxWidth: number,
    private labelPadding: number
  ) {
    const minimapElement = select(minimap);
    const minimapSvgElement = minimapElement.select('svg');
    const viewpointElement = minimapSvgElement.select('rect');
    this.canvas = minimapElement.select('canvas.viewport').node() as HTMLCanvasElement;
    this.canvasRect = this.canvas.getBoundingClientRect();

    const handleEvent = (event: NzSafeAny): void => {
      const minimapOffset = this.minimapOffset();
      const width = Number(viewpointElement.attr('width'));
      const height = Number(viewpointElement.attr('height'));
      const clickCoords = pointer(event, minimapSvgElement.node() as NzSafeAny);
      this.viewpointCoord.x = clickCoords[0] - width / 2 - minimapOffset.x;
      this.viewpointCoord.y = clickCoords[1] - height / 2 - minimapOffset.y;
      this.updateViewpoint();
    };
    this.viewpointCoord = { x: 0, y: 0 };
    const subject = drag().subject(Object);
    const dragEvent = subject.on('drag', handleEvent);
    viewpointElement.datum(this.viewpointCoord as NzSafeAny).call(dragEvent as NzSafeAny);

    // Make the minimap clickable.
    minimapSvgElement.on('click', event => {
      if ((event as Event).defaultPrevented) {
        // This click was part of a drag event, so suppress it.
        return;
      }
      handleEvent(event);
    });
    this.unlisteners.push(() => {
      subject.on('drag', null);
      minimapSvgElement.on('click', null);
    });
    this.viewpoint = viewpointElement.node() as SVGRectElement;
    this.minimapSvg = minimapSvgElement.node() as SVGSVGElement;
    this.canvasBuffer = minimapElement.select('canvas.buffer').node() as HTMLCanvasElement;
    this.update();
  }

  destroy(): void {
    while (this.unlisteners.length) {
      this.unlisteners.pop()!();
    }
  }

  private minimapOffset(): { x: number; y: number } {
    return {
      x: (this.canvasRect.width - this.minimapSize.width) / 2,
      y: (this.canvasRect.height - this.minimapSize.height) / 2
    };
  }

  private updateViewpoint(): void {
    // Update the coordinates of the viewpoint rectangle.
    select(this.viewpoint).attr('x', this.viewpointCoord.x).attr('y', this.viewpointCoord.y);
    // Update the translation vector of the main svg to reflect the
    // new viewpoint.
    const mainX = (-this.viewpointCoord.x * this.scaleMain) / this.scaleMinimap;
    const mainY = (-this.viewpointCoord.y * this.scaleMain) / this.scaleMinimap;
    select(this.svg).call(this.mainZoom.transform, zoomIdentity.translate(mainX, mainY).scale(this.scaleMain));
  }

  update(): void {
    let sceneSize = null;
    try {
      // Get the size of the entire scene.
      sceneSize = this.zoomG.getBBox();
      if (sceneSize.width === 0) {
        // There is no scene anymore. We have been detached from the dom.
        return;
      }
    } catch {
      // Firefox produced NS_ERROR_FAILURE if we have been
      // detached from the dom.
      return;
    }

    const svgSelection = select(this.svg);
    // Read all the style rules in the document and embed them into the svg.
    // The svg needs to be self-contained, i.e. all the style rules need to be
    // embedded so the canvas output matches the origin.
    let stylesText = '';

    for (const k of new Array(document.styleSheets.length).keys()) {
      try {
        const cssRules =
          (document.styleSheets[k] as NzSafeAny).cssRules || (document.styleSheets[k] as NzSafeAny).rules;
        if (cssRules == null) {
          continue;
        }
        for (const i of new Array(cssRules.length).keys()) {
          // Remove tf-* selectors from the styles.
          stylesText += `${cssRules[i].cssText.replace(/ ?tf-[\w-]+ ?/g, '')}\n`;
        }
      } catch (e: NzSafeAny) {
        if (e.name !== 'SecurityError') {
          throw e;
        }
      }
    }

    // Temporarily add the css rules to the main svg.
    const svgStyle = svgSelection.append('style');
    svgStyle.text(stylesText);

    // Temporarily remove the zoom/pan transform from the main svg since we
    // want the minimap to show a zoomed-out and centered view.
    const zoomGSelection = select(this.zoomG);
    const zoomTransform = zoomGSelection.attr('transform');
    zoomGSelection.attr('transform', null);

    // Since we add padding, account for that here.
    sceneSize.height += this.labelPadding * 2;
    sceneSize.width += this.labelPadding * 2;

    // Temporarily assign an explicit width/height to the main svg, since
    // it doesn't have one (uses flex-box), but we need it for the canvas
    // to work.
    svgSelection.attr('width', sceneSize.width).attr('height', sceneSize.height);

    // Since the content inside the svg changed (e.g. a node was expanded),
    // the aspect ratio has also changed. Thus, we need to update the scale
    // factor of the minimap. The scale factor is determined such that both
    // the width and height of the minimap are <= maximum specified w/h.
    this.scaleMinimap = this.maxWidth / Math.max(sceneSize.width, sceneSize.height);
    this.minimapSize = {
      width: sceneSize.width * this.scaleMinimap,
      height: sceneSize.height * this.scaleMinimap
    };

    const minimapOffset = this.minimapOffset();

    // Update the size of the minimap's svg, the buffer canvas and the
    // viewpoint rect.
    select(this.minimapSvg).attr(this.minimapSize as NzSafeAny);
    select(this.canvasBuffer).attr(this.minimapSize as NzSafeAny);

    if (this.translate != null && this.zoom != null) {
      // Update the viewpoint rectangle shape since the aspect ratio of the
      // map has changed.
      this.ngZone.runOutsideAngular(() => requestAnimationFrame(() => this.zoom()));
    }

    // Serialize the main svg to a string which will be used as the rendering
    // content for the canvas.
    const svgXml = new XMLSerializer().serializeToString(this.svg);

    // Now that the svg is serialized for rendering, remove the temporarily
    // assigned styles, explicit width and height and bring back the pan/zoom
    // transform.
    svgStyle.remove();
    svgSelection.attr('width', '100%').attr('height', '100%');

    zoomGSelection.attr('transform', zoomTransform);

    const image = document.createElement('img');
    const onLoad = (): void => {
      // Draw the svg content onto the buffer canvas.
      const context = this.canvasBuffer.getContext('2d');
      context!.clearRect(0, 0, this.canvasBuffer.width, this.canvasBuffer.height);

      context!.drawImage(image, minimapOffset.x, minimapOffset.y, this.minimapSize.width, this.minimapSize.height);

      this.ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          // Hide the old canvas and show the new buffer canvas.
          select(this.canvasBuffer).style('display', 'block');
          select(this.canvas).style('display', 'none');
          // Swap the two canvases.
          [this.canvas, this.canvasBuffer] = [this.canvasBuffer, this.canvas];
        });
      });
    };

    image.addEventListener('load', onLoad);
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgXml)}`;

    this.unlisteners.push(() => {
      image.removeEventListener('load', onLoad);
    });
  }

  /**
   * Handles changes in zooming/panning. Should be called from the main svg
   * to notify that a zoom/pan was performed, and this minimap will update its
   * viewpoint rectangle.
   *
   * @param transform
   */
  zoom(transform?: ZoomTransform | NzZoomTransform): void {
    if (this.scaleMinimap == null) {
      // Scene is not ready yet.
      return;
    }
    // Update the new translate and scale params, only if specified.
    if (transform) {
      this.translate = [transform.x, transform.y];
      this.scaleMain = transform.k;
    }

    // Update the location of the viewpoint rectangle.
    const svgRect = this.svg.getBoundingClientRect();
    const minimapOffset = this.minimapOffset();
    const viewpointSelection = select(this.viewpoint);
    this.viewpointCoord.x = (-this.translate[0] * this.scaleMinimap) / this.scaleMain;
    this.viewpointCoord.y = (-this.translate[1] * this.scaleMinimap) / this.scaleMain;
    const viewpointWidth = (svgRect.width * this.scaleMinimap) / this.scaleMain;
    const viewpointHeight = (svgRect.height * this.scaleMinimap) / this.scaleMain;
    viewpointSelection
      .attr('x', this.viewpointCoord.x + minimapOffset.x)
      .attr('y', this.viewpointCoord.y + minimapOffset.y)
      .attr('width', viewpointWidth)
      .attr('height', viewpointHeight);
    // Show/hide the minimap depending on the viewpoint area as a fraction of the whole minimap
    const mapWidth = this.minimapSize.width;
    const mapHeight = this.minimapSize.height;
    const x = this.viewpointCoord.x;
    const y = this.viewpointCoord.y;
    const w = Math.min(Math.max(0, x + viewpointWidth), mapWidth) - Math.min(Math.max(0, x), mapWidth);
    const h = Math.min(Math.max(0, y + viewpointHeight), mapHeight) - Math.min(Math.max(0, y), mapHeight);
    const fracIntersect = (w * h) / (mapWidth * mapHeight);
    if (fracIntersect < FRAC_VIEWPOINT_AREA) {
      this.minimap.classList.remove('hidden');
    } else {
      this.minimap.classList.add('hidden');
    }
  }
}
