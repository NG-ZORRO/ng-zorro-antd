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
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isInteger } from '../core/util/check';
import { toNumber, InputBoolean, InputNumber } from '../core/util/convert';
import { NzI18nService } from '../i18n/nz-i18n.service';

@Component({
  selector: 'nz-pagination',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nz-pagination.component.html'
})
export class NzPaginationComponent implements OnInit, OnDestroy, OnChanges {
  // tslint:disable-next-line:no-any
  locale: any = {};
  firstIndex = 1;
  pages: number[] = [];
  private $destroy = new Subject<void>();
  @Output() readonly nzPageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly nzPageIndexChange: EventEmitter<number> = new EventEmitter();
  @Input() nzShowTotal: TemplateRef<{ $implicit: number; range: [number, number] }>;
  @Input() nzInTable = false;
  @Input() nzSize: 'default' | 'small' = 'default';
  @Input() nzPageSizeOptions = [10, 20, 30, 40];
  @Input() @ViewChild('renderItemTemplate') nzItemRender: TemplateRef<{
    $implicit: 'page' | 'prev' | 'next';
    page: number;
  }>;
  @Input() @InputBoolean() nzShowSizeChanger = false;
  @Input() @InputBoolean() nzHideOnSinglePage = false;
  @Input() @InputBoolean() nzShowQuickJumper = false;
  @Input() @InputBoolean() nzSimple = false;
  @Input() @InputNumber() nzTotal = 0;
  @Input() @InputNumber() nzPageIndex = 1;
  @Input() @InputNumber() nzPageSize = 10;

  validatePageIndex(value: number): number {
    if (value > this.lastIndex) {
      return this.lastIndex;
    } else if (value < this.firstIndex) {
      return this.firstIndex;
    } else {
      return value;
    }
  }

  updatePageIndexValue(page: number): void {
    this.nzPageIndex = page;
    this.nzPageIndexChange.emit(this.nzPageIndex);
    this.buildIndexes();
  }

  isPageIndexValid(value: number): boolean {
    return this.validatePageIndex(value) === value;
  }

  jumpPage(index: number): void {
    if (index !== this.nzPageIndex) {
      const pageIndex = this.validatePageIndex(index);
      if (pageIndex !== this.nzPageIndex) {
        this.updatePageIndexValue(pageIndex);
      }
    }
  }

  jumpDiff(diff: number): void {
    this.jumpPage(this.nzPageIndex + diff);
  }

  onPageSizeChange($event: number): void {
    this.nzPageSize = $event;
    this.nzPageSizeChange.emit($event);
    this.buildIndexes();
    if (this.nzPageIndex > this.lastIndex) {
      this.updatePageIndexValue(this.lastIndex);
    }
  }

  handleKeyDown(_: KeyboardEvent, input: HTMLInputElement, clearInputValue: boolean): void {
    const target = input;
    const page = toNumber(target.value, this.nzPageIndex);
    if (isInteger(page) && this.isPageIndexValid(page) && page !== this.nzPageIndex) {
      this.updatePageIndexValue(page);
    }
    if (clearInputValue) {
      target.value = '';
    } else {
      target.value = `${this.nzPageIndex}`;
    }
  }

  /** generate indexes list */
  buildIndexes(): void {
    const pages: number[] = [];
    if (this.lastIndex <= 9) {
      for (let i = 2; i <= this.lastIndex - 1; i++) {
        pages.push(i);
      }
    } else {
      const current = +this.nzPageIndex;
      let left = Math.max(2, current - 2);
      let right = Math.min(current + 2, this.lastIndex - 1);
      if (current - 1 <= 2) {
        right = 5;
      }
      if (this.lastIndex - current <= 2) {
        left = this.lastIndex - 4;
      }
      for (let i = left; i <= right; i++) {
        pages.push(i);
      }
    }
    this.pages = pages;
    this.cdr.markForCheck();
  }

  get lastIndex(): number {
    return Math.ceil(this.nzTotal / this.nzPageSize);
  }

  get isLastIndex(): boolean {
    return this.nzPageIndex === this.lastIndex;
  }

  get isFirstIndex(): boolean {
    return this.nzPageIndex === this.firstIndex;
  }

  get ranges(): number[] {
    return [(this.nzPageIndex - 1) * this.nzPageSize + 1, Math.min(this.nzPageIndex * this.nzPageSize, this.nzTotal)];
  }

  get showAddOption(): boolean {
    return this.nzPageSizeOptions.indexOf(this.nzPageSize) === -1;
  }

  constructor(private i18n: NzI18nService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.$destroy)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Pagination');
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzTotal || changes.nzPageSize || changes.nzPageIndex) {
      this.buildIndexes();
    }
  }
}
