/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
  booleanAttribute
} from '@angular/core';
import { merge } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxComponent, NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { RenderListContext, TransferDirection, TransferItem, TransferStat } from './interface';
import { NzTransferSearchComponent } from './transfer-search.component';

@Component({
  selector: 'nz-transfer-list',
  exportAs: 'nzTransferList',
  preserveWhitespaces: false,
  template: `
    <div class="ant-transfer-list-header">
      @if (showSelectAll && !oneWay) {
        <label
          class="ant-transfer-list-checkbox"
          nz-checkbox
          #headerCheckbox
          [nzChecked]="stat.checkAll"
          (nzCheckedChange)="onItemSelectAll($event)"
          [nzIndeterminate]="stat.checkHalf"
          [nzDisabled]="stat.availableCount === 0 || disabled"
        ></label>
      }
      <span class="ant-transfer-list-header-selected">
        <span>
          @if (!oneWay) {
            {{ (stat.checkCount > 0 ? stat.checkCount + '/' : '') + stat.shownCount }}
          } @else {
            {{ stat.shownCount }}
          }
          {{ validData.length > 1 ? itemsUnit : itemUnit }}
        </span>
      </span>
      @if (titleText) {
        <span class="ant-transfer-list-header-title">{{ titleText }}</span>
      }
    </div>
    <div
      class="{{ showSearch ? 'ant-transfer-list-body ant-transfer-list-body-with-search' : 'ant-transfer-list-body' }}"
      [ngClass]="{ 'ant-transfer__nodata': stat.shownCount === 0 }"
    >
      @if (showSearch) {
        <div class="ant-transfer-list-body-search-wrapper">
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
      }
      @if (renderList) {
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
      } @else {
        @if (stat.shownCount > 0) {
          <ul class="ant-transfer-list-content">
            @for (item of validData; track item) {
              <li
                (click)="!oneWay ? onItemSelect(item) : null"
                class="ant-transfer-list-content-item"
                [ngClass]="{ 'ant-transfer-list-content-item-disabled': disabled || item.disabled }"
              >
                @if (!oneWay) {
                  <label
                    #checkboxes
                    nz-checkbox
                    [nzChecked]="item.checked"
                    (nzCheckedChange)="onItemSelect(item)"
                    [nzDisabled]="disabled || item.disabled"
                  >
                    @if (!render) {
                      {{ item.title }}
                    } @else {
                      <ng-template
                        [ngTemplateOutlet]="render"
                        [ngTemplateOutletContext]="{ $implicit: item }"
                      ></ng-template>
                    }
                  </label>
                } @else {
                  @if (!render) {
                    <span class="ant-transfer-list-content-item-text">
                      {{ item.title }}
                    </span>
                    <div
                      class="ant-transfer-list-content-item-remove"
                      [ngClass]="{ 'ant-transfer-list-content-item-disabled': disabled || item.disabled }"
                      (click)="!(disabled || item.disabled) ? deleteItem(item) : null"
                    >
                      <span nz-icon nzType="delete" nzTheme="outline"></span>
                    </div>
                  } @else {
                    <ng-template
                      [ngTemplateOutlet]="render"
                      [ngTemplateOutletContext]="{ $implicit: item }"
                    ></ng-template>
                  }
                }
              </li>
            }
          </ul>
        } @else {
          <div class="ant-transfer-list-body-not-found">
            <nz-embed-empty [nzComponentName]="'transfer'" [specificContent]="notFoundContent"></nz-embed-empty>
          </div>
        }
      }
    </div>
    @if (footer) {
      <div class="ant-transfer-list-footer">
        <ng-template [ngTemplateOutlet]="footer" [ngTemplateOutletContext]="{ $implicit: direction }"></ng-template>
      </div>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-transfer-list',
    '[class.ant-transfer-list-with-footer]': '!!footer'
  },
  imports: [
    NgClass,
    NzCheckboxModule,
    NgTemplateOutlet,
    NzEmptyModule,
    NzTransferSearchComponent,
    NzIconModule,
    NzButtonModule
  ],
  standalone: true
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
  @Input() oneWay: boolean = false;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input({ transform: booleanAttribute }) showSearch?: boolean;
  @Input() searchPlaceholder?: string;
  @Input() notFoundContent?: string;
  @Input() filterOption?: (inputValue: string, item: TransferItem) => boolean;

  @Input() renderList: TemplateRef<RenderListContext> | null = null;
  @Input() render: TemplateRef<{ $implicit: TransferItem }> | null = null;
  @Input() footer: TemplateRef<{ $implicit: TransferDirection }> | null = null;

  // events
  @Output() readonly handleSelectAll: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() readonly handleSelect: EventEmitter<TransferItem> = new EventEmitter();
  @Output() readonly filterChange: EventEmitter<{ direction: TransferDirection; value: string }> = new EventEmitter();
  @Output() readonly moveToLeft: EventEmitter<void> = new EventEmitter();

  @ViewChild('headerCheckbox', { read: NzCheckboxComponent }) headerCheckbox?: NzCheckboxComponent;

  @ViewChildren('checkboxes', { read: ElementRef }) checkboxes!: QueryList<ElementRef<HTMLLabelElement>>;

  stat: TransferStat = {
    checkAll: false,
    checkHalf: false,
    checkCount: 0,
    shownCount: 0,
    availableCount: 0
  };

  get validData(): TransferItem[] {
    return this.dataSource.filter(w => !w.hide);
  }

  get availableData(): TransferItem[] {
    // filter disabled data
    return this.validData.filter(w => !w.disabled);
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
    this.stat.availableCount = this.availableData.length;
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
    this.stat.availableCount = this.availableData.length;
    this.filterChange.emit({ direction: this.direction, value });
  }

  handleClear(): void {
    this.handleFilter('');
  }

  deleteItem(item: TransferItem): void {
    item.checked = true;
    this.handleSelect.emit(item);
    this.moveToLeft.emit();
  }

  private matchFilter(text: string, item: TransferItem): boolean {
    if (this.filterOption) {
      return this.filterOption(text, item);
    }
    return item.title.includes(text);
  }

  // #endregion

  constructor(private cdr: ChangeDetectorRef) {}

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
          return merge(
            ...checkboxes.map(checkbox => fromEventOutsideAngular<MouseEvent>(checkbox.nativeElement, 'click'))
          );
        })
      )
      .subscribe(event => {
        event.stopPropagation();
      });
  }
}
