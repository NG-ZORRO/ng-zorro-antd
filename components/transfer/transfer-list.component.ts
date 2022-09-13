/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';

import { TransferDirection, TransferItem } from './interface';

@Component({
  selector: 'nz-transfer-list',
  exportAs: 'nzTransferList',
  preserveWhitespaces: false,
  template: `
    <ng-template #defaultRenderList>
      <ul *ngIf="stat.shownCount > 0" class="ant-transfer-list-content">
        <li
          *ngFor="let item of validData; trackBy: trackByHide"
          (click)="onItemSelect(item)"
          class="ant-transfer-list-content-item"
          [ngClass]="{ 'ant-transfer-list-content-item-disabled': disabled || item.disabled }"
        >
          <label
            #checkboxes
            nz-checkbox
            [nzChecked]="item.checked"
            (nzCheckedChange)="onItemSelect(item)"
            [nzDisabled]="disabled || item.disabled"
          >
            <ng-container *ngIf="!render; else renderContainer">{{ item.title }}</ng-container>
            <ng-template
              #renderContainer
              [ngTemplateOutlet]="render"
              [ngTemplateOutletContext]="{ $implicit: item }"
            ></ng-template>
          </label>
        </li>
      </ul>
      <div *ngIf="stat.shownCount === 0" class="ant-transfer-list-body-not-found">
        <nz-embed-empty [nzComponentName]="'transfer'" [specificContent]="notFoundContent"></nz-embed-empty>
      </div>
    </ng-template>
    <div class="ant-transfer-list-header">
      <label
        *ngIf="showSelectAll"
        class="ant-transfer-list-checkbox"
        nz-checkbox
        #headerCheckbox
        [nzChecked]="stat.checkAll"
        (nzCheckedChange)="onItemSelectAll($event)"
        [nzIndeterminate]="stat.checkHalf"
        [nzDisabled]="stat.shownCount === 0 || disabled"
      ></label>
      <span class="ant-transfer-list-header-selected">
        <span>
          {{ (stat.checkCount > 0 ? stat.checkCount + '/' : '') + stat.shownCount }}
          {{ validData.length > 1 ? itemsUnit : itemUnit }}
        </span>
      </span>
      <span *ngIf="titleText" class="ant-transfer-list-header-title">{{ titleText }}</span>
    </div>
    <div
      class="{{ showSearch ? 'ant-transfer-list-body ant-transfer-list-body-with-search' : 'ant-transfer-list-body' }}"
      [ngClass]="{ 'ant-transfer__nodata': stat.shownCount === 0 }"
    >
      <div *ngIf="showSearch" class="ant-transfer-list-body-search-wrapper">
        <span
          nz-transfer-search
          class="ant-input-affix-wrapper ant-transfer-list-search"
          (valueChanged)="handleFilter($event)"
          (valueClear)="handleClear()"
          [placeholder]="searchPlaceholder"
          [disabled]="disabled"
          [value]="filter"
        ></span>
      </div>
      <ng-container *ngIf="renderList; else defaultRenderList">
        <div class="ant-transfer-list-body-customize-wrapper">
          <ng-container
            *ngTemplateOutlet="
              renderList;
              context: {
                $implicit: validData,
                direction: direction,
                disabled: disabled,
                onItemSelectAll: onItemSelectAll,
                onItemSelect: onItemSelect,
                stat: stat
              }
            "
          ></ng-container>
        </div>
      </ng-container>
    </div>
    <div *ngIf="footer" class="ant-transfer-list-footer">
      <ng-template [ngTemplateOutlet]="footer" [ngTemplateOutletContext]="{ $implicit: direction }"></ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-transfer-list',
    '[class.ant-transfer-list-with-footer]': '!!footer'
  }
})
export class NzTransferListComponent implements AfterViewInit {
  // #region fields

  @Input() direction: TransferDirection = 'left';
  @Input() titleText = '';
  @Input() showSelectAll = true;

  @Input() dataSource: TransferItem[] = [];

  @Input() itemUnit: string | undefined = '';
  @Input() itemsUnit: string | undefined = '';
  @Input() filter = '';
  @Input() disabled: boolean = false;
  @Input() showSearch?: boolean;
  @Input() searchPlaceholder?: string;
  @Input() notFoundContent?: string;
  @Input() filterOption?: (inputValue: string, item: TransferItem) => boolean;

  @Input() renderList: TemplateRef<void> | null = null;
  @Input() render: TemplateRef<void> | null = null;
  @Input() footer: TemplateRef<void> | null = null;

  // events
  @Output() readonly handleSelectAll: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() readonly handleSelect: EventEmitter<TransferItem> = new EventEmitter();
  @Output() readonly filterChange: EventEmitter<{ direction: TransferDirection; value: string }> = new EventEmitter();

  @ViewChild('headerCheckbox', { read: NzCheckboxComponent }) headerCheckbox?: NzCheckboxComponent;

  @ViewChildren('checkboxes', { read: ElementRef }) checkboxes!: QueryList<ElementRef<HTMLLabelElement>>;

  stat = {
    checkAll: false,
    checkHalf: false,
    checkCount: 0,
    shownCount: 0
  };

  get validData(): TransferItem[] {
    return this.dataSource.filter(w => !w.hide);
  }

  trackByHide(_index: number, item: TransferItem): boolean | undefined {
    // The `validData` is a getter which returns new array each time the property is read.
    // This may lead to unexpected re-renders, tho the array hasn't been updated.
    return item.hide;
  }

  onItemSelect = (item: TransferItem): void => {
    if (this.disabled || item.disabled) {
      return;
    }
    item.checked = !item.checked;
    this.updateCheckStatus();
    this.handleSelect.emit(item);
  };

  onItemSelectAll = (status: boolean): void => {
    this.dataSource.forEach(item => {
      if (!item.disabled && !item.hide) {
        item.checked = status;
      }
    });

    this.updateCheckStatus();
    this.handleSelectAll.emit(status);
  };

  private updateCheckStatus(): void {
    const validCount = this.dataSource.filter(w => !w.disabled).length;
    this.stat.checkCount = this.dataSource.filter(w => w.checked && !w.disabled).length;
    this.stat.shownCount = this.validData.length;
    this.stat.checkAll = validCount > 0 && validCount === this.stat.checkCount;
    this.stat.checkHalf = this.stat.checkCount > 0 && !this.stat.checkAll;
    // Note: this is done explicitly since the internal `nzChecked` value may not be updated in edge cases.
    // Consider the following flow:
    // 1) the initial value of `stat.checkAll` is `false`
    // 2) the user filters items
    // 3) the user clicks "Select All" checkbox
    // 4) the `NzCheckboxComponent` sets `nzChecked` to `true` internally
    // 5) the user clicks "Move to right"
    // 6) items are moved and the `updateCheckStatus` is invoked
    // 7) the `stat.checkAll` value has never been updated in this flow, it's always been `false`
    // 8) the `nzChecked` is still `true` and the checkbox is not unchecked
    // This is because Angular checks bindings and it checked that `[nzChecked]="stat.checkAll"` has
    // never been updated, so Angular did not set new `nzChecked` value on the checkbox.
    this.headerCheckbox && (this.headerCheckbox.nzChecked = this.stat.checkAll);
  }

  // #endregion

  // #region search

  handleFilter(value: string): void {
    this.filter = value;
    this.dataSource.forEach(item => {
      item.hide = value.length > 0 && !this.matchFilter(value, item);
    });
    this.stat.shownCount = this.validData.length;
    this.filterChange.emit({ direction: this.direction, value });
  }

  handleClear(): void {
    this.handleFilter('');
  }

  private matchFilter(text: string, item: TransferItem): boolean {
    if (this.filterOption) {
      return this.filterOption(text, item);
    }
    return item.title.includes(text);
  }

  // #endregion

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  markForCheck(): void {
    this.updateCheckStatus();
    this.cdr.markForCheck();
  }

  ngAfterViewInit(): void {
    this.checkboxes.changes
      .pipe(
        startWith(this.checkboxes),
        switchMap(() => {
          const checkboxes = this.checkboxes.toArray();
          // Caretaker note: we explicitly should call `subscribe()` within the root zone.
          // `runOutsideAngular(() => fromEvent(...))` will just create an observable within the root zone,
          // but `addEventListener` is called when the `fromEvent` is subscribed.
          return new Observable<MouseEvent>(subscriber =>
            this.ngZone.runOutsideAngular(() =>
              merge(...checkboxes.map(checkbox => fromEvent<MouseEvent>(checkbox.nativeElement, 'click'))).subscribe(
                subscriber
              )
            )
          );
        })
      )
      .subscribe(event => {
        event.stopPropagation();
      });
  }
}
