import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { auditTime, map } from 'rxjs/operators';

import { NzHighlightPipe } from 'ng-zorro-antd/core/highlight';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  NzTreeFlattener,
  NzTreeViewComponent,
  NzTreeViewFlatDataSource,
  NzTreeViewModule
} from 'ng-zorro-antd/tree-view';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: '0-0',
    children: [{ name: '0-0-0' }, { name: '0-0-1' }, { name: '0-0-2' }]
  },
  {
    name: '0-1',
    children: [
      {
        name: '0-1-0',
        children: [{ name: '0-1-0-0' }, { name: '0-1-0-1' }]
      },
      {
        name: '0-1-1',
        children: [{ name: '0-1-1-0' }, { name: '0-1-1-1' }]
      }
    ]
  }
];

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

class FilteredTreeResult {
  constructor(
    public treeData: TreeNode[],
    public needsToExpanded: TreeNode[] = []
  ) {}
}

/**
 * From https://stackoverflow.com/a/45290208/6851836
 */
function filterTreeData(data: TreeNode[], value: string): FilteredTreeResult {
  const needsToExpanded = new Set<TreeNode>();
  const _filter = (node: TreeNode, result: TreeNode[]): TreeNode[] => {
    if (node.name.search(value) !== -1) {
      result.push(node);
      return result;
    }
    if (Array.isArray(node.children)) {
      const nodes = node.children.reduce((a, b) => _filter(b, a), [] as TreeNode[]);
      if (nodes.length) {
        const parentNode = { ...node, children: nodes };
        needsToExpanded.add(parentNode);
        result.push(parentNode);
      }
    }
    return result;
  };
  const treeData = data.reduce((a, b) => _filter(b, a), [] as TreeNode[]);
  return new FilteredTreeResult(treeData, [...needsToExpanded]);
}

@Component({
  selector: 'nz-demo-tree-view-search',
  imports: [FormsModule, NzInputModule, NzIconModule, NzTreeViewModule, NzHighlightPipe],
  template: `
    <nz-input-wrapper>
      <input type="text" nz-input placeholder="Search" ngModel (ngModelChange)="searchValue$.next($event)" />
      <nz-icon nzInputSuffix nzType="search" />
    </nz-input-wrapper>

    <nz-tree-view [nzDataSource]="dataSource" [nzLevelAccessor]="levelAccessor">
      <nz-tree-node *nzTreeNodeDef="let node" nzTreeNodePadding [nzExpandable]="false">
        <nz-tree-node-toggle nzTreeNodeNoopToggle />
        <span [innerHTML]="node.name | nzHighlight: searchValue : 'i' : 'highlight'"></span>
      </nz-tree-node>

      <nz-tree-node *nzTreeNodeDef="let node; when: hasChild" nzTreeNodePadding [nzExpandable]="true">
        <nz-tree-node-toggle>
          <nz-icon nzType="caret-down" nzTreeNodeToggleRotateIcon />
        </nz-tree-node-toggle>
        <span [innerHTML]="node.name | nzHighlight: searchValue : 'i' : 'highlight'"></span>
      </nz-tree-node>
    </nz-tree-view>
  `,
  styles: `
    nz-input-wrapper {
      margin-bottom: 8px;
    }

    ::ng-deep .highlight {
      color: #f50;
    }
  `
})
export class NzDemoTreeViewSearchComponent implements OnInit {
  @ViewChild(NzTreeViewComponent, { static: true }) tree!: NzTreeViewComponent<FlatNode>;

  readonly levelAccessor = (dataNode: FlatNode): number => dataNode.level;

  readonly hasChild = (_: number, node: FlatNode): boolean => node.expandable;

  flatNodeMap = new Map<FlatNode, TreeNode>();
  nestedNodeMap = new Map<TreeNode, FlatNode>();
  expandedNodes: TreeNode[] = [];
  searchValue = '';
  originData$ = new BehaviorSubject(TREE_DATA);
  searchValue$ = new BehaviorSubject<string>('');

  transformer = (node: TreeNode, level: number): FlatNode => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.name === node.name
        ? existingNode
        : {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level
          };
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  treeFlattener = new NzTreeFlattener<TreeNode, FlatNode>(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  filteredData$ = combineLatest([
    this.originData$,
    this.searchValue$.pipe(
      auditTime(300),
      map(value => (this.searchValue = value))
    )
  ]).pipe(map(([data, value]) => (value ? filterTreeData(data, value) : new FilteredTreeResult(data))));

  dataSource!: NzTreeViewFlatDataSource<TreeNode, FlatNode>;

  ngOnInit(): void {
    this.dataSource = new NzTreeViewFlatDataSource(this.tree, this.treeFlattener);

    this.filteredData$.subscribe(result => {
      this.dataSource.setData(result.treeData);

      const hasSearchValue = !!this.searchValue;
      // trans nested nodes to flat nodes
      const needsToExpanded = result.needsToExpanded.map(node => this.nestedNodeMap.get(node)!);
      const expandedNodes = this.expandedNodes.map(node => this.nestedNodeMap.get(node)!);
      // expand nodes
      if (hasSearchValue) {
        if (this.expandedNodes.length === 0) {
          this.expandedNodes = this.tree._getExpansionModel().selected;
          this.tree._getExpansionModel().clear();
        }
        this.tree._getExpansionModel().select(...needsToExpanded);
      } else {
        if (this.expandedNodes.length) {
          this.tree._getExpansionModel().clear();
          this.tree._getExpansionModel().select(...expandedNodes);
          this.expandedNodes = [];
        }
      }
    });
  }
}
