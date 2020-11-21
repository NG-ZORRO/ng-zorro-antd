/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, group, query, style } from '@angular/animations';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NzGraphGroupNode, NzGraphNode } from './interface';

interface Info {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Directive({
  selector: 'svg:g[nz-graph-node]',
  host: {
    '[id]': 'node.id || node.name',
    '[class.nz-graph-node-expanded]': 'node.expanded',
    '[class.nz-graph-group-node]': 'node.type===0',
    '[class.nz-graph-base-node]': 'node.type===1',
    '(click)': 'onTriggerClick($event)'
  }
})
export class NzGraphNodeDirective implements AfterViewInit {
  @Input() node!: NzGraphNode | NzGraphGroupNode;
  @Output() readonly nodeClick: EventEmitter<NzGraphNode | NzGraphGroupNode> = new EventEmitter();

  onTriggerClick(event: MouseEvent): void {
    event.preventDefault();
    this.nodeClick.emit(this.node);
  }

  animationInfo: Info | null = null;

  private animationPlayer: AnimationPlayer | null = null;

  constructor(private el: ElementRef, private builder: AnimationBuilder, private renderer2: Renderer2) {}

  makeAnimation(isFirstChange: boolean = false): Observable<void> {
    if (this.animationPlayer) {
      this.animationPlayer.destroy();
    }
    let animationFactory: AnimationFactory;
    const cur = this.getAnimationInfo();
    const pre = { ...this.animationInfo } as Info;

    if (isFirstChange) {
      animationFactory = this.builder.build([
        style({ transform: `translate(${cur.x}px, ${cur.y}px)` }),
        query('.nz-graph-node-rect', [
          style({
            width: `${cur.width}px`,
            height: `${cur.height}px`
          })
        ])
      ]);
    } else {
      animationFactory = this.builder.build([
        style({ transform: `translate(${pre!.x}px, ${pre!.y}px)` }),
        query('.nz-graph-node-rect', [
          style({
            width: `${pre!.width}px`,
            height: `${pre!.height}px`
          })
        ]),
        group([
          query('.nz-graph-node-rect', [
            animate(
              '200ms ease-out',
              style({
                width: `${cur.width}px`,
                height: `${cur.height}px`
              })
            )
          ]),
          animate('200ms ease-out', style({ transform: `translate(${cur.x}px, ${cur.y}px)` }))
        ])
      ]);
    }
    const done$ = new Subject<void>();
    this.animationInfo = cur;
    this.animationPlayer = animationFactory.create(this.el.nativeElement);
    this.animationPlayer.play();
    this.animationPlayer.onDone(() => {
      // Need this for canvas for now.
      this.renderer2.setAttribute(this.el.nativeElement, 'transform', `translate(${cur.x}, ${cur.y})`);
      done$.next();
      done$.complete();
    });
    return done$.asObservable();
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

  ngAfterViewInit(): void {
    this.makeAnimation(true);
  }
}
