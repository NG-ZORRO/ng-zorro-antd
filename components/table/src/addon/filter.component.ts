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
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzThFilterType, NzThItemInterface } from '../table.types';
import { NzFilterTriggerComponent } from './filter-trigger.component';

@Component({
  selector: 'nz-table-filter',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span class="ant-table-filter-column-title">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </span>
    <ng-container *ngIf="!customFilter; else extraTemplate">
      <nz-filter-trigger
        #filterTrigger="nzFilterTrigger"
        [nzActive]="isFilterIconActivated"
        [nzDropdownMenu]="filterMenu"
        (nzVisibleChange)="onVisibleChange($event)"
      >
        <i nz-icon nzType="filter" nzTheme="fill"></i>
      </nz-filter-trigger>
      <nz-dropdown-menu #filterMenu="nzDropdownMenu">
        <div class="ant-table-filter-dropdown">
          <ul nz-menu>
            <li nz-menu-item [nzSelected]="f.checked" *ngFor="let f of listOfParsedFilter; trackBy: trackByValue" (click)="check(f)">
              <label nz-radio *ngIf="!filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <label nz-checkbox *ngIf="filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <span>{{ f.text }}</span>
            </li>
          </ul>
          <div class="ant-table-filter-dropdown-btns">
            <button nz-button nzType="link" nzSize="small" (click)="reset(filterTrigger)">{{ locale.filterReset }}</button>
            <button nz-button nzType="primary" nzSize="small" (click)="confirm(filterTrigger)">{{ locale.filterConfirm }}</button>
          </div>
        </div>
      </nz-dropdown-menu>
    </ng-container>
  `,
  host: {
    '[class.ant-table-filter-column]': 'true'
  }
})
export class NzTableFilterComponent implements OnChanges, OnDestroy, OnInit {
  @Input() contentTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() customFilter = false;
  @Input() extraTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() filterMultiple = true;
  @Input() listOfFilter: NzThFilterType = [];
  @Output() readonly filterChange = new EventEmitter<NzSafeAny[] | NzSafeAny>();
  private destroy$ = new Subject();
  locale: NzI18nInterface['Table'] = {} as NzI18nInterface['Table'];
  isChanged = false;
  isFilterIconActivated = false;
  listOfParsedFilter: NzThItemInterface[] = [];

  trackByValue(_: number, item: NzThItemInterface): NzSafeAny {
    return item.value;
  }

  check(filter: NzThItemInterface): void {
    this.isChanged = true;
    if (this.filterMultiple) {
      filter.checked = !filter.checked;
    } else {
      this.listOfParsedFilter.forEach(item => (item.checked = item === filter));
    }
  }

  confirm(filterTrigger: NzFilterTriggerComponent): void {
    filterTrigger.hide();
    this.onFilterChange();
  }

  reset(filterTrigger: NzFilterTriggerComponent): void {
    this.isChanged = true;
    this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter, true);
    filterTrigger.hide();
    this.onFilterChange();
  }

  onVisibleChange(value: boolean): void {
    if (!value) {
      this.onFilterChange();
    }
  }

  onFilterChange(): void {
    this.isFilterIconActivated = this.getActivatedStatus(this.listOfParsedFilter);
    if (this.isChanged) {
      const listOfChecked = this.listOfParsedFilter.filter(({ checked }) => checked).map(({ value }) => value);
      if (this.filterMultiple) {
        this.filterChange.emit(listOfChecked);
      } else {
        this.filterChange.emit(listOfChecked[0] || null);
      }
      this.isChanged = false;
    }
  }

  parseListOfFilter(listOfFilter: NzThFilterType, reset?: boolean): NzThItemInterface[] {
    return listOfFilter.map(item => {
      const checked = reset ? false : !!item.byDefault;
      return { text: item.text, value: item.value, checked };
    });
  }

  getActivatedStatus(listOfParsedFilter: NzThItemInterface[]): boolean {
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
      this.isFilterIconActivated = this.getActivatedStatus(this.listOfParsedFilter);
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
