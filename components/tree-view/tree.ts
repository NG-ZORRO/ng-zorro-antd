/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { DataSource } from '@angular/cdk/collections';
import { CdkTree, TreeControl } from '@angular/cdk/tree';
import {
  Component,
  Input,
  IterableDiffer,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  booleanAttribute,
  inject,
  DestroyRef,
  ChangeDetectorRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject } from 'rxjs';

import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  template: ''
})
export class NzTreeView<T> extends CdkTree<T> implements OnInit, OnDestroy {
  noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });
  protected destroyRef = inject(DestroyRef);
  protected directionality = inject(Directionality);
  protected cdr = inject(ChangeDetectorRef);

  dir: Direction = 'ltr';
  _dataSourceChanged = new Subject<void>();

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('nzTreeControl') override treeControl?: TreeControl<T, NzSafeAny> = undefined;
  @Input('nzDataSource')
  override get dataSource(): DataSource<T> | Observable<T[]> | T[] {
    return super.dataSource;
  }
  override set dataSource(dataSource: DataSource<T> | Observable<T[]> | T[]) {
    super.dataSource = dataSource;
  }
  @Input({ transform: booleanAttribute }) nzDirectoryTree = false;
  @Input({ transform: booleanAttribute }) nzBlockNode = false;

  override ngOnInit(): void {
    super.ngOnInit();

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
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
