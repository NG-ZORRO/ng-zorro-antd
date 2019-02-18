import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';
import { flatMap, startWith, takeUntil } from 'rxjs/operators';
import { NzMeasureScrollbarService } from '../core/services/nz-measure-scrollbar.service';
import { NzSizeMDSType } from '../core/types/size';
import { InputBoolean } from '../core/util/convert';
import { NzI18nService } from '../i18n/nz-i18n.service';
import { NzThComponent } from './nz-th.component';
import { NzTheadComponent } from './nz-thead.component';

@Component({
  selector           : 'nz-table',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  templateUrl        : './nz-table.component.html',
  host               : {
    '[class.ant-table-empty]': 'data.length === 0'
  },
  styles             : [
      `
      nz-table {
        display: block
      }
    `
  ]
})
export class NzTableComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges, AfterContentInit {
  /** public data for ngFor tr */
  data = [];
  /* tslint:disable-next-line:no-any */
  locale: any = {};
  nzTheadComponent: NzTheadComponent;
  lastScrollLeft = 0;
  headerBottomStyle = {};
  private destroy$ = new Subject<void>();
  @ContentChildren(NzThComponent, { descendants: true }) listOfNzThComponent: QueryList<NzThComponent>;
  @ViewChild('tableHeaderElement') tableHeaderElement: ElementRef;
  @ViewChild('tableBodyElement') tableBodyElement: ElementRef;
  @ViewChild('tableMainElement') tableMainElement: ElementRef;
  @Input() nzSize: NzSizeMDSType = 'default';
  @Input() nzShowTotal: TemplateRef<{ $implicit: number, range: [ number, number ] }>;
  @Input() nzPageSizeOptions = [ 10, 20, 30, 40, 50 ];
  @Input() nzLoadingDelay = 0;
  @Input() nzTotal = 0;
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzFooter: string | TemplateRef<void>;
  @Input() nzNoResult: string | TemplateRef<void>;
  @Input() nzWidthConfig: string[] = [];
  @Input() nzPageIndex = 1;
  @Input() nzPageSize = 10;
  @Input() nzData = [];
  @Input() nzPaginationPosition: 'top' | 'bottom' | 'both' = 'bottom';
  @Input() nzScroll: { x: string; y: string } = { x: null, y: null };
  @Input() @ViewChild('renderItemTemplate') nzItemRender: TemplateRef<{ $implicit: 'page' | 'prev' | 'next', page: number }>;
  @Input() @InputBoolean() nzFrontPagination = true;
  @Input() @InputBoolean() nzBordered = false;
  @Input() @InputBoolean() nzShowPagination = true;
  @Input() @InputBoolean() nzLoading = false;
  @Input() @InputBoolean() nzShowSizeChanger = false;
  @Input() @InputBoolean() nzHideOnSinglePage = false;
  @Input() @InputBoolean() nzShowQuickJumper = false;
  @Input() @InputBoolean() nzSimple = false;
  @Output() readonly nzPageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly nzPageIndexChange: EventEmitter<number> = new EventEmitter();
  /* tslint:disable-next-line:no-any */
  @Output() readonly nzCurrentPageDataChange: EventEmitter<any[]> = new EventEmitter();

  emitPageSizeOrIndex(size: number, index: number): void {
    if (this.nzPageSize !== size) {
      this.nzPageSize = size;
      this.nzPageSizeChange.emit(this.nzPageSize);
    }
    if (this.nzPageIndex !== index) {
      this.nzPageIndex = index;
      this.nzPageIndexChange.emit(this.nzPageIndex);
    }
    this.updateFrontPaginationDataIfNeeded();
  }

  syncScrollTable(e: MouseEvent): void {
    if (e.currentTarget === e.target) {
      const target = e.target as HTMLElement;
      if (target.scrollLeft !== this.lastScrollLeft && this.nzScroll && this.nzScroll.x) {
        if (target === this.tableBodyElement.nativeElement && this.tableHeaderElement) {
          this.tableHeaderElement.nativeElement.scrollLeft = target.scrollLeft;
        } else if (target === this.tableHeaderElement.nativeElement && this.tableBodyElement) {
          this.tableBodyElement.nativeElement.scrollLeft = target.scrollLeft;
        }
        this.setScrollPositionClassName();
      }
      this.lastScrollLeft = target.scrollLeft;
    }
  }

  setScrollPositionClassName(): void {
    if (this.tableBodyElement && this.nzScroll && this.nzScroll.x) {
      if ((this.tableBodyElement.nativeElement.scrollWidth === this.tableBodyElement.nativeElement.clientWidth) && (this.tableBodyElement.nativeElement.scrollWidth !== 0)) {
        this.setScrollName();
      } else if (this.tableBodyElement.nativeElement.scrollLeft === 0) {
        this.setScrollName('left');
      } else if (this.tableBodyElement.nativeElement.scrollWidth === (this.tableBodyElement.nativeElement.scrollLeft + this.tableBodyElement.nativeElement.clientWidth)) {
        this.setScrollName('right');
      } else {
        this.setScrollName('middle');
      }
    }
  }

  setScrollName(position?: string): void {
    const prefix = 'ant-table-scroll-position';
    const classList = [ 'left', 'right', 'middle' ];
    classList.forEach(name => {
      this.renderer.removeClass(this.tableMainElement.nativeElement, `${prefix}-${name}`);
    });
    if (position) {
      this.renderer.addClass(this.tableMainElement.nativeElement, `${prefix}-${position}`);
    }
  }

  fitScrollBar(): void {
    const scrollbarWidth = this.nzMeasureScrollbarService.scrollBarWidth;
    if (scrollbarWidth) {
      this.headerBottomStyle = {
        marginBottom : `-${scrollbarWidth}px`,
        paddingBottom: `0px`
      };
      this.cdr.markForCheck();
    }
  }

  updateFrontPaginationDataIfNeeded(): void {
    if (this.nzFrontPagination) {
      const syncData = [ ...this.nzData ];
      this.nzTotal = syncData.length;
      const maxPageIndex = Math.ceil(syncData.length / this.nzPageSize);
      const pageIndex = !this.nzPageIndex ? 1 : (this.nzPageIndex > maxPageIndex ? maxPageIndex : this.nzPageIndex);
      if (pageIndex !== this.nzPageIndex) {
        this.nzPageIndex = pageIndex;
        Promise.resolve().then(() => this.nzPageIndexChange.emit(pageIndex));
      }
      this.data = syncData.slice((this.nzPageIndex - 1) * this.nzPageSize, this.nzPageIndex * this.nzPageSize);
      this.nzCurrentPageDataChange.emit(this.data);
    }
  }

  constructor(private renderer: Renderer2, private ngZone: NgZone, private cdr: ChangeDetectorRef, private nzMeasureScrollbarService: NzMeasureScrollbarService, private i18n: NzI18nService, elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-table-wrapper');
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Table');
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzScroll) {
      if (changes.nzScroll.currentValue) {
        this.nzScroll = changes.nzScroll.currentValue;
      } else {
        this.nzScroll = { x: null, y: null };
      }
      this.setScrollPositionClassName();
    }
    if (changes.nzFrontPagination || changes.nzData) {
      if (!this.nzFrontPagination) {
        this.data = [ ...this.nzData ];
        this.nzCurrentPageDataChange.emit(this.data);
      }
    }
    if (changes.nzPageIndex || changes.nzPageSize || changes.nzFrontPagination || changes.nzData) {
      this.updateFrontPaginationDataIfNeeded();
    }

  }

  ngAfterViewInit(): void {
    setTimeout(() => this.setScrollPositionClassName());
    this.ngZone.runOutsideAngular(() => {
      if (this.tableHeaderElement
        && this.tableHeaderElement.nativeElement
        && this.tableBodyElement
        && this.tableBodyElement.nativeElement) {
        merge<MouseEvent>(
          fromEvent<MouseEvent>(this.tableHeaderElement.nativeElement, 'scroll'),
          fromEvent<MouseEvent>(this.tableBodyElement.nativeElement, 'scroll')
        ).pipe(takeUntil(this.destroy$)).subscribe((data: MouseEvent) => {
          this.syncScrollTable(data);
        });
      }
      fromEvent<UIEvent>(window, 'resize').pipe(startWith(true), takeUntil(this.destroy$)).subscribe(() => {
        this.fitScrollBar();
        this.setScrollPositionClassName();
      });
    });
  }

  ngAfterContentInit(): void {
    this.listOfNzThComponent.changes.pipe(
      startWith(true),
      flatMap(() => merge(this.listOfNzThComponent.changes, ...this.listOfNzThComponent.map(th => th.nzWidthChange$))),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
