/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, group, query, style } from '@angular/animations';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer2, TemplateRef } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Observable, Subject } from 'rxjs';
import { NzGraphGroupNode, NzGraphNode } from './interface';

interface Info {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Component({
  selector: '[nz-graph-node]',
  template: `
    <svg:g #nodeEle>
      <foreignObject class="nz-graph-node-rect" x="0" y="0" [attr.width]="node.width" [attr.height]="node.height">
        <xhtml:div class="nz-graph-node-wrapper">
          <ng-container
            *ngIf="customTemplate"
            [ngTemplateOutlet]="customTemplate"
            [ngTemplateOutletContext]="{ $implicit: node, element: nodeEle }"
          ></ng-container>
          <div class="node-content" *ngIf="!customTemplate">
            <div class="title">
              {{ node.name }}
              <i
                class="action-icon"
                *ngIf="node.type === 0"
                nz-icon
                [nzType]="node.expanded ? 'minus' : 'plus'"
                nzTheme="outline"
                (click)="triggerToggle($event)"
              ></i>
            </div>
            <div class="label" *ngIf="!node.expanded">{{ node.label }}</div>
          </div>
        </xhtml:div>
      </foreignObject>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[id]': 'node.id || node.name',
    '[class.nz-graph-node-expanded]': 'node.expanded',
    '[class.nz-graph-group-node]': 'node.type===0',
    '[class.nz-graph-base-node]': 'node.type===1',
    '(click)': 'triggerClick($event)'
  }
})
export class NzGraphNodeComponent {
  @Input() node!: NzGraphNode | NzGraphGroupNode;
  @Input() @InputBoolean() noAnimation?: boolean;
  @Input() customTemplate?: TemplateRef<{
    $implicit: NzGraphNode | NzGraphGroupNode;
    element: SVGGElement;
  }>;

  @Output() readonly nodeClick: EventEmitter<NzGraphNode | NzGraphGroupNode> = new EventEmitter();
  @Output() readonly toggleClick: EventEmitter<NzGraphNode | NzGraphGroupNode> = new EventEmitter();

  triggerClick(event: MouseEvent): void {
    event.preventDefault();
    this.nodeClick.emit(this.node);
  }

  triggerToggle(event: MouseEvent): void {
    event.preventDefault();
    this.toggleClick.emit(this.node);
  }

  animationInfo: Info | null = null;
  initialState = true;

  private animationPlayer: AnimationPlayer | null = null;

  constructor(private el: ElementRef, private builder: AnimationBuilder, private renderer2: Renderer2) {}

  makeAnimation(): Observable<void> {
    const cur = this.getAnimationInfo();
    if (this.animationPlayer) {
      this.animationPlayer.destroy();
    }
    let animationFactory: AnimationFactory;
    const pre = { ...this.animationInfo } as Info;

    if (this.initialState) {
      animationFactory = this.builder.build([
        style({ transform: `translate(${cur.x}px, ${cur.y}px)` }),
        query('.nz-graph-node-rect', [
          style({
            width: `${cur.width}px`,
            height: `${cur.height}px`
          })
        ])
      ]);
      this.initialState = false;
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
              '150ms ease-out',
              style({
                width: `${cur.width}px`,
                height: `${cur.height}px`
              })
            )
          ]),
          animate('150ms ease-out', style({ transform: `translate(${cur.x}px, ${cur.y}px)` }))
        ])
      ]);
    }
    this.animationInfo = cur;
    this.animationPlayer = animationFactory.create(this.el.nativeElement);
    this.animationPlayer.play();
    const done$ = new Subject<void>();
    this.animationPlayer.onDone(() => {
      // Need this for canvas for now.
      this.renderer2.setAttribute(this.el.nativeElement, 'transform', `translate(${cur.x}, ${cur.y})`);
      done$.next();
      done$.complete();
    });
    return done$.asObservable();
  }

  makeNoAnimation(): void {
    const cur = this.getAnimationInfo();
    // Need this for canvas for now.
    this.renderer2.setAttribute(this.el.nativeElement, 'transform', `translate(${cur.x}, ${cur.y})`);
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
