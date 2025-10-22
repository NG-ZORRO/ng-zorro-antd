/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { toNumber } from 'ng-zorro-antd/core/util';
import { NzPaginationI18nInterface } from 'ng-zorro-antd/i18n';

import { NzPaginationItemComponent } from './pagination-item.component';
import { PaginationItemRenderContext } from './pagination.types';

@Component({
  selector: 'nz-pagination-simple',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #containerTemplate>
      <ul>
        <li
          nz-pagination-item
          [locale]="locale"
          [attr.title]="locale.prev_page"
          [disabled]="isFirstIndex"
          [direction]="dir"
          (click)="prePage()"
          type="prev"
          [itemRender]="itemRender"
        ></li>
        <li [attr.title]="pageIndex + '/' + lastIndex" class="ant-pagination-simple-pager">
          <input [disabled]="disabled" [value]="pageIndex" (keydown.enter)="jumpToPageViaInput($event)" size="3" />
          <span class="ant-pagination-slash">/</span>
          {{ lastIndex }}
        </li>
        <li
          nz-pagination-item
          [locale]="locale"
          [attr.title]="locale?.next_page"
          [disabled]="isLastIndex"
          [direction]="dir"
          (click)="nextPage()"
          type="next"
          [itemRender]="itemRender"
        ></li>
      </ul>
    </ng-template>
  `,
  imports: [NzPaginationItemComponent],
  host: {
    '[class.ant-pagination-rtl]': "dir === 'rtl'"
  }
})
export class NzPaginationSimpleComponent implements OnChanges, OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly directionality = inject(Directionality);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('containerTemplate', { static: true }) template!: TemplateRef<NzSafeAny>;
  @Input() itemRender: TemplateRef<PaginationItemRenderContext> | null = null;
  @Input() disabled = false;
  @Input() locale!: NzPaginationI18nInterface;
  @Input() total = 0;
  @Input() pageIndex = 1;
  @Input() pageSize = 10;
  @Output() readonly pageIndexChange = new EventEmitter<number>();
  lastIndex = 0;
  isFirstIndex = false;
  isLastIndex = false;

  dir: Direction = 'ltr';

  constructor() {
    const el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
    const renderer = inject(Renderer2);
    renderer.removeChild(renderer.parentNode(el), el);
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
  }

  jumpToPageViaInput($event: Event): void {
    const target = $event.target as HTMLInputElement;
    const index = toNumber(target.value, this.pageIndex);
    this.onPageIndexChange(index);
    target.value = `${this.pageIndex}`;
  }

  prePage(): void {
    this.onPageIndexChange(this.pageIndex - 1);
  }

  nextPage(): void {
    this.onPageIndexChange(this.pageIndex + 1);
  }

  onPageIndexChange(index: number): void {
    this.pageIndexChange.next(index);
  }

  updateBindingValue(): void {
    this.lastIndex = Math.ceil(this.total / this.pageSize);
    this.isFirstIndex = this.pageIndex === 1;
    this.isLastIndex = this.pageIndex === this.lastIndex;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { pageIndex, total, pageSize } = changes;
    if (pageIndex || total || pageSize) {
      this.updateBindingValue();
    }
  }
}
