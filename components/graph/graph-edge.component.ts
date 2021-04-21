/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { curveBasis, curveLinear, line } from 'd3-shape';
import { take } from 'rxjs/operators';
import { NzGraphEdge, NzGraphEdgeType } from './interface';

@Component({
  selector: '[nz-graph-edge]',
  template: `
    <ng-container *ngIf="customTemplate" [ngTemplateOutlet]="customTemplate" [ngTemplateOutletContext]="{ $implicit: edge }"></ng-container>
    <svg:g *ngIf="!customTemplate">
      <path class="nz-graph-edge-line" [attr.marker-end]="'url(#edge-end-arrow)'"></path>
      <svg:text class="nz-graph-edge-text" text-anchor="middle" dy="10" *ngIf="edge.label">
        <textPath [attr.href]="'#' + id" startOffset="50%">{{ edge.label }}</textPath>
      </svg:text>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzGraphEdgeComponent implements OnInit, OnChanges {
  @Input() edge!: NzGraphEdge;
  @Input() edgeType?: NzGraphEdgeType | string;

  @Input() customTemplate?: TemplateRef<{
    $implicit: NzGraphEdge;
  }>;

  public get id(): string {
    return this.edge?.id || `${this.edge.v}--${this.edge.w}`;
  }
  private el!: SVGGElement;
  private path!: SVGPathElement;

  private line = line<{ x: number; y: number }>()
    .x(d => d.x)
    .y(d => d.y)
    .curve(curveLinear);

  constructor(private elementRef: ElementRef<SVGGElement>, private ngZone: NgZone, private cdr: ChangeDetectorRef) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.initElementStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { edge, customTemplate, edgeType } = changes;
    if (edge) {
      this.ngZone.onStable.pipe(take(1)).subscribe(() => {
        // Update path element if customTemplate set
        if (customTemplate) {
          this.initElementStyle();
        }

        this.setLine();
        this.cdr.markForCheck();
      });
    }
    if (edgeType) {
      const type = this.edgeType === NzGraphEdgeType.CURVE ? curveBasis : curveLinear;
      this.line = line<{ x: number; y: number }>()
        .x(d => d.x)
        .y(d => d.y)
        .curve(type);
    }
  }

  initElementStyle(): void {
    this.path = this.el.querySelector('path')!;
    this.setElementData();
  }

  setLine(): void {
    this.setPath(this.line(this.edge.points)!);
  }

  setPath(d: string): void {
    this.path.setAttribute('d', d);
  }

  setElementData(): void {
    if (!this.path) {
      return;
    }
    this.path.setAttribute('id', this.id);
    this.path.setAttribute('data-edge', this.id);
    this.path.setAttribute('data-v', `${this.edge.v}`);
    this.path.setAttribute('data-w', `${this.edge.w}`);
  }
}
