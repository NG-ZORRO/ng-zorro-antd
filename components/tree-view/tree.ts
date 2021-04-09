/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { DataSource } from '@angular/cdk/collections';
import { CdkTree, TreeControl } from '@angular/cdk/tree';
import {
  ChangeDetectorRef,
  Component,
  Host,
  Input,
  IterableDiffer,
  IterableDiffers,
  OnDestroy,
  OnInit,
  Optional,
  ViewContainerRef
} from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';

import { Observable, Subject } from 'rxjs';

import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { takeUntil } from 'rxjs/operators';

@Component({ template: '' })
// tslint:disable-next-line: component-class-suffix
export class NzTreeView<T> extends CdkTree<T> implements OnInit, OnDestroy {
  static ngAcceptInputType_nzDirectoryTree: BooleanInput;
  static ngAcceptInputType_nzBlockNode: BooleanInput;

  private destroy$ = new Subject();
  dir: Direction = 'ltr';
  _dataSourceChanged = new Subject<void>();
  @Input('nzTreeControl') treeControl!: TreeControl<T, NzSafeAny>;
  @Input('nzDataSource')
  get dataSource(): DataSource<T> | Observable<T[]> | T[] {
    return super.dataSource;
  }
  set dataSource(dataSource: DataSource<T> | Observable<T[]> | T[]) {
    super.dataSource = dataSource;
  }
  @Input() @InputBoolean() nzDirectoryTree = false;
  @Input() @InputBoolean() nzBlockNode = false;

  constructor(
    protected differs: IterableDiffers,
    protected changeDetectorRef: ChangeDetectorRef,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective,
    @Optional() private directionality?: Directionality
  ) {
    super(differs, changeDetectorRef);
  }

  ngOnInit(): void {
    super.ngOnInit();

    if (this.directionality) {
      this.dir = this.directionality.value;
      this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
        this.dir = direction;
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.destroy$.next();
    this.destroy$.complete();
  }

  renderNodeChanges(data: T[] | ReadonlyArray<T>, dataDiffer?: IterableDiffer<T>, viewContainer?: ViewContainerRef, parentData?: T): void {
    super.renderNodeChanges(data, dataDiffer, viewContainer, parentData);
    this._dataSourceChanged.next();
  }
}
