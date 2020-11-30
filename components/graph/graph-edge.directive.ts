/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { curveBasis, line } from 'd3-shape';
import { take } from 'rxjs/operators';
import { NzGraphEdge } from './interface';

@Directive({
  selector: 'svg:path[nz-graph-edge]',
  host: {
    '[id]': 'id'
  }
})
export class NzGraphEdgeDirective implements OnInit, OnChanges {
  @Input() edge!: NzGraphEdge;

  public get id(): string {
    return this.edge?.id || `${this.edge.v}--${this.edge.w}`;
  }

  private readonly el!: SVGPathElement;
  private readonly line = line<{ x: number; y: number }>()
    .x(d => d.x)
    .y(d => d.y)
    .curve(curveBasis);

  constructor(private elementRef: ElementRef<SVGPathElement>, private ngZone: NgZone) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('nz-graph-edge-line');

    this.el = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.setElementData();
  }

  setLine(): void {
    const adjoiningPath = this.getAdjoiningEdgeElement();

    if (adjoiningPath) {
      const adjoiningPoint = adjoiningPath
        .getPointAtLength(this.edge.inbound ? adjoiningPath.getTotalLength() : 0)
        .matrixTransform(adjoiningPath.getCTM()!)
        .matrixTransform(this.el.getCTM()!.inverse());
      const points = [...this.edge.points];
      const index = this.edge.inbound ? 0 : points.length - 1;
      points[index].x = adjoiningPoint.x;
      points[index].y = adjoiningPoint.y;
      this.setPath(this.line(points)!);
    } else {
      this.setPath(this.line(this.edge.points)!);
    }
  }

  setPath(d: string): void {
    this.el.setAttribute('d', d);
  }

  setElementData(): void {
    this.el.setAttribute('data-edge', `${this.edge.v}--${this.edge.w}`);
    this.el.setAttribute('data-v', `${this.edge.v}`);
    this.el.setAttribute('data-w', `${this.edge.w}`);
  }

  getAdjoiningEdgeElement(): SVGPathElement | null {
    const adjoiningEdge = this.edge.adjoiningEdge;
    if (adjoiningEdge) {
      return document.querySelector(`path[data-edge="${adjoiningEdge.v}--${adjoiningEdge.w}"]`) as SVGPathElement;
    } else {
      return null;
    }
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.setLine();
    });
  }
}
