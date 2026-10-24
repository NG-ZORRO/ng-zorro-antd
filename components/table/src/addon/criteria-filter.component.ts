/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzI18nService, NzTableFilterOperatorLabelKey, NzTableI18nInterface } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

import {
  getCriteriaFilterOperators,
  getDefaultCriteriaFilterOperator,
  isCriterionActive,
  parseFilterDate,
  serializeFilterDate
} from '../table-filter-criteria';
import { NzTableCriteriaFilterConfig, NzTableFilterCriterion } from '../table.types';
import { NzFilterTriggerComponent } from './filter-trigger.component';

const DEFAULT_OPERATOR_LABELS: Record<NzTableFilterOperatorLabelKey, string> = {
  contains: 'Contains',
  equals: 'Equals',
  notEquals: 'Does not equal',
  startsWith: 'Starts with',
  endsWith: 'Ends with',
  fuzzy: 'Fuzzy match',
  greaterThan: 'Greater than',
  greaterThanOrEqual: 'Greater than or equal to',
  lessThan: 'Less than',
  lessThanOrEqual: 'Less than or equal to',
  between: 'Between',
  on: 'On',
  before: 'Before',
  after: 'After'
};

let nextId = 0;

/** Filter dropdown with an operator select and value editors for text, number and date columns. */
@Component({
  selector: 'nz-table-criteria-filter',
  encapsulation: ViewEncapsulation.None,
  template: `
    <span class="ant-table-column-title">
      <ng-template [ngTemplateOutlet]="contentTemplate" />
    </span>
    <nz-filter-trigger
      [nzVisible]="isVisible"
      [nzActive]="isActive"
      [nzDropdownMenu]="filterMenu"
      (nzVisibleChange)="onVisibleChange($event)"
    >
      <nz-icon nzType="filter" nzTheme="fill" />
    </nz-filter-trigger>
    <nz-dropdown-menu #filterMenu="nzDropdownMenu">
      <div class="ant-table-filter-dropdown">
        <div class="ant-table-filter-dropdown-criteria" (keydown.enter)="onEnter($event)">
          <label class="ant-table-filter-dropdown-criteria-sr-only" [attr.for]="id + '-operator'">
            {{ locale.filterOperator ?? 'Condition' }}
          </label>
          <nz-select
            class="ant-table-filter-dropdown-criteria-operator"
            nzSize="small"
            [nzId]="id + '-operator'"
            [(ngModel)]="operator"
          >
            @for (item of operators; track item) {
              <nz-option [nzValue]="item" [nzLabel]="getOperatorLabel(item)" />
            }
          </nz-select>
          @switch (config?.type) {
            @case ('text') {
              <input
                nz-input
                nzSize="small"
                type="text"
                [attr.aria-label]="valueLabel"
                [placeholder]="textPlaceholder"
                [(ngModel)]="text"
              />
              <label nz-checkbox [(ngModel)]="caseSensitive">{{ locale.filterMatchCase ?? 'Match case' }}</label>
            }
            @case ('number') {
              <div class="ant-table-filter-dropdown-criteria-range">
                <input
                  nz-input
                  nzSize="small"
                  type="number"
                  [attr.step]="numberStep"
                  [attr.aria-label]="valueLabel"
                  [placeholder]="valueLabel"
                  [(ngModel)]="numberFrom"
                />
                @if (operator === 'between') {
                  <input
                    nz-input
                    nzSize="small"
                    type="number"
                    [attr.step]="numberStep"
                    [attr.aria-label]="valueToLabel"
                    [placeholder]="valueToLabel"
                    [(ngModel)]="numberTo"
                  />
                }
              </div>
            }
            @case ('date') {
              <label class="ant-table-filter-dropdown-criteria-sr-only" [attr.for]="id + '-from'">
                {{ valueLabel }}
              </label>
              <nz-date-picker
                nzSize="small"
                [nzId]="id + '-from'"
                [nzShowTime]="showTime"
                [nzPlaceHolder]="valueLabel"
                [(ngModel)]="dateFrom"
              />
              @if (operator === 'between') {
                <label class="ant-table-filter-dropdown-criteria-sr-only" [attr.for]="id + '-to'">
                  {{ valueToLabel }}
                </label>
                <nz-date-picker
                  nzSize="small"
                  [nzId]="id + '-to'"
                  [nzShowTime]="showTime"
                  [nzPlaceHolder]="valueToLabel"
                  [(ngModel)]="dateTo"
                />
              }
            }
          }
        </div>
        <div class="ant-table-filter-dropdown-btns">
          <button nz-button nzType="link" nzSize="small" (click)="reset()" [disabled]="!isActive && !hasDraftValue">
            {{ locale.filterReset }}
          </button>
          <button nz-button nzType="primary" nzSize="small" (click)="confirm()">{{ locale.filterConfirm }}</button>
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  host: { class: 'ant-table-filter-column' },
  imports: [
    NgTemplateOutlet,
    FormsModule,
    NzFilterTriggerComponent,
    NzIconModule,
    NzDropdownModule,
    NzSelectModule,
    NzInputModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzButtonModule
  ]
})
export class NzTableCriteriaFilterComponent implements OnChanges, OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly i18n = inject(NzI18nService);
  private readonly destroyRef = inject(DestroyRef);

  @Input() contentTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() config: NzTableCriteriaFilterConfig<NzSafeAny> | null = null;
  @Input() value: NzTableFilterCriterion | null = null;
  @Output() readonly filterChange = new EventEmitter<NzTableFilterCriterion | null>();

  readonly id = `nz-table-criteria-filter-${nextId++}`;
  locale!: NzTableI18nInterface;
  isVisible = false;
  isActive = false;
  operators: string[] = [];
  operator = '';
  text = '';
  caseSensitive = false;
  numberFrom: number | null = null;
  numberTo: number | null = null;
  dateFrom: Date | null = null;
  dateTo: Date | null = null;
  private appliedCriterion = 'null';

  get valueLabel(): string {
    return this.locale.filterValuePlaceholder ?? 'Value';
  }

  get valueToLabel(): string {
    return this.locale.filterValueToPlaceholder ?? 'To';
  }

  get textPlaceholder(): string {
    return (this.config?.type === 'text' && this.config.placeholder) || this.valueLabel;
  }

  get numberStep(): number | null {
    return (this.config?.type === 'number' && this.config.step) || null;
  }

  get showTime(): boolean {
    return this.config?.type === 'date' && this.config.dateMode === 'datetime' && this.operator !== 'on';
  }

  get hasDraftValue(): boolean {
    return isCriterionActive(this.buildCriterion());
  }

  getOperatorLabel(operator: string): string {
    const key = operator as NzTableFilterOperatorLabelKey;
    return this.locale.filterOperatorLabels?.[key] ?? DEFAULT_OPERATOR_LABELS[key] ?? operator;
  }

  onEnter(event: Event): void {
    if (
      event.target instanceof HTMLInputElement &&
      (event.target.type === 'text' || event.target.type === 'number') &&
      event.target.closest('nz-select, nz-date-picker') === null
    ) {
      event.preventDefault();
      this.confirm();
    }
  }

  confirm(): void {
    this.isVisible = false;
    this.emitFilterData();
  }

  reset(): void {
    this.isVisible = false;
    this.resetDraft(null);
    this.emitFilterData();
  }

  onVisibleChange(visible: boolean): void {
    this.isVisible = visible;
    if (visible) {
      this.loadValue();
    } else {
      this.emitFilterData();
    }
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Table');
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && this.config) {
      this.operators = getCriteriaFilterOperators(this.config);
    }
    if (changes.config || changes.value) {
      this.isActive = isCriterionActive(this.value);
      this.loadValue();
    }
  }

  private resetDraft(criterion: NzTableFilterCriterion | null): void {
    if (!this.config) {
      return;
    }
    const active = isCriterionActive(criterion) && this.operators.includes(criterion!.operator);
    const value = active ? (criterion as NzSafeAny) : null;
    this.operator = value?.operator ?? getDefaultCriteriaFilterOperator(this.config);
    this.text = '';
    this.caseSensitive = this.config.type === 'text' && !!this.config.caseSensitive;
    this.numberFrom = null;
    this.numberTo = null;
    this.dateFrom = null;
    this.dateTo = null;
    if (!value) {
      return;
    }
    switch (this.config.type) {
      case 'text':
        this.text = value.value ?? '';
        this.caseSensitive = !!value.caseSensitive;
        break;
      case 'number':
        this.numberFrom = value.value ?? null;
        this.numberTo = value.valueTo ?? null;
        break;
      case 'date':
        this.dateFrom = parseFilterDate(value.value);
        this.dateTo = parseFilterDate(value.valueTo);
        break;
    }
  }

  private buildCriterion(): NzTableFilterCriterion | null {
    if (!this.config) {
      return null;
    }
    const between = this.operator === 'between';
    let criterion: NzTableFilterCriterion;
    switch (this.config.type) {
      case 'text':
        criterion = {
          operator: this.operator as NzSafeAny,
          value: this.text ?? '',
          caseSensitive: this.caseSensitive
        };
        break;
      case 'number': {
        const toNumber = (value: number | null): number | null =>
          typeof value === 'number' && !Number.isNaN(value) ? value : null;
        criterion = { operator: this.operator as NzSafeAny, value: toNumber(this.numberFrom) };
        if (between) {
          criterion.valueTo = toNumber(this.numberTo);
        }
        break;
      }
      case 'date': {
        // `on` always compares calendar days, so it is serialized as a date even in datetime mode.
        const dateMode = this.operator === 'on' ? 'date' : this.config.dateMode;
        criterion = { operator: this.operator as NzSafeAny, value: serializeFilterDate(this.dateFrom, dateMode) };
        if (between) {
          criterion.valueTo = serializeFilterDate(this.dateTo, dateMode);
        }
        break;
      }
    }
    return isCriterionActive(criterion) ? criterion : null;
  }

  private emitFilterData(): void {
    const criterion = this.buildCriterion();
    const serialized = JSON.stringify(criterion);
    if (serialized !== this.appliedCriterion) {
      this.appliedCriterion = serialized;
      this.filterChange.emit(criterion);
    }
  }

  private loadValue(): void {
    this.resetDraft(this.value);
    this.appliedCriterion = JSON.stringify(this.buildCriterion());
  }
}
