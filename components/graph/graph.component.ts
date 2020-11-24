/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { buildGraph } from '@nx-component/hierarchy-graph';
import { ZoomTransform } from 'd3-zoom';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { forkJoin, Observable, Subject, Subscription } from 'rxjs';
import { finalize, take, takeUntil, tap } from 'rxjs/operators';
import { NzCustomGraphNodeDirective } from './custom-graph-node.directive';
import { NzGraphData } from './data-source/graph-data-source';
import { NzGraphMinimapComponent } from './graph-minimap.component';
import { NzGraphNodeDirective } from './graph-node.directive';
import { NzGraphSvgContainerComponent, NzZoomTransform } from './graph-svg-container.component';
import {
  NzGraphDataDef,
  NzGraphEdge,
  NzGraphEdgeDef,
  NzGraphGroupNode,
  NzGraphLayoutSetting,
  NzGraphNode,
  NzGraphNodeDef,
  NzGraphOption,
  NzLayoutSetting,
  NzRankDirection,
  nzTypeDefinition,
  NZ_GRAPH_LAYOUT_SETTING
} from './interface';
import { flattenNodes } from './utils';

/** Checks whether an object is a data source. */
export function isDataSource(value: NzSafeAny): value is NzGraphData {
  // Check if the value is a DataSource by observing if it has a connect function. Cannot
  // be checked as an `instanceof DataSource` since people could create their own sources
  // that match the interface, but don't extend DataSource.
  return value && typeof value.connect === 'function';
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-graph',
  exportAs: 'nzGraph',
  template: `
    <ng-content></ng-content>
    <nz-graph-svg-container (transformEvent)="triggerTransform($event)">
      <svg:defs nz-graph-defs></svg:defs>
      <ng-container [ngTemplateOutlet]="groupTemplate" [ngTemplateOutletContext]="{ renderInfo: renderInfo, type: 'root' }"></ng-container>
    </nz-graph-svg-container>

    <nz-graph-minimap *ngIf="nzShowMinimap"></nz-graph-minimap>

    <ng-template #groupTemplate let-renderInfo="renderInfo" let-type="type">
      <svg:g [attr.transform]="type === 'sub' ? subGraphTransform(renderInfo) : null">
        <svg:g class="core" [attr.transform]="coreTransform(renderInfo)">
          <svg:g class="nz-graph-edges">
            <svg:g class="nz-graph-edge" *ngFor="let edge of renderInfo.edges; let index = index; trackBy: edgeTrackByFun">
              <svg:path
                class="nz-graph-edge-line"
                nz-graph-edge
                [attr.marker-end]="nzShowArrow ? 'url(#edge-end-arrow)' : null"
                [edge]="edge"
              ></svg:path>
              <svg:text class="nz-graph-edge-text" text-anchor="middle" dy="20" *ngIf="edge.label">
                <textPath [attr.href]="'#' + edge.v + '--' + edge.w" startOffset="50%">{{ edge.label }}</textPath>
              </svg:text>
            </svg:g>
          </svg:g>

          <svg:g class="nz-graph-nodes">
            <svg:g
              class="nz-graph-node"
              [class.nz-graph-custom-node]="!!customGraphNodeTemplate"
              [style.display]="node.type === 2 ? 'none' : null"
              *ngFor="let node of typedNodes(renderInfo.nodes); trackBy: nodeTrackByFun"
            >
              <svg:g nz-graph-node [node]="node" (nodeClick)="clickNode($event)">
                <foreignObject class="nz-graph-node-rect" x="0" y="0" [attr.width]="node.width" [attr.height]="node.height">
                  <xhtml:div class="nz-graph-node-wrapper">
                    <ng-container
                      *ngIf="customGraphNodeTemplate"
                      [ngTemplateOutlet]="customGraphNodeTemplate"
                      [ngTemplateOutletContext]="{ $implicit: node }"
                    ></ng-container>
                    <div class="node-content" *ngIf="!customGraphNodeTemplate">
                      <div class="title">
                        {{ node.name }}
                        <i
                          class="action-icon"
                          *ngIf="node.type === 0"
                          nz-icon
                          [nzType]="node.expanded ? 'minus' : 'plus'"
                          nzTheme="outline"
                          (click)="toggleNode(node.name, node.expanded)"
                        ></i>
                      </div>
                      <div class="label" *ngIf="!node.expanded">{{ node.label }}</div>
                    </div>
                  </xhtml:div>
                </foreignObject>
              </svg:g>

              <ng-container
                *ngIf="node.expanded"
                [ngTemplateOutlet]="groupTemplate"
                [ngTemplateOutletContext]="{ renderInfo: node, type: 'sub' }"
              ></ng-container>
            </svg:g>
          </svg:g>
        </svg:g>
      </svg:g>
    </ng-template>
  `,
  host: {
    '[class.nz-graph]': 'true',
    '[class.nz-graph-auto-fit]': 'nzAutoSize'
  }
})
export class NzGraphComponent implements OnInit, OnChanges, AfterViewInit, AfterContentChecked, OnDestroy {
  static ngAcceptInputType_nzShowMinimap: BooleanInput;
  static ngAcceptInputType_nzAutoSize: BooleanInput;
  static ngAcceptInputType_nzShowArrow: BooleanInput;

  @ViewChildren(NzGraphNodeDirective) graphNodes!: QueryList<NzGraphNodeDirective>;
  @ViewChild(NzGraphSvgContainerComponent) svgContainerComponent!: NzGraphSvgContainerComponent;
  @ViewChild(NzGraphMinimapComponent) minimap: NzGraphMinimapComponent | undefined;

  @ContentChild(NzCustomGraphNodeDirective, { static: true, read: TemplateRef }) customGraphNodeTemplate?: TemplateRef<{
    $implicit: NzGraphNode | NzGraphGroupNode;
  }>;
  /**
   * Provides a stream containing the latest data array to render.
   * Data source can be an observable of NzGraphData, or a NzGraphData to render.
   */
  @Input() nzGraphData!: NzGraphData;
  @Input() nzRankDirection: NzRankDirection = 'LR';
  @Input() nzGraphLayoutSettings?: NzGraphLayoutSetting;
  @Input() @InputBoolean() nzShowMinimap = false;
  @Input() @InputBoolean() nzShowArrow = false;

  @Input() nzZoom = 1;
  @Input() @InputBoolean() nzAutoSize = false;

  @Output() readonly nzGraphInitialized = new EventEmitter<void>();
  @Output() readonly nzZoomInit = new EventEmitter<void>();
  @Output() readonly nzTransformEvent = new EventEmitter<NzZoomTransform>();
  @Output() readonly nzNodeClick: EventEmitter<NzGraphNode | NzGraphGroupNode> = new EventEmitter();

  renderInfo: NzGraphGroupNode = { labelHeight: 0 } as NzGraphGroupNode;
  mapOfNodeAttr: { [key: string]: NzGraphNodeDef } = {};
  mapOfEdgeAttr: { [key: string]: NzGraphEdgeDef } = {};

  public readonly typedNodes = nzTypeDefinition<Array<NzGraphNode | NzGraphGroupNode>>();
  private dataSource?: NzGraphData;
  private layoutSetting: NzLayoutSetting = NZ_GRAPH_LAYOUT_SETTING;
  /** Data subscription */
  private _dataSubscription?: Subscription | null;
  private destroy$ = new Subject<void>();

  nodeTrackByFun = (_: number, node: NzGraphNode | NzGraphGroupNode) => node.name;
  edgeTrackByFun = (_: number, edge: NzGraphEdge) => `${edge.v}-${edge.w}`;

  subGraphTransform = (node: NzGraphGroupNode) => {
    const x = node.x - node.coreBox.width / 2.0;
    const y = node.y - node.height / 2.0 + node.paddingTop / 2.0;
    return `translate(${x}, ${y})`;
  };

  coreTransform = (node: NzGraphGroupNode) => {
    return `translate(0, ${node.labelHeight})`;
  };

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone, private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (this.dataSource !== this.nzGraphData) {
      this._switchDataSource(this.nzGraphData);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzAutoFit, nzRankDirection, nzGraphData, nzGraphLayoutSettings } = changes;
    if (nzGraphLayoutSettings) {
      Object.assign(this.layoutSetting, this.nzGraphLayoutSettings || {});
    }

    if (nzGraphData) {
      if (this.dataSource !== this.nzGraphData) {
        this._switchDataSource(this.nzGraphData);
      }
    }

    if ((nzAutoFit && !nzAutoFit.firstChange) || (nzRankDirection && !nzRankDirection.firstChange)) {
      // Render graph
      if (this.dataSource!.dataSource) {
        this.renderGraph(this.dataSource!.dataSource, {
          rankDirection: this.nzRankDirection,
          expanded: this.dataSource!.expansionModel.selected || []
        });
      }
    }

    this.cdr.markForCheck();
  }

  ngAfterViewInit(): void {
    this.autoFit();
    this.drawMinimap(true);
  }

  ngAfterContentChecked(): void {
    if (this.dataSource && !this._dataSubscription) {
      this.observeRenderChanges();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.dataSource && typeof this.dataSource.disconnect === 'function') {
      this.dataSource.disconnect();
    }

    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
      this._dataSubscription = null;
    }
  }

  /**
   * Transform event
   */
  triggerTransform($event: { x: number; y: number; k: number }): void {
    this.nzZoom = $event.k;
    if (this.minimap) {
      this.minimap.zoom($event as ZoomTransform);
    }
    this.nzTransformEvent.emit($event);
    this.cdr.markForCheck();
  }

  /**
   * Emit event
   */
  clickNode(node: NzGraphNode | NzGraphGroupNode): void {
    this.nzNodeClick.emit(node);
  }

  /**
   * Move graph to center
   */
  autoFit(): void {
    if (this.renderInfo) {
      this.svgContainerComponent?.fit(0);
    }
  }

  /**
   * Refactor
   */
  toggleNode(node: string, expanded: boolean): void {
    if (expanded) {
      // collapse it
      this.nzGraphData.collapse(node);
    } else {
      // expand it
      this.nzGraphData.expand(node);
    }
  }

  renderGraph(data: NzGraphDataDef, options: NzGraphOption): void {
    const renderInfo = this.buildGraphInfo(data, options);
    // TODO
    // Need better performance
    this.setRenderInfo(renderInfo, false);
    if (this.nzAutoSize) {
      this.resizeNodes(renderInfo, options);
    }
    this.cdr.detectChanges();
  }

  /**
   * Switch to the provided data source by resetting the data and unsubscribing from the current
   * render change subscription if one exists. If the data source is null, interpret this by
   * clearing the node outlet. Otherwise start listening for new data.
   */
  private _switchDataSource(dataSource: NzGraphData): void {
    if (this.dataSource && typeof this.dataSource.disconnect === 'function') {
      this.nzGraphData.disconnect();
    }

    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
      this._dataSubscription = null;
    }

    this.dataSource = dataSource;
    this.observeRenderChanges();
  }

  /** Set up a subscription for the data provided by the data source. */
  private observeRenderChanges(): void {
    let dataStream: Observable<NzGraphDataDef> | undefined;
    let graphOptions: NzGraphOption = {
      rankDirection: this.nzRankDirection
    };
    if (isDataSource(this.dataSource)) {
      dataStream = this.dataSource.connect();
    }

    if (dataStream) {
      this._dataSubscription = dataStream.pipe(takeUntil(this.destroy$)).subscribe(data => {
        graphOptions = {
          rankDirection: this.nzRankDirection,
          expanded: this.nzGraphData.expansionModel.selected
        };
        this.renderGraph(data, graphOptions);
        this.cdr.detectChanges();
      });
    } else {
      throw Error(`A valid data source must be provided.`);
    }
  }

  private setRenderInfo(renderInfo: NzGraphGroupNode, asPatch: boolean = true): void {
    if (asPatch) {
      this.assignRenderInfo(renderInfo);
    } else {
      this.renderInfo = renderInfo;
    }
    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.makeNodesAnimation().subscribe();
    });
  }

  private buildGraphInfo(data: NzGraphDataDef, options: NzGraphOption): NzGraphGroupNode {
    this.parseInfo(data);
    const renderInfo = buildGraph(data, options, this.layoutSetting) as NzGraphGroupNode;
    const dig = (nodes: Array<NzGraphNode | NzGraphGroupNode>): void => {
      nodes.forEach(node => {
        if (node.type === 1 && this.mapOfNodeAttr.hasOwnProperty(node.name)) {
          Object.assign(node, this.mapOfNodeAttr[node.name]);
        } else if (node.type === 0) {
          (node as NzGraphGroupNode).edges.forEach(edge => {
            if (this.mapOfEdgeAttr.hasOwnProperty(`${edge.v}-${edge.w}`)) {
              Object.assign(edge, this.mapOfEdgeAttr[`${edge.v}-${edge.w}`]);
            }
          });
          dig(node.nodes);
        }
      });
    };
    dig(renderInfo.nodes);
    // Assign data to edges of root graph
    renderInfo.edges.forEach(edge => {
      if (this.mapOfEdgeAttr.hasOwnProperty(`${edge.v}-${edge.w}`)) {
        Object.assign(edge, this.mapOfEdgeAttr[`${edge.v}-${edge.w}`]);
      }
    });
    return renderInfo;
  }

  private resizeNodes(renderInfo: NzGraphGroupNode, options: NzGraphOption): void {
    this.ngZone.onStable
      .asObservable()
      .pipe(
        take(1),
        finalize(() => {
          this.cdr.detectChanges();
        })
      )
      .subscribe(() => {
        const dataSource: NzGraphDataDef = this.dataSource!.dataSource!;
        this.elementRef.nativeElement.querySelectorAll('[nz-graph-node]').forEach((nodeEle: HTMLElement) => {
          const contentEle = nodeEle.querySelector('.nz-graph-node-wrapper');
          if (contentEle) {
            const height = contentEle.getBoundingClientRect().height;
            const width = contentEle.getBoundingClientRect().width;
            // Element id type is string
            const targetNode = flattenNodes(renderInfo).find(n => `${n.name}` === nodeEle.id);
            const nodeName = targetNode && targetNode.name;
            const node = dataSource.nodes.find(n => n.id === nodeName);

            if (node) {
              node.height = height / this.nzZoom;
              node.width = width / this.nzZoom;
            }
          }
        });
        const newRenderInfo = this.buildGraphInfo(dataSource, options);
        this.setRenderInfo(newRenderInfo, false);
      });
  }

  private assignRenderInfo(renderInfo: NzGraphGroupNode): void {
    this.renderInfo.edges = renderInfo.edges;
    this.renderInfo.nodes.forEach((node: NzGraphNode | NzGraphGroupNode, index: number) => {
      Object.assign(node, renderInfo.nodes[index]);
    });
  }

  private makeNodesAnimation(): Observable<void> {
    return forkJoin(...this.graphNodes.map(node => node.makeAnimation())).pipe(
      tap(() => {
        this.drawMinimap();
      }),
      finalize(() => {
        this.cdr.detectChanges();
      })
    );
  }

  private parseInfo(data: NzGraphDataDef): void {
    data.nodes.forEach(n => {
      this.mapOfNodeAttr[n.id] = n;
    });
    data.edges.forEach(e => {
      this.mapOfEdgeAttr[`${e.v}-${e.w}`] = e;
    });
  }

  private drawMinimap(forceRerender: boolean = false): void {
    if (!this.minimap || !this.nzShowMinimap) {
      return;
    }
    if (forceRerender) {
      this.minimap?.init(
        this.svgContainerComponent.containerElement.nativeElement,
        this.svgContainerComponent.zoomElement.nativeElement,
        this.svgContainerComponent.zoomController
      );
    } else {
      this.minimap?.update();
    }
  }
}
