/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  DestroyRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { auditTime, startWith, switchMap, tap } from 'rxjs/operators';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzBreakpointEnum, NzBreakpointService, gridResponsiveMap } from 'ng-zorro-antd/core/services';

import { NzDescriptionsItemComponent } from './descriptions-item.component';
import { NzDescriptionsItemRenderProps, NzDescriptionsLayout, NzDescriptionsSize } from './typings';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'descriptions';
const defaultColumnMap: Record<NzBreakpointEnum, number> = {
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
  exportAs: 'nzDescriptions',
  template: `
    @if (nzTitle || nzExtra) {
      <div class="ant-descriptions-header">
        @if (nzTitle) {
          <div class="ant-descriptions-title">
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </div>
        }
        @if (nzExtra) {
          <div class="ant-descriptions-extra">
            <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
          </div>
        }
      </div>
    }

    <div class="ant-descriptions-view">
      <table>
        <tbody>
          @if (nzLayout === 'horizontal') {
            @for (row of itemMatrix; track row; let i = $index) {
              <tr class="ant-descriptions-row">
                @for (item of row; track item; let isLast = $last) {
                  @if (!nzBordered) {
                    <td class="ant-descriptions-item" [colSpan]="item.span">
                      <div class="ant-descriptions-item-container">
                        <span class="ant-descriptions-item-label" [class.ant-descriptions-item-no-colon]="!nzColon">
                          <ng-container *nzStringTemplateOutlet="item.title">
                            {{ item.title }}
                          </ng-container>
                        </span>
                        <span class="ant-descriptions-item-content">
                          <ng-template [ngTemplateOutlet]="item.content" />
                        </span>
                      </div>
                    </td>
                  } @else {
                    <td class="ant-descriptions-item-label">
                      <ng-container *nzStringTemplateOutlet="item.title">
                        {{ item.title }}
                      </ng-container>
                    </td>
                    <td class="ant-descriptions-item-content" [colSpan]="item.span * 2 - 1">
                      <ng-template [ngTemplateOutlet]="item.content" />
                    </td>
                  }
                }
              </tr>
            }
          }

          @if (nzLayout === 'vertical') {
            @if (!nzBordered) {
              @for (row of itemMatrix; track row; let i = $index) {
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item" [colSpan]="item.span">
                      <div class="ant-descriptions-item-container">
                        <span class="ant-descriptions-item-label" [class.ant-descriptions-item-no-colon]="!nzColon">
                          <ng-container *nzStringTemplateOutlet="item.title">
                            {{ item.title }}
                          </ng-container>
                        </span>
                      </div>
                    </td>
                  }
                </tr>
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item" [colSpan]="item.span">
                      <div class="ant-descriptions-item-container">
                        <span class="ant-descriptions-item-content">
                          <ng-template [ngTemplateOutlet]="item.content" />
                        </span>
                      </div>
                    </td>
                  }
                </tr>
              }
            } @else {
              @for (row of itemMatrix; track row; let i = $index) {
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item-label" [colSpan]="item.span">
                      <ng-container *nzStringTemplateOutlet="item.title">
                        {{ item.title }}
                      </ng-container>
                    </td>
                  }
                </tr>
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item-content" [colSpan]="item.span">
                      <ng-template [ngTemplateOutlet]="item.content" />
                    </td>
                  }
                </tr>
              }
            }
          }
        </tbody>
      </table>
    </div>
  `,
  host: {
    class: 'ant-descriptions',
    '[class.ant-descriptions-bordered]': 'nzBordered',
    '[class.ant-descriptions-middle]': 'nzSize === "middle"',
    '[class.ant-descriptions-small]': 'nzSize === "small"',
    '[class.ant-descriptions-rtl]': 'dir === "rtl"'
  },
  imports: [NzOutletModule, NgTemplateOutlet]
})
export class NzDescriptionsComponent implements OnChanges, AfterContentInit, OnInit {
  public nzConfigService = inject(NzConfigService);
  private cdr = inject(ChangeDetectorRef);
  private breakpointService = inject(NzBreakpointService);
  private directionality = inject(Directionality);
  private destroyRef = inject(DestroyRef);
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @ContentChildren(NzDescriptionsItemComponent) items!: QueryList<NzDescriptionsItemComponent>;

  @Input({ transform: booleanAttribute }) @WithConfig() nzBordered: boolean = false;
  @Input() nzLayout: NzDescriptionsLayout = 'horizontal';
  @Input() @WithConfig() nzColumn: number | Record<NzBreakpointEnum, number> = defaultColumnMap;
  @Input() @WithConfig() nzSize: NzDescriptionsSize = 'default';
  @Input() nzTitle: string | TemplateRef<void> = '';
  @Input() nzExtra?: string | TemplateRef<void>;
  @Input({ transform: booleanAttribute }) @WithConfig() nzColon: boolean = true;

  itemMatrix: NzDescriptionsItemRenderProps[][] = [];
  realColumn = 3;
  dir: Direction = 'ltr';

  private breakpoint: NzBreakpointEnum = NzBreakpointEnum.md;

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzColumn) {
      this.prepareMatrix();
    }
  }

  ngAfterContentInit(): void {
    const contentChange$ = this.items.changes.pipe(startWith(this.items));

    merge(
      contentChange$,
      contentChange$.pipe(switchMap(() => merge(...this.items.map(i => i.inputChange$)).pipe(auditTime(16)))),
      this.breakpointService.subscribe(gridResponsiveMap).pipe(tap(bp => (this.breakpoint = bp)))
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.prepareMatrix();
        this.cdr.markForCheck();
      });
  }

  /**
   * Prepare the render matrix according to description items' spans.
   */
  private prepareMatrix(): void {
    if (!this.items) {
      return;
    }

    let currentRow: NzDescriptionsItemRenderProps[] = [];
    let width = 0;

    const column = (this.realColumn = this.getColumn());
    const items = this.items.toArray();
    const length = items.length;
    const matrix: NzDescriptionsItemRenderProps[][] = [];
    const flushRow = (): void => {
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

  private getColumn(): number {
    if (typeof this.nzColumn !== 'number') {
      return this.nzColumn[this.breakpoint];
    }

    return this.nzColumn;
  }
}
