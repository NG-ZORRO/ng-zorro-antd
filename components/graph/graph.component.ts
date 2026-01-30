/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentChecked,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DestroyRef,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  PLATFORM_ID,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { buildGraph } from 'dagre-compound';

import { NzNoAnimationDirective } from 'ng-zorro-antd/core/animation';
import { cancelAnimationFrame, requestAnimationFrame } from 'ng-zorro-antd/core/polyfill';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { calculateTransform } from './core/utils';
import { NzGraphData } from './data-source/graph-data-source';
import { NzGraph } from './graph';
import { NzGraphDefsComponent } from './graph-defs.component';
import { NzGraphEdgeComponent } from './graph-edge.component';
import { NzGraphEdgeDirective } from './graph-edge.directive';
import { NzGraphGroupNodeDirective } from './graph-group-node.directive';
import { NzGraphNodeComponent } from './graph-node.component';
import { NzGraphNodeDirective } from './graph-node.directive';
import { NzGraphZoomDirective } from './graph-zoom.directive';
import {
  NZ_GRAPH_LAYOUT_SETTING,
  NzGraphDataDef,
  NzGraphEdge,
  NzGraphEdgeDef,
  NzGraphGroupNode,
  NzGraphLayoutConfig,
  NzGraphNode,
  NzGraphNodeDef,
  NzGraphOption,
  NzLayoutSetting,
  NzRankDirection,
  nzTypeDefinition
} from './interface';

/** Checks whether an object is a data source. */
function isDataSource(value: NzSafeAny): value is NzGraphData {
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
  providers: [{ provide: NzGraph, useExisting: forwardRef(() => NzGraphComponent) }],
  template: `
    <ng-content />
    <svg width="100%" height="100%">
      <svg:defs nz-graph-defs />
      <svg:g [attr.transform]="transformStyle">
        <ng-container
          [ngTemplateOutlet]="groupTemplate"
          [ngTemplateOutletContext]="{ renderNode: renderInfo, type: 'root' }"
        />
      </svg:g>
    </svg>

    <ng-template #groupTemplate let-renderNode="renderNode" let-type="type">
      <svg:g [attr.transform]="type === 'sub' ? subGraphTransform(renderNode) : null">
        <svg:g class="core" [attr.transform]="coreTransform(renderNode)">
          <svg:g class="nz-graph-edges">
            @for (edge of asNzGraphEdges(renderNode.edges); track edgeTrackByFun(edge)) {
              <g
                class="nz-graph-edge"
                nz-graph-edge
                [edge]="edge"
                [edgeType]="nzGraphLayoutConfig?.defaultEdge?.type"
                [customTemplate]="customGraphEdgeTemplate"
              />
            }
          </svg:g>

          <svg:g class="nz-graph-nodes">
            @for (node of typedNodes(renderNode.nodes); track node.name) {
              @if (node.type === 1) {
                <g class="nz-graph-node" nz-graph-node [node]="node" [customTemplate]="nodeTemplate" />
              }

              @if (node.type === 0) {
                <g class="nz-graph-node" nz-graph-node [node]="node" [customTemplate]="groupNodeTemplate" />
              }

              @if (node.expanded) {
                <ng-container
                  [ngTemplateOutlet]="groupTemplate"
                  [ngTemplateOutletContext]="{ renderNode: node, type: 'sub' }"
                />
              }
            }
          </svg:g>
        </svg:g>
      </svg:g>
    </ng-template>
  `,
  host: {
    class: 'nz-graph',
    '[class.nz-graph-auto-size]': 'nzAutoSize'
  },
  imports: [NgTemplateOutlet, NzGraphEdgeComponent, NzGraphNodeComponent, NzGraphDefsComponent]
})
export class NzGraphComponent implements OnInit, OnChanges, AfterContentChecked, NzGraph {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });
  private readonly nzGraphZoom = inject(NzGraphZoomDirective, { optional: true });

  @ViewChildren(NzGraphNodeComponent, { read: ElementRef }) listOfNodeElement!: QueryList<ElementRef>;
  @ViewChildren(NzGraphNodeComponent) listOfNodeComponent!: QueryList<NzGraphNodeComponent>;

  @ContentChild(NzGraphNodeDirective, { static: true, read: TemplateRef }) nodeTemplate?: TemplateRef<{
    $implicit: NzGraphNode;
  }>;
  @ContentChild(NzGraphGroupNodeDirective, { static: true, read: TemplateRef }) groupNodeTemplate?: TemplateRef<{
    $implicit: NzGraphGroupNode;
  }>;
  @ContentChild(NzGraphEdgeDirective, { static: true, read: TemplateRef }) customGraphEdgeTemplate?: TemplateRef<{
    $implicit: NzGraphEdge;
  }>;
  /**
   * Provides a stream containing the latest data array to render.
   * Data source can be an observable of NzGraphData, or a NzGraphData to render.
   */
  @Input() nzGraphData!: NzGraphData;
  @Input() nzRankDirection: NzRankDirection = 'LR';
  @Input() nzGraphLayoutConfig?: NzGraphLayoutConfig;
  @Input({ transform: booleanAttribute }) nzAutoSize = false;

  @Output() readonly nzGraphInitialized = new EventEmitter<NzGraphComponent>();
  @Output() readonly nzGraphRendered = new EventEmitter<NzGraphComponent>();
  @Output() readonly nzNodeClick = new EventEmitter<NzGraphNode | NzGraphGroupNode>();

  private requestId: number = -1;
  transformStyle = '';
  graphRenderedSubject$ = new ReplaySubject<void>(1);
  renderInfo: NzGraphGroupNode = { labelHeight: 0 } as NzGraphGroupNode;
  mapOfNodeAttr: Record<string, NzGraphNodeDef> = {};
  mapOfEdgeAttr: Record<string, NzGraphEdgeDef> = {};
  zoom = 1;

  private dataSource?: NzGraphData;
  private layoutSetting: NzLayoutSetting = NZ_GRAPH_LAYOUT_SETTING;
  private _dataSubscription?: Subscription | null;

  // type guards
  protected readonly typedNodes = nzTypeDefinition<Array<NzGraphNode | NzGraphGroupNode>>();
  protected readonly asNzGraphEdges = (data: unknown): NzGraphEdge[] => data as NzGraphEdge[];

  protected readonly edgeTrackByFun = (edge: NzGraphEdge): string => `${edge.v}-${edge.w}`;
  protected readonly subGraphTransform = (node: NzGraphGroupNode): string => {
    const x = node.x - node.coreBox.width / 2.0;
    const y = node.y - node.height / 2.0 + node.paddingTop;
    return `translate(${x}, ${y})`;
  };
  protected readonly coreTransform = (node: NzGraphGroupNode): string =>
    `translate(0, ${node.parentNodeName ? node.labelHeight : 0})`;

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.dataSource && typeof this.dataSource.disconnect === 'function') {
        this.dataSource.disconnect();
      }

      if (this._dataSubscription) {
        this._dataSubscription.unsubscribe();
        this._dataSubscription = null;
      }
      cancelAnimationFrame(this.requestId);
    });
  }

  ngOnInit(): void {
    this.graphRenderedSubject$.pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      // Only zooming is not set, move graph to center
      if (!this.nzGraphZoom) {
        this.fitCenter();
      }
      this.nzGraphInitialized.emit(this);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzAutoFit, nzRankDirection, nzGraphData, nzGraphLayoutConfig } = changes;
    if (nzGraphLayoutConfig) {
      this.layoutSetting = this.mergeConfig(nzGraphLayoutConfig.currentValue);
    }

    if (nzGraphData) {
      if (this.dataSource !== this.nzGraphData) {
        this._switchDataSource(this.nzGraphData);
      }
    }

    if ((nzAutoFit && !nzAutoFit.firstChange) || (nzRankDirection && !nzRankDirection.firstChange)) {
      // Render graph
      if (this.dataSource!.dataSource) {
        this.drawGraph(this.dataSource!.dataSource, {
          rankDirection: this.nzRankDirection,
          expanded: this.dataSource!.expansionModel.selected || []
        }).then(() => {
          this.cdr.markForCheck();
        });
      }
    }

    this.cdr.markForCheck();
  }

  ngAfterContentChecked(): void {
    if (this.dataSource && !this._dataSubscription) {
      this.observeRenderChanges();
    }
  }

  /**
   * Move graph to center and scale automatically
   */
  fitCenter(): void {
    const { x, y, k } = calculateTransform(
      this.elementRef.nativeElement.querySelector('svg'),
      this.elementRef.nativeElement.querySelector('svg > g')
    )!;
    if (k) {
      this.zoom = k;
      this.transformStyle = `translate(${x}, ${y})scale(${k})`;
    }
    this.cdr.markForCheck();
  }

  /**
   * re-Draw graph
   *
   * @param data
   * @param options
   * @param needResize
   */
  drawGraph(data: NzGraphDataDef, options: NzGraphOption, needResize: boolean = false): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve();
    }

    const animationEnabled = !this.noAnimation?.nzNoAnimation?.();

    return new Promise(resolve => {
      this.requestId = requestAnimationFrame(() => {
        // TODO: Need better performance
        this.renderInfo = this.buildGraphInfo(data, options);
        this.cdr.markForCheck();
        this.requestId = requestAnimationFrame(async () => {
          await this.drawNodes(animationEnabled);
          // Update element
          this.cdr.markForCheck();

          if (needResize) {
            await this.resizeNodeSize();
            await this.drawGraph(this.dataSource!.dataSource!, options, false);
          } else {
            this.graphRenderedSubject$.next();
            this.nzGraphRendered.emit(this);
          }

          resolve();
        });
      });
    });
  }

  /**
   * Redraw all nodes
   *
   * @param animate
   */
  async drawNodes(animate: boolean = true): Promise<void> {
    if (animate) {
      return this.makeNodesAnimation();
    }

    this.listOfNodeComponent.forEach(node => node.makeNoAnimation());
  }

  private resizeNodeSize(): Promise<void> {
    return new Promise(resolve => {
      const dataSource: NzGraphDataDef = this.dataSource!.dataSource!;
      let scale = this.nzGraphZoom?.nzZoom || this.zoom || 1;
      this.listOfNodeElement.forEach(nodeEle => {
        const contentEle = nodeEle.nativeElement;
        if (contentEle) {
          let width: number;
          let height: number;
          // Check if foreignObject is set
          const clientRect = contentEle.querySelector('foreignObject > :first-child')?.getBoundingClientRect();
          if (clientRect) {
            width = clientRect.width;
            height = clientRect.height;
          } else {
            const bBoxRect = contentEle.getBBox();
            width = bBoxRect.width;
            height = bBoxRect.height;
            // getBBox will return actual value
            scale = 1;
          }
          // Element id type is string
          const node = dataSource.nodes.find(n => `${n.id}` === nodeEle.nativeElement.id);
          if (node && width && height) {
            node.height = height / scale;
            node.width = width / scale;
          }
        }
      });
      resolve();
    });
  }

  /**
   * Switch to the provided data source by resetting the data and unsubscribing from the current
   * render change subscription if one exists. If the data source is null, interpret this by
   * clearing the node outlet. Otherwise, start listening for new data.
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
      this._dataSubscription = dataStream.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
        graphOptions = {
          rankDirection: this.nzRankDirection,
          expanded: this.nzGraphData.expansionModel.selected
        };
        this.drawGraph(data, graphOptions, this.nzAutoSize).then(() => {
          this.cdr.detectChanges();
        });
      });
    } else {
      throw Error(`A valid data source must be provided.`);
    }
  }

  /**
   * Get renderInfo and prepare some data
   *
   * @param data
   * @param options
   * @private
   */
  private buildGraphInfo(data: NzGraphDataDef, options: NzGraphOption): NzGraphGroupNode {
    this.parseInfo(data);
    const renderInfo = buildGraph(data, options, this.layoutSetting) as NzGraphGroupNode;
    const dig = (nodes: Array<NzGraphNode | NzGraphGroupNode>): void => {
      nodes.forEach(node => {
        const { x, y } = node;
        node.xOffset = x;
        node.yOffset = y;
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

  /**
   * Play with animation
   */
  private async makeNodesAnimation(): Promise<void> {
    await Promise.all(this.listOfNodeComponent.map(node => node.makeAnimation()));
  }

  private parseInfo(data: NzGraphDataDef): void {
    data.nodes.forEach(n => {
      this.mapOfNodeAttr[n.id] = n;
    });
    data.edges.forEach(e => {
      this.mapOfEdgeAttr[`${e.v}-${e.w}`] = e;
    });
  }

  /**
   * Merge config with user inputs
   *
   * @param config
   * @private
   */
  private mergeConfig(config: NzGraphLayoutConfig): NzLayoutSetting {
    const graphMeta = config?.layout || {};
    const subSceneMeta = config?.subScene || {};
    const defaultNodeMeta = config?.defaultNode || {};
    const defaultCompoundNodeMeta = config?.defaultCompoundNode || {};
    const bridge = NZ_GRAPH_LAYOUT_SETTING.nodeSize.bridge;

    const graph: NzLayoutSetting['graph'] = { meta: { ...NZ_GRAPH_LAYOUT_SETTING.graph.meta, ...graphMeta } };
    const subScene: NzLayoutSetting['subScene'] = {
      meta: { ...NZ_GRAPH_LAYOUT_SETTING.subScene.meta, ...subSceneMeta }
    };
    const nodeSize: NzLayoutSetting['nodeSize'] = {
      meta: { ...NZ_GRAPH_LAYOUT_SETTING.nodeSize.meta, ...defaultCompoundNodeMeta },
      node: { ...NZ_GRAPH_LAYOUT_SETTING.nodeSize.node, ...defaultNodeMeta },
      bridge
    };

    return { graph, subScene, nodeSize };
  }
}
