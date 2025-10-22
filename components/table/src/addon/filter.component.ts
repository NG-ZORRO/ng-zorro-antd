/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
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
import { arraysEqual } from 'ng-zorro-antd/core/util';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzI18nService, NzTableI18nInterface } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioComponent } from 'ng-zorro-antd/radio';

import { NzTableFilterList } from '../table.types';
import { NzFilterTriggerComponent } from './filter-trigger.component';

interface NzThItemInterface {
  text: string;
  value: NzSafeAny;
  checked: boolean;
}

@Component({
  selector: 'nz-table-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span class="ant-table-column-title">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </span>
    @if (!customFilter) {
      <nz-filter-trigger
        [nzVisible]="isVisible"
        [nzActive]="isChecked"
        [nzDropdownMenu]="filterMenu"
        (nzVisibleChange)="onVisibleChange($event)"
      >
        <nz-icon nzType="filter" nzTheme="fill" />
      </nz-filter-trigger>
      <nz-dropdown-menu #filterMenu="nzDropdownMenu">
        <div class="ant-table-filter-dropdown">
          <ul nz-menu>
            @for (f of listOfParsedFilter; track f.value) {
              <li nz-menu-item [nzSelected]="f.checked" (click)="check(f)">
                @if (!filterMultiple) {
                  <label nz-radio [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
                } @else {
                  <label nz-checkbox [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
                }
                <span>{{ f.text }}</span>
              </li>
            }
          </ul>
          <div class="ant-table-filter-dropdown-btns">
            <button nz-button nzType="link" nzSize="small" (click)="reset()" [disabled]="!isChecked">
              {{ locale.filterReset }}
            </button>
            <button nz-button nzType="primary" nzSize="small" (click)="confirm()">{{ locale.filterConfirm }}</button>
          </div>
        </div>
      </nz-dropdown-menu>
    } @else {
      <ng-container [ngTemplateOutlet]="extraTemplate"></ng-container>
    }
  `,
  host: { class: 'ant-table-filter-column' },
  imports: [
    NgTemplateOutlet,
    NzFilterTriggerComponent,
    NzIconModule,
    NzDropDownModule,
    NzRadioComponent,
    NzCheckboxModule,
    FormsModule,
    NzButtonModule
  ]
})
export class NzTableFilterComponent implements OnChanges, OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly i18n = inject(NzI18nService);
  private readonly destroyRef = inject(DestroyRef);

  @Input() contentTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() customFilter = false;
  @Input() extraTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() filterMultiple = true;
  @Input() listOfFilter: NzTableFilterList = [];
  @Output() readonly filterChange = new EventEmitter<NzSafeAny[] | NzSafeAny>();
  locale!: NzTableI18nInterface;
  isChecked = false;
  isVisible = false;
  listOfParsedFilter: NzThItemInterface[] = [];
  listOfChecked: NzSafeAny[] = [];

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

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
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
}
