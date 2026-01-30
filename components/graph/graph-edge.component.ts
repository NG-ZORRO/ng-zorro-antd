/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  afterNextRender,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { curveBasis, curveLinear, line } from 'd3-shape';

import { NzGraphEdge, NzGraphEdgeType } from './interface';

@Component({
  selector: '[nz-graph-edge]',
  template: `
    @if (customTemplate) {
      <ng-container [ngTemplateOutlet]="customTemplate" [ngTemplateOutletContext]="{ $implicit: edge }" />
    } @else {
      <svg:g>
        <path class="nz-graph-edge-line" [attr.marker-end]="'url(#edge-end-arrow)'" />
        @if (edge.label) {
          <svg:text class="nz-graph-edge-text" text-anchor="middle" dy="10">
            <textPath [attr.href]="'#' + id" startOffset="50%">{{ edge.label }}</textPath>
          </svg:text>
        }
      </svg:g>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet]
})
export class NzGraphEdgeComponent implements OnInit, OnChanges {
  private injector = inject(Injector);
  private cdr = inject(ChangeDetectorRef);
  @Input() edge!: NzGraphEdge;
  @Input() edgeType?: NzGraphEdgeType | string;

  @Input() customTemplate?: TemplateRef<{
    $implicit: NzGraphEdge;
  }>;

  public get id(): string {
    return this.edge?.id || `${this.edge.v}--${this.edge.w}`;
  }
  private el: SVGGElement = inject(ElementRef<SVGGElement>).nativeElement;
  private path!: SVGPathElement;

  private line = line<{ x: number; y: number }>()
    .x(d => d.x)
    .y(d => d.y)
    .curve(curveLinear);

  ngOnInit(): void {
    this.initElementStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { edge, customTemplate, edgeType } = changes;

    if (edge) {
      afterNextRender(
        () => {
          // Update path element if customTemplate set
          if (customTemplate) {
            this.initElementStyle();
          }

          this.setLine();
          this.cdr.markForCheck();
        },
        { injector: this.injector }
      );
    }

    if (edgeType) {
      const type = this.edgeType === NzGraphEdgeType.LINE ? curveLinear : curveBasis;
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
