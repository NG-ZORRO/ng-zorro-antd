/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';

import { of, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { InputBoolean, NzUpdateHostClassService } from 'ng-zorro-antd/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';

import {
  TransferCanMove,
  TransferChange,
  TransferDirection,
  TransferItem,
  TransferSearchChange,
  TransferSelectChange
} from './interface';
import { NzTransferListComponent } from './nz-transfer-list.component';

@Component({
  selector: 'nz-transfer',
  exportAs: 'nzTransfer',
  preserveWhitespaces: false,
  templateUrl: './nz-transfer.component.html',
  host: {
    '[class.ant-transfer-disabled]': 'nzDisabled'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NzUpdateHostClassService]
})
export class NzTransferComponent implements OnInit, OnChanges, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  @ViewChildren(NzTransferListComponent)
  private lists!: QueryList<NzTransferListComponent>;
  // tslint:disable-next-line:no-any
  locale: any = {};

  leftFilter = '';
  rightFilter = '';

  // #region fields

  @Input() @InputBoolean() nzDisabled = false;
  @Input() nzDataSource: TransferItem[] = [];
  @Input() nzTitles: string[] = ['', ''];
  @Input() nzOperations: string[] = [];
  @Input() nzListStyle: object;
  @Input() @InputBoolean() nzShowSelectAll = true;
  @Input() nzItemUnit: string;
  @Input() nzItemsUnit: string;
  @Input() nzCanMove: (arg: TransferCanMove) => Observable<TransferItem[]> = (arg: TransferCanMove) => of(arg.list);
  @Input() nzRenderList: Array<TemplateRef<void> | null> = [null, null];
  @Input() nzRender: TemplateRef<void>;
  @Input() nzFooter: TemplateRef<void>;
  @Input() @InputBoolean() nzShowSearch = false;
  @Input() nzFilterOption: (inputValue: string, item: TransferItem) => boolean;
  @Input() nzSearchPlaceholder: string;
  @Input() nzNotFoundContent: string;

  // events
  @Output() readonly nzChange = new EventEmitter<TransferChange>();
  @Output() readonly nzSearchChange = new EventEmitter<TransferSearchChange>();
  @Output() readonly nzSelectChange = new EventEmitter<TransferSelectChange>();

  // #endregion

  // #region process data

  // left
  leftDataSource: TransferItem[] = [];

  // right
  rightDataSource: TransferItem[] = [];

  private splitDataSource(): void {
    this.leftDataSource = [];
    this.rightDataSource = [];
    this.nzDataSource.forEach(record => {
      if (record.direction === 'right') {
        record.direction = 'right';
        this.rightDataSource.push(record);
      } else {
        record.direction = 'left';
        this.leftDataSource.push(record);
      }
    });
  }

  private getCheckedData(direction: string): TransferItem[] {
    return this[direction === 'left' ? 'leftDataSource' : 'rightDataSource'].filter(w => w.checked);
  }

  handleLeftSelectAll = (checked: boolean) => this.handleSelect('left', checked);
  handleRightSelectAll = (checked: boolean) => this.handleSelect('right', checked);

  handleLeftSelect = (item: TransferItem) => this.handleSelect('left', !!item.checked, item);
  handleRightSelect = (item: TransferItem) => this.handleSelect('right', !!item.checked, item);

  handleSelect(direction: TransferDirection, checked: boolean, item?: TransferItem): void {
    const list = this.getCheckedData(direction);
    this.updateOperationStatus(direction, list.length);
    this.nzSelectChange.emit({ direction, checked, list, item });
  }

  handleFilterChange(ret: { direction: TransferDirection; value: string }): void {
    this.nzSearchChange.emit(ret);
  }

  // #endregion

  // #region operation

  leftActive = false;
  rightActive = false;

  private updateOperationStatus(direction: string, count?: number): void {
    this[direction === 'right' ? 'leftActive' : 'rightActive'] =
      (typeof count === 'undefined' ? this.getCheckedData(direction).filter(w => !w.disabled).length : count) > 0;
  }

  moveToLeft = () => this.moveTo('left');
  moveToRight = () => this.moveTo('right');

  moveTo(direction: TransferDirection): void {
    const oppositeDirection = direction === 'left' ? 'right' : 'left';
    this.updateOperationStatus(oppositeDirection, 0);
    const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
    const moveList = datasource.filter(item => item.checked === true && !item.disabled);
    this.nzCanMove({ direction, list: moveList }).subscribe(
      newMoveList => this.truthMoveTo(direction, newMoveList.filter(i => !!i)),
      () => moveList.forEach(i => (i.checked = false))
    );
  }

  private truthMoveTo(direction: TransferDirection, list: TransferItem[]): void {
    const oppositeDirection = direction === 'left' ? 'right' : 'left';
    const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
    const targetDatasource = direction === 'left' ? this.leftDataSource : this.rightDataSource;
    for (const item of list) {
      item.checked = false;
      item.hide = false;
      item.direction = direction;
      datasource.splice(datasource.indexOf(item), 1);
    }
    targetDatasource.splice(0, 0, ...list);
    this.updateOperationStatus(oppositeDirection);
    this.nzChange.emit({
      from: oppositeDirection,
      to: direction,
      list
    });
    this.markForCheckAllList();
  }

  // #endregion

  constructor(
    private cdr: ChangeDetectorRef,
    private i18n: NzI18nService,
    private nzUpdateHostClassService: NzUpdateHostClassService,
    private elementRef: ElementRef,
    renderer: Renderer2
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-transfer');
  }

  private setClassMap(): void {
    const prefixCls = 'ant-transfer';
    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, {
      [`${prefixCls}-disabled`]: this.nzDisabled,
      [`${prefixCls}-customize-list`]: this.nzRenderList.some(i => !!i)
    });
  }

  private markForCheckAllList(): void {
    if (!this.lists) {
      return;
    }
    this.lists.forEach(i => i.markForCheck());
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Transfer');
      this.markForCheckAllList();
    });
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setClassMap();
    if (changes.nzDataSource || changes.nzTargetKeys) {
      this.splitDataSource();
      this.updateOperationStatus('left');
      this.updateOperationStatus('right');
      this.cdr.detectChanges();
      this.markForCheckAllList();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
