/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChildren,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, of as observableOf, of } from 'rxjs';
import { distinctUntilChanged, map, withLatestFrom } from 'rxjs/operators';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormNoStatusService, NzFormStatusService } from 'ng-zorro-antd/core/form';
import { NgClassInterface, NgStyleInterface, NzSafeAny, NzStatus, NzValidateStatus } from 'ng-zorro-antd/core/types';
import { getStatusClassNames, toArray } from 'ng-zorro-antd/core/util';
import { NzI18nService, NzTransferI18nInterface } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';

import {
  TransferCanMove,
  TransferChange,
  TransferDirection,
  TransferItem,
  TransferSearchChange,
  TransferSelectChange
} from './interface';
import { NzTransferListComponent } from './transfer-list.component';

@Component({
  selector: 'nz-transfer',
  exportAs: 'nzTransfer',
  template: `
    <nz-transfer-list
      class="ant-transfer-list"
      [style]="nzListStyle"
      data-direction="left"
      direction="left"
      [titleText]="nzTitles[0]"
      [showSelectAll]="nzShowSelectAll"
      [dataSource]="leftDataSource"
      [filter]="leftFilter"
      [filterOption]="nzFilterOption"
      (filterChange)="handleFilterChange($event)"
      [renderList]="nzRenderList && nzRenderList[0]"
      [render]="nzRender"
      [disabled]="nzDisabled"
      [showSearch]="nzShowSearch"
      [searchPlaceholder]="nzSearchPlaceholder || locale?.searchPlaceholder"
      [notFoundContent]="nzNotFoundContent"
      [itemUnit]="nzItemUnit || locale?.itemUnit"
      [itemsUnit]="nzItemsUnit || locale?.itemsUnit"
      [footer]="nzFooter"
      (handleSelect)="handleLeftSelect($event)"
      (handleSelectAll)="handleLeftSelectAll($event)"
    ></nz-transfer-list>
    @if (dir !== 'rtl') {
      <div class="ant-transfer-operation">
        @if (!nzOneWay) {
          <button
            nz-button
            type="button"
            (click)="moveToLeft()"
            [disabled]="nzDisabled || !leftActive"
            [nzType]="'primary'"
            [nzSize]="'small'"
          >
            <nz-icon nzType="left" />
            @if (nzOperations[1]) {
              <span>{{ nzOperations[1] }}</span>
            }
          </button>
        }
        <button
          nz-button
          type="button"
          (click)="moveToRight()"
          [disabled]="nzDisabled || !rightActive"
          [nzType]="'primary'"
          [nzSize]="'small'"
        >
          <nz-icon nzType="right" />
          @if (nzOperations[0]) {
            <span>{{ nzOperations[0] }}</span>
          }
        </button>
      </div>
    } @else {
      <div class="ant-transfer-operation">
        <button
          nz-button
          type="button"
          (click)="moveToRight()"
          [disabled]="nzDisabled || !rightActive"
          [nzType]="'primary'"
          [nzSize]="'small'"
        >
          <nz-icon nzType="left" />
          @if (nzOperations[0]) {
            <span>{{ nzOperations[0] }}</span>
          }
        </button>
        @if (!nzOneWay) {
          <button
            nz-button
            type="button"
            (click)="moveToLeft()"
            [disabled]="nzDisabled || !leftActive"
            [nzType]="'primary'"
            [nzSize]="'small'"
          >
            <nz-icon nzType="right" />
            @if (nzOperations[1]) {
              <span>{{ nzOperations[1] }}</span>
            }
          </button>
        }
      </div>
    }
    <nz-transfer-list
      class="ant-transfer-list"
      [style]="nzListStyle"
      data-direction="right"
      direction="right"
      [titleText]="nzTitles[1]"
      [showSelectAll]="nzShowSelectAll"
      [dataSource]="rightDataSource"
      [filter]="rightFilter"
      [filterOption]="nzFilterOption"
      (filterChange)="handleFilterChange($event)"
      [renderList]="nzRenderList && nzRenderList[1]"
      [render]="nzRender"
      [disabled]="nzDisabled"
      [showSearch]="nzShowSearch"
      [searchPlaceholder]="nzSearchPlaceholder || locale?.searchPlaceholder"
      [notFoundContent]="nzNotFoundContent"
      [itemUnit]="nzItemUnit || locale?.itemUnit"
      [itemsUnit]="nzItemsUnit || locale?.itemsUnit"
      [footer]="nzFooter"
      [oneWay]="nzOneWay"
      (moveToLeft)="moveToLeft()"
      (handleSelect)="handleRightSelect($event)"
      (handleSelectAll)="handleRightSelectAll($event)"
    ></nz-transfer-list>
  `,
  host: {
    class: 'ant-transfer',
    '[class.ant-transfer-rtl]': `dir === 'rtl'`,
    '[class.ant-transfer-disabled]': `nzDisabled`,
    '[class.ant-transfer-customize-list]': `nzRenderList`
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzTransferListComponent, NzIconModule, NzButtonModule]
})
export class NzTransferComponent implements OnInit, OnChanges {
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  private i18n = inject(NzI18nService);
  private elementRef = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private directionality = inject(Directionality);
  private nzFormStatusService = inject(NzFormStatusService, { optional: true });
  private nzFormNoStatusService = inject(NzFormNoStatusService, { optional: true });

  @ViewChildren(NzTransferListComponent) lists!: QueryList<NzTransferListComponent>;
  locale!: NzTransferI18nInterface;

  leftFilter = '';
  rightFilter = '';
  dir: Direction = 'ltr';

  // status
  prefixCls: string = 'ant-transfer';
  statusCls: NgClassInterface = {};
  hasFeedback: boolean = false;

  // #region fields

  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input() nzDataSource: TransferItem[] = [];
  @Input() nzTitles: string[] = ['', ''];
  @Input() nzOperations: string[] = [];
  @Input() nzListStyle: NgStyleInterface = {};
  @Input({ transform: booleanAttribute }) nzShowSelectAll = true;
  @Input() nzItemUnit?: string;
  @Input() nzItemsUnit?: string;
  @Input() nzCanMove: (arg: TransferCanMove) => Observable<TransferItem[]> = (arg: TransferCanMove) => of(arg.list);
  @Input() nzRenderList: Array<TemplateRef<NzSafeAny> | null> | null = null;
  @Input() nzRender: TemplateRef<NzSafeAny> | null = null;
  @Input() nzFooter: TemplateRef<NzSafeAny> | null = null;
  @Input({ transform: booleanAttribute }) nzShowSearch = false;
  @Input() nzFilterOption?: (inputValue: string, item: TransferItem) => boolean;
  @Input() nzSearchPlaceholder?: string;
  @Input() nzNotFoundContent?: string;
  @Input() nzTargetKeys: string[] = [];
  @Input() nzSelectedKeys: string[] = [];
  @Input() nzStatus: NzStatus = '';
  @Input({ transform: booleanAttribute }) nzOneWay: boolean = false;

  // events
  @Output() readonly nzChange = new EventEmitter<TransferChange>();
  @Output() readonly nzSearchChange = new EventEmitter<TransferSearchChange>();
  @Output() readonly nzSelectChange = new EventEmitter<TransferSelectChange>();

  // #endregion

  // #region process data

  // left
  leftDataSource: TransferItem[] = [];
  lastLeftCheckedIndex?: number;

  // right
  rightDataSource: TransferItem[] = [];
  lastRightCheckedIndex?: number;

  isShiftPressed = false;

  @HostListener('window:keydown.shift')
  onTriggerShiftDown(): void {
    this.isShiftPressed = true;
  }

  @HostListener('window:keyup.shift')
  onTriggerShiftUp(): void {
    this.isShiftPressed = false;
  }

  @HostListener('mousedown', ['$event'])
  onTriggerMouseDown(event: MouseEvent): void {
    const isInsideTransfer = (event.target as HTMLElement).closest('.ant-transfer-list');
    if (event.shiftKey && isInsideTransfer) {
      event.preventDefault();
    }
  }

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

  private getCheckedData(direction: TransferDirection): TransferItem[] {
    return this[direction === 'left' ? 'leftDataSource' : 'rightDataSource'].filter(w => w.checked);
  }

  handleLeftSelectAll = (checked: boolean): void => this.handleSelect('left', checked);
  handleRightSelectAll = (checked: boolean): void => this.handleSelect('right', checked);

  handleLeftSelect = (item: TransferItem): void => this.handleSelect('left', !!item.checked, item);
  handleRightSelect = (item: TransferItem): void => this.handleSelect('right', !!item.checked, item);

  handleSelect(direction: TransferDirection, checked: boolean, item?: TransferItem): void {
    if (item) {
      const datasource = direction === 'left' ? this.leftDataSource : this.rightDataSource;
      const currentIndex = datasource.findIndex(i => i.key === item.key);
      const lastCheckedIndex = this[direction === 'left' ? 'lastLeftCheckedIndex' : 'lastRightCheckedIndex'] ?? -1;
      if (this.isShiftPressed && lastCheckedIndex > -1) {
        const start = Math.min(lastCheckedIndex, currentIndex);
        const end = Math.max(lastCheckedIndex, currentIndex);
        for (let i = start; i <= end; i++) {
          const item = datasource[i];
          if (!item.disabled) {
            item.checked = checked;
          }
        }
        this.markForCheckAllList();
      }
      this[direction === 'left' ? 'lastLeftCheckedIndex' : 'lastRightCheckedIndex'] = currentIndex;
    }
    const list = this.getCheckedData(direction);
    const count = list.filter(i => !i.disabled).length;
    this.updateOperationStatus(direction, count);
    this.nzSelectChange.emit({ direction, checked, list, item });
  }

  handleFilterChange(ret: { direction: TransferDirection; value: string }): void {
    this.nzSearchChange.emit(ret);
  }

  // #endregion

  // #region operation

  leftActive = false;
  rightActive = false;

  private updateOperationStatus(direction: TransferDirection, count?: number): void {
    this[direction === 'right' ? 'leftActive' : 'rightActive'] =
      (typeof count === 'undefined' ? this.getCheckedData(direction).filter(w => !w.disabled).length : count) > 0;
  }

  moveToLeft = (): void => this.moveTo('left');
  moveToRight = (): void => this.moveTo('right');

  moveTo(direction: TransferDirection): void {
    const oppositeDirection = direction === 'left' ? 'right' : 'left';
    this.updateOperationStatus(oppositeDirection, 0);
    const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
    const moveList = datasource.filter(item => item.checked === true && !item.disabled);
    this.nzCanMove({ direction, list: moveList }).subscribe({
      next: newMoveList =>
        this.truthMoveTo(
          direction,
          newMoveList.filter(i => !!i)
        ),
      error: () => moveList.forEach(i => (i.checked = false))
    });
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
    this.nzChange.emit({ from: oppositeDirection, to: direction, list });
    this.markForCheckAllList();
  }

  // #endregion

  private markForCheckAllList(): void {
    if (!this.lists) {
      return;
    }
    this.lists.forEach(i => i.markForCheck());
  }

  private handleNzTargetKeys(): void {
    const keys = toArray(this.nzTargetKeys);
    const hasOwnKey = (e: TransferItem): boolean => e.hasOwnProperty('key');
    this.leftDataSource.forEach(e => {
      if (hasOwnKey(e) && keys.indexOf(e.key) !== -1 && !e.disabled) {
        e.checked = true;
      }
    });
    this.moveToRight();
  }

  private handleNzSelectedKeys(): void {
    const keys = toArray(this.nzSelectedKeys);
    this.nzDataSource.forEach(e => {
      if (keys.indexOf(e.key) !== -1) {
        e.checked = true;
      }
    });

    const term = (ld: TransferItem): boolean => ld.disabled === false && ld.checked === true;
    this.rightActive = this.leftDataSource.some(term);
    this.leftActive = this.rightDataSource.some(term);
  }

  ngOnInit(): void {
    this.nzFormStatusService?.formStatusChanges
      .pipe(
        distinctUntilChanged((pre, cur) => pre.status === cur.status && pre.hasFeedback === cur.hasFeedback),
        withLatestFrom(this.nzFormNoStatusService ? this.nzFormNoStatusService.noFormStatus : observableOf(false)),
        map(([{ status, hasFeedback }, noStatus]) => ({ status: noStatus ? '' : status, hasFeedback })),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(({ status, hasFeedback }) => {
        this.setStatusStyles(status, hasFeedback);
      });

    this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Transfer');
      this.markForCheckAllList();
    });

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzStatus, nzDataSource, nzTargetKeys, nzSelectedKeys } = changes;
    if (nzDataSource) {
      this.splitDataSource();
      this.updateOperationStatus('left');
      this.updateOperationStatus('right');
      this.cdr.detectChanges();
      this.markForCheckAllList();
    }
    if (nzTargetKeys) {
      this.handleNzTargetKeys();
    }
    if (nzSelectedKeys) {
      this.handleNzSelectedKeys();
    }
    if (nzStatus) {
      this.setStatusStyles(this.nzStatus, this.hasFeedback);
    }
  }

  private setStatusStyles(status: NzValidateStatus, hasFeedback: boolean): void {
    // set inner status
    this.hasFeedback = hasFeedback;
    this.cdr.markForCheck();
    // render status if nzStatus is set
    this.statusCls = getStatusClassNames(this.prefixCls, status, hasFeedback);
    Object.keys(this.statusCls).forEach(status => {
      if (this.statusCls[status]) {
        this.renderer.addClass(this.elementRef.nativeElement, status);
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, status);
      }
    });
  }
}
