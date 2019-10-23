/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { auditTime, finalize, startWith, switchMap, takeUntil } from 'rxjs/operators';

import {
  responsiveMap,
  warn,
  InputBoolean,
  NzBreakpoint,
  NzConfigService,
  NzDomEventService,
  WithConfig
} from 'ng-zorro-antd/core';
import { NzDescriptionsItemRenderProps, NzDescriptionsLayout, NzDescriptionsSize } from './nz-descriptions-definitions';
import { NzDescriptionsItemComponent } from './nz-descriptions-item.component';

const NZ_CONFIG_COMPONENT_NAME = 'descriptions';
const defaultColumnMap: { [key in NzBreakpoint]: number } = {
  xxl: 3,
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-descriptions',
  templateUrl: './nz-descriptions.component.html',
  exportAs: 'nzDescriptions',
  preserveWhitespaces: false,
  host: {
    class: 'ant-descriptions',
    '[class.ant-descriptions-bordered]': 'nzBordered',
    '[class.ant-descriptions-middle]': 'nzSize === "middle"',
    '[class.ant-descriptions-small]': 'nzSize === "small"'
  },
  styles: [
    `
      nz-descriptions {
        display: block;
      }
    `
  ]
})
export class NzDescriptionsComponent implements OnChanges, OnDestroy, AfterContentInit {
  @ContentChildren(NzDescriptionsItemComponent) items: QueryList<NzDescriptionsItemComponent>;

  @Input() @InputBoolean() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) nzBordered: boolean;
  @Input() nzLayout: NzDescriptionsLayout = 'horizontal';
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, defaultColumnMap) nzColumn: number | { [key in NzBreakpoint]: number };
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'default') nzSize: NzDescriptionsSize;
  @Input() nzTitle: string | TemplateRef<void> = '';
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, true) @InputBoolean() nzColon: boolean;

  itemMatrix: NzDescriptionsItemRenderProps[][] = [];

  realColumn = 3;

  private destroy$ = new Subject<void>();
  private resize$ = new Subject<void>();

  constructor(
    public nzConfigService: NzConfigService,
    private cdr: ChangeDetectorRef,
    private mediaMatcher: MediaMatcher,
    private platform: Platform,
    private nzDomEventService: NzDomEventService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzColumn) {
      this.resize$.next();
    }
  }

  ngAfterContentInit(): void {
    const contentChange$ = this.items.changes.pipe(
      startWith(this.items),
      takeUntil(this.destroy$)
    );

    merge(
      contentChange$,
      contentChange$.pipe(switchMap(() => merge(...this.items.map(i => i.inputChange$)).pipe(auditTime(16)))),
      this.resize$
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.prepareMatrix();
        this.cdr.markForCheck();
      });

    if (this.platform.isBrowser) {
      this.nzDomEventService
        .registerResizeListener()
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.nzDomEventService.unregisterResizeListener())
        )
        .subscribe(() => this.resize$.next());
    }
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

    const column = (this.realColumn = this.getColumn());
    const items = this.items.toArray();
    const length = items.length;
    const matrix: NzDescriptionsItemRenderProps[][] = [];
    const flushRow = () => {
      matrix.push(currentRow);
      currentRow = [];
      width = 0;
    };

    for (let i = 0; i < length; i++) {
      const item = items[i];
      const { nzTitle: title, content, nzSpan: span } = item;

      width += span;

      // If the last item make the row's length exceeds `nzColumn`, the last
      // item should take all the space left. This logic is implemented in the template.
      // Warn user about that.
      if (width >= column) {
        if (width > column) {
          warn(`"nzColumn" is ${column} but we have row length ${width}`);
        }
        currentRow.push({ title, content, span: column - (width - span) });
        flushRow();
      } else if (i === length - 1) {
        currentRow.push({ title, content, span: column - (width - span) });
        flushRow();
      } else {
        currentRow.push({ title, content, span });
      }
    }

    this.itemMatrix = matrix;
  }

  private matchMedia(): NzBreakpoint {
    let bp: NzBreakpoint = NzBreakpoint.md;

    Object.keys(responsiveMap).map((breakpoint: string) => {
      const castBP = breakpoint as NzBreakpoint;
      const matchBelow = this.mediaMatcher.matchMedia(responsiveMap[castBP]).matches;
      if (matchBelow) {
        bp = castBP;
      }
    });

    return bp;
  }

  private getColumn(): number {
    if (typeof this.nzColumn !== 'number') {
      return this.nzColumn[this.matchMedia()];
    }

    return this.nzColumn;
  }
}
