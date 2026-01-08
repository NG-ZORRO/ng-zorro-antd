/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  NgZone,
  OnInit,
  Renderer2,
  TemplateRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, tap } from 'rxjs/operators';

import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';

import { NzGraph } from './graph';
import { NzGraphGroupNode, NzGraphNode } from './interface';

interface Info {
  x: number;
  y: number;
  width: number;
  height: number;
}

const translate = (x: number, y: number): string => `translate(${coerceCssPixelValue(x)}, ${coerceCssPixelValue(y)})`;

@Component({
  selector: '[nz-graph-node]',
  template: `
    <svg:g>
      @if (customTemplate) {
        <ng-container [ngTemplateOutlet]="customTemplate" [ngTemplateOutletContext]="{ $implicit: node }" />
      } @else {
        <svg:rect class="nz-graph-node-rect" [attr.width]="node.width" [attr.height]="node.height"></svg:rect>
        <svg:text x="10" y="20">{{ node.id || node.name }}</svg:text>
      }
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[id]': 'node.id || node.name',
    '[class.nz-graph-node-expanded]': 'node.expanded',
    '[class.nz-graph-group-node]': 'node.type === 0',
    '[class.nz-graph-base-node]': 'node.type === 1'
  },
  imports: [NgTemplateOutlet]
})
export class NzGraphNodeComponent implements OnInit {
  private readonly ngZone = inject(NgZone);
  private readonly el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly renderer = inject(Renderer2);
  private readonly graphComponent = inject(NzGraph);
  private readonly destroyRef = inject(DestroyRef);

  @Input() node!: NzGraphNode | NzGraphGroupNode;
  @Input() customTemplate?: TemplateRef<{
    $implicit: NzGraphNode | NzGraphGroupNode;
  }>;

  private animationInfo: Info | null = null;
  private initialState = true;

  ngOnInit(): void {
    fromEventOutsideAngular<MouseEvent>(this.el, 'click')
      .pipe(
        tap(event => event.preventDefault()),
        filter(() => this.graphComponent.nzNodeClick.observers.length > 0),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        // Re-enter the Angular zone and run the change detection only if there are any `nzNodeClick` listeners,
        // e.g.: `<nz-graph (nzNodeClick)="..."></nz-graph>`.
        this.ngZone.run(() => this.graphComponent.nzNodeClick.emit(this.node));
      });
  }

  async makeAnimation(): Promise<void> {
    const cur = this.getAnimationInfo();
    const pre = { ...this.animationInfo } as Info;

    const group = this.el.querySelector('g');

    if (this.initialState) {
      // Initial state: directly set position without animation
      this.renderer.setAttribute(this.el, 'transform', translate(cur.x, cur.y));
      if (group) {
        this.renderer.setStyle(group, 'width', coerceCssPixelValue(cur.width));
        this.renderer.setStyle(group, 'height', coerceCssPixelValue(cur.height));
      }
      this.initialState = false;
      this.animationInfo = cur;
    } else {
      return new Promise(resolve => {
        // Animate parent element (transform)
        const parentAnimation = this.el.animate(
          [{ transform: translate(pre.x, pre.y) }, { transform: translate(cur.x, cur.y) }],
          {
            duration: 150,
            easing: 'ease-out',
            fill: 'forwards'
          }
        );

        // Animate child g element (width/height) if it exists
        if (group) {
          group.animate(
            [
              { width: coerceCssPixelValue(pre.width), height: coerceCssPixelValue(pre.height) },
              { width: coerceCssPixelValue(cur.width), height: coerceCssPixelValue(cur.height) }
            ],
            {
              duration: 150,
              easing: 'ease-out',
              fill: 'forwards'
            }
          );
        }

        // Wait for animations to complete
        parentAnimation.onfinish = () => {
          // Need this for canvas for now.
          this.renderer.setAttribute(this.el, 'transform', translate(cur.x, cur.y));
          if (group) {
            this.renderer.setStyle(group, 'width', coerceCssPixelValue(cur.width));
            this.renderer.setStyle(group, 'height', coerceCssPixelValue(cur.height));
          }
          resolve();
        };

        this.animationInfo = cur;
      });
    }
  }

  makeNoAnimation(): void {
    const cur = this.getAnimationInfo();
    // Need this for canvas for now.
    this.renderer.setAttribute(this.el, 'transform', translate(cur.x, cur.y));
  }

  getAnimationInfo(): Info {
    const { x, y } = this.nodeTransform();
    return {
      width: this.node.width,
      height: this.node.height,
      x,
      y
    };
  }

  nodeTransform(): { x: number; y: number } {
    const x = this.computeCXPositionOfNodeShape() - this.node.width / 2;
    const y = this.node.y - this.node.height / 2;
    return { x, y };
  }

  computeCXPositionOfNodeShape(): number {
    if ((this.node as NzGraphGroupNode).expanded) {
      return this.node.x;
    }
    return this.node.x - this.node.width / 2 + this.node.coreBox.width / 2;
  }
}
