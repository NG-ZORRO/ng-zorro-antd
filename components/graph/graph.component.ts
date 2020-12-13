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
  Host,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { buildGraph } from '@nx-component/hierarchy-graph';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { cancelRequestAnimationFrame } from 'ng-zorro-antd/core/polyfill';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { forkJoin, Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { finalize, skip, take, takeUntil } from 'rxjs/operators';
import { calculateTransform } from './core/utils';
import { NzGraphData } from './data-source/graph-data-source';
import { NzGraphEdgeDirective } from './graph-edge.directive';
import { NzGraphNodeComponent } from './graph-node.component';
import { NzGraphNodeDirective } from './graph-node.directive';
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
    <svg width="100%" height="100%">
      <svg:defs nz-graph-defs></svg:defs>
      <svg:g [attr.transform]="transformStyle">
        <ng-container
          [ngTemplateOutlet]="groupTemplate"
          [ngTemplateOutletContext]="{ renderNode: renderInfo, type: 'root' }"
        ></ng-container>
      </svg:g>
    </svg>

    <ng-template #groupTemplate let-renderNode="renderNode" let-type="type">
      <svg:g [attr.transform]="type === 'sub' ? subGraphTransform(renderNode) : null">
        <svg:g class="core" [attr.transform]="coreTransform(renderNode)">
          <svg:g class="nz-graph-edges">
            <ng-container *ngFor="let edge of renderNode.edges; trackBy: edgeTrackByFun">
              <g class="nz-graph-edge" nz-graph-edge [edge]="edge" [customTemplate]="customGraphEdgeTemplate"></g>
            </ng-container>
          </svg:g>

          <svg:g class="nz-graph-nodes">
            <ng-container *ngFor="let node of typedNodes(renderNode.nodes); trackBy: nodeTrackByFun">
              <g
                *ngIf="node.type !== 2"
                class="nz-graph-node"
                nz-graph-node
                [node]="node"
                [customTemplate]="customGraphNodeTemplate"
                (nodeClick)="clickNode($event)"
              ></g>

              <ng-container
                *ngIf="node.expanded"
                [ngTemplateOutlet]="groupTemplate"
                [ngTemplateOutletContext]="{ renderNode: node, type: 'sub' }"
              ></ng-container>
            </ng-container>
          </svg:g>
        </svg:g>
      </svg:g>
    </ng-template>
  `,
  host: {
    '[class.nz-graph]': 'true',
    '[class.nz-graph-auto-size]': 'nzAutoSize'
  }
})
export class NzGraphComponent implements OnInit, OnChanges, AfterViewInit, AfterContentChecked, OnDestroy {
  static ngAcceptInputType_nzAutoSize: BooleanInput;

  @ViewChildren(NzGraphNodeComponent, { read: ElementRef }) listOfNodeElement!: QueryList<ElementRef>;
  @ViewChildren(NzGraphNodeComponent) listOfNodeComponent!: QueryList<NzGraphNodeComponent>;

  @ContentChild(NzGraphNodeDirective, { static: true, read: TemplateRef }) customGraphNodeTemplate?: TemplateRef<{
    $implicit: NzGraphNode | NzGraphGroupNode;
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
  @Input() nzGraphLayoutSettings?: NzGraphLayoutSetting;
  @Input() @InputBoolean() nzAutoSize = false;

  @Output() readonly nzGraphInitialized = new EventEmitter<NzGraphComponent>();
  @Output() readonly nzGraphRendered = new EventEmitter<NzGraphComponent>();
  @Output() readonly nzNodeClick: EventEmitter<NzGraphNode | NzGraphGroupNode> = new EventEmitter();

  requestId: number = -1;
  transformStyle = '';
  graphRenderedSubject$ = new ReplaySubject<void>(1);
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
    return `translate(0, ${node.parentNodeName ? node.labelHeight : 0})`;
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private elementRef: ElementRef,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {}

  ngOnInit(): void {
    this.graphRenderedSubject$.pipe(skip(this.nzAutoSize ? 1 : 0), take(1), takeUntil(this.destroy$)).subscribe(() => {
      this.fitCenter();
      this.nzGraphInitialized.emit(this);
    });
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
        this.drawGraph(this.dataSource!.dataSource, {
          rankDirection: this.nzRankDirection,
          expanded: this.dataSource!.expansionModel.selected || []
        }).then();
      }
    }

    this.cdr.markForCheck();
  }

  ngAfterViewInit(): void {}

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
    cancelRequestAnimationFrame(this.requestId);
  }

  /**
   * Emit event
   */
  clickNode(node: NzGraphNode | NzGraphGroupNode): void {
    this.nzNodeClick.emit(node);
  }

  /**
   * Move graph to center and scale automatically
   */
  fitCenter(): void {
    const { x, y, k } = calculateTransform(
      this.elementRef.nativeElement.querySelector('svg'),
      this.elementRef.nativeElement.querySelector('svg > g')
    )!;
    this.transformStyle = `translate(${x}, ${y})scale(${k})`;
    this.cdr.markForCheck();
  }

  /**
   * re-Draw graph
   * @param data
   * @param options
   * @param needResize
   */
  drawGraph(data: NzGraphDataDef, options: NzGraphOption, needResize: boolean = false): Promise<void> {
    return new Promise(resolve => {
      this.requestId = requestAnimationFrame(() => {
        const renderInfo = this.buildGraphInfo(data, options);
        // TODO
        // Need better performance
        this.renderInfo = renderInfo;
        this.cdr.markForCheck();
        this.drawNodes(!this.noAnimation?.nzNoAnimation).then(() => {
          // Update element
          this.cdr.markForCheck();
          this.graphRenderedSubject$.next();
          this.nzGraphRendered.emit(this);
        });

        if (needResize) {
          this.resizeNodeSize().then(() => {
            const dataSource: NzGraphDataDef = this.dataSource!.dataSource!;
            return this.drawGraph(dataSource, options, false);
          });
        } else {
          resolve();
        }
      });
      this.cdr.markForCheck();
    });
  }

  /**
   * Redraw all nodes
   * @param animate
   */
  drawNodes(animate: boolean = true): Promise<void> {
    return new Promise(resolve => {
      this.ngZone.onStable.pipe(take(1)).subscribe(() => {
        if (animate) {
          this.makeNodesAnimation().subscribe(() => {
            resolve();
          });
        } else {
          this.listOfNodeComponent.map(node => {
            node.makeNoAnimation();
          });
          resolve();
        }
      });
    });
  }

  private resizeNodeSize(): Promise<void> {
    return new Promise(resolve => {
      this.ngZone.onStable.pipe(take(1)).subscribe(() => {
        const dataSource: NzGraphDataDef = this.dataSource!.dataSource!;
        let scale = this.getScale();

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
    });
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
        this.drawGraph(data, graphOptions, this.nzAutoSize).then(() => {
          this.cdr.detectChanges();
        });
      });
    } else {
      throw Error(`A valid data source must be provided.`);
    }
  }

  // TODO
  // A better way?
  private getScale(): number {
    const transform = (this.elementRef.nativeElement.querySelector('svg > g') as SVGGElement)?.getAttribute('transform') || '';
    // Get current scale
    const regex = /scale\(([0-9\.]+)\)/g;
    const match = regex.exec(transform);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }
    return 1;
  }

  /**
   * Get renderInfo and prepare some data
   * @param data
   * @param options
   * @private
   */
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

  /**
   * Play with animation
   * @private
   */
  private makeNodesAnimation(): Observable<void> {
    return forkJoin(...this.listOfNodeComponent.map(node => node.makeAnimation())).pipe(
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
}
