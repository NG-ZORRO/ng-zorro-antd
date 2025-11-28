import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTreeView, NzTreeViewComponent, NzTreeViewModule } from 'ng-zorro-antd/tree-view';

interface FlatNode {
  expandable: boolean;
  id: number;
  label: string;
  level: number;
  loading?: boolean;
}

const TREE_DATA: FlatNode[] = [
  {
    id: 0,
    label: 'Expand to load',
    level: 0,
    expandable: true
  },
  {
    id: 1,
    label: 'Expand to load',
    level: 0,
    expandable: true
  }
];

function getChildren(node: FlatNode): Observable<FlatNode[]> {
  return of([
    {
      id: Date.now(),
      label: `Child Node (level-${node.level + 1})`,
      level: node.level + 1,
      expandable: true
    },
    {
      id: Date.now(),
      label: `Child Node (level-${node.level + 1})`,
      level: node.level + 1,
      expandable: true
    },
    {
      id: Date.now(),
      label: `Leaf Node (level-${node.level + 1})`,
      level: node.level + 1,
      expandable: false
    }
  ]).pipe(delay(500));
}

class DynamicDatasource implements DataSource<FlatNode> {
  private flattenedData: BehaviorSubject<FlatNode[]>;
  private childrenLoadedSet = new Set<FlatNode>();

  constructor(
    private tree: NzTreeView<FlatNode>,
    initData: FlatNode[]
  ) {
    this.flattenedData = new BehaviorSubject<FlatNode[]>(initData);
    tree.dataNodes = initData;
  }

  connect(collectionViewer: CollectionViewer): Observable<FlatNode[]> {
    const changes = [
      collectionViewer.viewChange,
      this.tree._getExpansionModel().changed.pipe(tap(change => this.handleExpansionChange(change))),
      this.flattenedData.asObservable()
    ];
    return merge(...changes).pipe(map(() => this.flattenedData.value));
  }

  handleExpansionChange(change: SelectionChange<FlatNode>): void {
    if (change.added) {
      change.added.forEach(node => this.loadChildren(node));
    }
  }

  loadChildren(node: FlatNode): void {
    if (this.childrenLoadedSet.has(node)) {
      return;
    }
    node.loading = true;
    getChildren(node).subscribe(children => {
      node.loading = false;
      const flattenedData = this.flattenedData.getValue();
      const index = flattenedData.indexOf(node);
      if (index !== -1) {
        flattenedData.splice(index + 1, 0, ...children);
        this.childrenLoadedSet.add(node);
      }
      this.flattenedData.next(flattenedData);
      // save flattened data into tree instance
      this.tree.dataNodes = flattenedData;
    });
  }

  disconnect(): void {
    this.flattenedData.complete();
  }
}

@Component({
  selector: 'nz-demo-tree-view-dynamic',
  imports: [NzIconModule, NzTreeViewModule],
  template: `
    <nz-tree-view [nzDataSource]="dataSource" [nzLevelAccessor]="levelAccessor">
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodePadding [nzExpandable]="false">
        {{ node.label }}
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasChild" nzTreeNodePadding [nzExpandable]="true">
        @if (!node.loading) {
          <nz-tree-node-toggle>
            <nz-icon nzType="caret-down" nzTreeNodeToggleRotateIcon />
          </nz-tree-node-toggle>
        } @else {
          <nz-tree-node-toggle nzTreeNodeNoopToggle>
            <nz-icon nzType="loading" nzTreeNodeToggleActiveIcon />
          </nz-tree-node-toggle>
        }
        {{ node.label }}
      </nz-tree-node>
    </nz-tree-view>
  `
})
export class NzDemoTreeViewDynamicComponent implements OnInit {
  @ViewChild(NzTreeViewComponent, { static: true }) tree!: NzTreeViewComponent<FlatNode>;

  readonly levelAccessor = (dataNode: FlatNode): number => dataNode.level;

  readonly hasChild = (_: number, node: FlatNode): boolean => node.expandable;

  dataSource!: DynamicDatasource;

  ngOnInit(): void {
    this.dataSource = new DynamicDatasource(this.tree, TREE_DATA);
  }
}
