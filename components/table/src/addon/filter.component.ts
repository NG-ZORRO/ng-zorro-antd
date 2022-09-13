/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { arraysEqual } from 'ng-zorro-antd/core/util';
import { NzI18nService, NzTableI18nInterface } from 'ng-zorro-antd/i18n';

import { NzTableFilterList } from '../table.types';

interface NzThItemInterface {
  text: string;
  value: NzSafeAny;
  checked: boolean;
}

@Component({
  selector: 'nz-table-filter',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span class="ant-table-column-title">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </span>
    <ng-container *ngIf="!customFilter; else extraTemplate">
      <nz-filter-trigger
        [nzVisible]="isVisible"
        [nzActive]="isChecked"
        [nzDropdownMenu]="filterMenu"
        (nzVisibleChange)="onVisibleChange($event)"
      >
        <span nz-icon nzType="filter" nzTheme="fill"></span>
      </nz-filter-trigger>
      <nz-dropdown-menu #filterMenu="nzDropdownMenu">
        <div class="ant-table-filter-dropdown">
          <ul nz-menu>
            <li
              nz-menu-item
              [nzSelected]="f.checked"
              *ngFor="let f of listOfParsedFilter; trackBy: trackByValue"
              (click)="check(f)"
            >
              <label nz-radio *ngIf="!filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <label nz-checkbox *ngIf="filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <span>{{ f.text }}</span>
            </li>
          </ul>
          <div class="ant-table-filter-dropdown-btns">
            <button nz-button nzType="link" nzSize="small" (click)="reset()" [disabled]="!isChecked">
              {{ locale.filterReset }}
            </button>
            <button nz-button nzType="primary" nzSize="small" (click)="confirm()">{{ locale.filterConfirm }}</button>
          </div>
        </div>
      </nz-dropdown-menu>
    </ng-container>
  `,
  host: { class: 'ant-table-filter-column' }
})
export class NzTableFilterComponent implements OnChanges, OnDestroy, OnInit {
  @Input() contentTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() customFilter = false;
  @Input() extraTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() filterMultiple = true;
  @Input() listOfFilter: NzTableFilterList = [];
  @Output() readonly filterChange = new EventEmitter<NzSafeAny[] | NzSafeAny>();
  private destroy$ = new Subject();
  locale!: NzTableI18nInterface;
  isChecked = false;
  isVisible = false;
  listOfParsedFilter: NzThItemInterface[] = [];
  listOfChecked: NzSafeAny[] = [];

  trackByValue(_: number, item: NzThItemInterface): NzSafeAny {
    return item.value;
  }

  check(filter: NzThItemInterface): void {
    if (this.filterMultiple) {
      this.listOfParsedFilter = this.listOfParsedFilter.map(item => {
        if (item === filter) {
          return { ...item, checked: !filter.checked };
        } else {
          return item;
        }
      });
      filter.checked = !filter.checked;
    } else {
      this.listOfParsedFilter = this.listOfParsedFilter.map(item => ({ ...item, checked: item === filter }));
    }
    this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
  }

  confirm(): void {
    this.isVisible = false;
    this.emitFilterData();
  }

  reset(): void {
    this.isVisible = false;
    this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter, true);
    this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
    this.emitFilterData();
  }

  onVisibleChange(value: boolean): void {
    this.isVisible = value;
    if (!value) {
      this.emitFilterData();
    } else {
      this.listOfChecked = this.listOfParsedFilter.filter(item => item.checked).map(item => item.value);
    }
  }

  emitFilterData(): void {
    const listOfChecked = this.listOfParsedFilter.filter(item => item.checked).map(item => item.value);
    if (!arraysEqual(this.listOfChecked, listOfChecked)) {
      if (this.filterMultiple) {
        this.filterChange.emit(listOfChecked);
      } else {
        this.filterChange.emit(listOfChecked.length > 0 ? listOfChecked[0] : null);
      }
    }
  }

  parseListOfFilter(listOfFilter: NzTableFilterList, reset?: boolean): NzThItemInterface[] {
    return listOfFilter.map(item => {
      const checked = reset ? false : !!item.byDefault;
      return { text: item.text, value: item.value, checked };
    });
  }

  getCheckedStatus(listOfParsedFilter: NzThItemInterface[]): boolean {
    return listOfParsedFilter.some(item => item.checked);
  }

  constructor(private cdr: ChangeDetectorRef, private i18n: NzI18nService) {}

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Table');
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { listOfFilter } = changes;
    if (listOfFilter && this.listOfFilter && this.listOfFilter.length) {
      this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter);
      this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
