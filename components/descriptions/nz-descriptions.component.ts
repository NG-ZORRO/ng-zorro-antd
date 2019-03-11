import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, merge, Subject, Subscription } from 'rxjs';
import { auditTime, startWith, takeUntil } from 'rxjs/operators';

import { responsiveMap, Breakpoint } from '../core/responsive';
import { InputBoolean } from '../core/util';

import {
  NzDescriptionsItemRenderProps,
  NzDescriptionsSize
} from './nz-descriptions-definitions';
import { NzDescriptionsItemComponent } from './nz-descriptions-item.component';

const defaultColumnMap: { [ size: string ]: number } = {
  xxl: 4,
  xl : 3,
  lg : 3,
  md : 3,
  sm : 2,
  xs : 1
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation  : ViewEncapsulation.None,
  selector       : 'nz-descriptions',
  templateUrl    : './nz-descriptions.component.html',
  host           : {
    'class'         : 'ant-descriptions',
    '[class.border]': 'nzBorder',
    '[class.middle]': 'nzSize === "middle"',
    '[class.small]' : 'nzSize === "small"'
  },
  styles         : [
      `
      nz-descriptions {
        display: block;
      }
    `
  ]
})
export class NzDescriptionsComponent
  implements OnChanges, OnDestroy, AfterContentInit {
  @ContentChildren(NzDescriptionsItemComponent) items: QueryList<NzDescriptionsItemComponent>;

  @Input() @InputBoolean() nzBorder = false;
  @Input() nzColumn: number | { [ key: string ]: number } = 3;
  @Input() nzSize: NzDescriptionsSize = 'default';
  @Input() nzTitle: string | TemplateRef<void> = '';

  itemMatrix: NzDescriptionsItemRenderProps[][] = [];

  realColumn = 3;

  private destroy$ = new Subject<void>();
  private resize$ = new Subject<void>();
  private resize_: Subscription | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private mediaMatcher: MediaMatcher
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzColumn) {
      const column = changes.nzColumn.currentValue;
      if (typeof column === 'number' && this.resize_) {
        this.realColumn = column;
        this.resize_.unsubscribe();
        this.resize_ = null;
      } else if (typeof column === 'object' && !this.resize_) {
        this.ngZone.runOutsideAngular(() => {
          this.resize_ = fromEvent(window, 'resize')
            .pipe(
              auditTime(16),
              takeUntil(this.destroy$)
            )
            .subscribe(() => {
              this.ngZone.run(() => {
                this.resize$.next();
              });
            });
        });
        this.resize$.next();
      }
    }
  }

  ngAfterContentInit(): void {
    merge(
      this.items.changes.pipe(
        startWith(this.items),
        takeUntil(this.destroy$)
      ),
      this.resize$
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.prepareMatrix();
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.resize$.complete();
  }

  /**
   * Prepare the render matrix according to description items' spans.
   */
  private prepareMatrix(): void {
    let currentRow: NzDescriptionsItemRenderProps[] = [];
    let width = 0;

    const column = this.realColumn = this.getColumn();
    const items: NzDescriptionsItemComponent[] = this.items.toArray();
    const matrix: NzDescriptionsItemRenderProps[][] = [];
    const flushRow = () => {
      matrix.push(currentRow);
      currentRow = [];
      width = 0;
    };

    items.forEach(item => {
      const { nzTitle: title, content, nzSpan: span } = item;

      currentRow.push({ title, content, span });
      width += span;

      // If the last item make the row's length exceeds `nzColumn`, the last
      // item should take all the space left. This logic is implemented in the template.
      // Warn user about that.
      if (width >= column) {
        if (width > column) {
          console.warn(`"column" is ${column} but we have row length ${width}`);
        }
        flushRow();
      }
    });

    if (currentRow.length) {
      flushRow();
    }

    this.itemMatrix = matrix;
  }

  private matchMedia(): Breakpoint {
    let bp: Breakpoint = Breakpoint.md;

    Object.keys(responsiveMap).map((breakpoint: string) => {
      const matchBelow = this.mediaMatcher.matchMedia(responsiveMap[ breakpoint ]).matches;
      if (matchBelow) {
        // @ts-ignore
        bp = breakpoint as Breakpoint;
      }
    });

    return bp;
  }

  private getColumn(): number {
    if (typeof this.nzColumn !== 'number') {
      const breakpoint: Breakpoint = this.matchMedia();
      return this.nzColumn[ breakpoint ] || defaultColumnMap[ breakpoint ];
    }

    return this.nzColumn as number;
  }
}
