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
  Input,
  IterableDiffer,
  IterableDiffers,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  booleanAttribute,
  inject
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  template: ''
})
/* eslint-disable @angular-eslint/no-input-rename, @angular-eslint/component-class-suffix */
export class NzTreeView<T, K = T> extends CdkTree<T, K> implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  dir: Direction = 'ltr';
  _dataSourceChanged = new Subject<void>();
  dataNodes: T[] = [];
  /**
   * @deprecated use `nzLevelAccessor` or `nzChildrenAccessor` instead
   */
  @Input('nzTreeControl') override treeControl?: TreeControl<T, NzSafeAny> = undefined;
  @Input('nzLevelAccessor') override levelAccessor?: (dataNode: T) => number = undefined;
  @Input('nzChildrenAccessor') override childrenAccessor?: (dataNode: T) => T[] = undefined;
  @Input('nzDataSource')
  override get dataSource(): DataSource<T> | Observable<T[]> | T[] {
    return super.dataSource;
  }
  override set dataSource(dataSource: DataSource<T> | Observable<T[]> | T[]) {
    super.dataSource = dataSource;
  }
  @Input({ transform: booleanAttribute }) nzDirectoryTree = false;
  @Input({ transform: booleanAttribute }) nzBlockNode = false;

  noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });

  constructor(
    protected differs: IterableDiffers,
    protected changeDetectorRef: ChangeDetectorRef,
    private directionality: Directionality
  ) {
    super(differs, changeDetectorRef, directionality);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.changeDetectorRef.detectChanges();
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  override renderNodeChanges(
    data: T[] | readonly T[],
    dataDiffer?: IterableDiffer<T>,
    viewContainer?: ViewContainerRef,
    parentData?: T
  ): void {
    super.renderNodeChanges(data, dataDiffer, viewContainer, parentData);
    this._dataSourceChanged.next();
  }
}
