/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
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
  TemplateRef,
  booleanAttribute
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzSpaceItemDirective } from './space-item.directive';
import { NzSpaceAlign, NzSpaceDirection, NzSpaceSize, NzSpaceType } from './types';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'space';
const SPACE_SIZE: Record<NzSpaceType, number> = {
  small: 8,
  middle: 16,
  large: 24
};

@Component({
  selector: 'nz-space, [nz-space]',
  exportAs: 'nzSpace',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
    @for (item of items; track item; let last = $last; let index = $index) {
      <div
        class="ant-space-item"
        [style.margin-bottom.px]="nzDirection === 'vertical' ? (last ? null : spaceSize) : null"
        [style.margin-right.px]="nzDirection === 'horizontal' ? (last ? null : spaceSize) : null"
      >
        <ng-container [ngTemplateOutlet]="item"></ng-container>
      </div>
      @if (nzSplit && !last) {
        <span
          class="ant-space-split"
          [style.margin-bottom.px]="nzDirection === 'vertical' ? (last ? null : spaceSize) : null"
          [style.margin-right.px]="nzDirection === 'horizontal' ? (last ? null : spaceSize) : null"
        >
          <ng-template [nzStringTemplateOutlet]="nzSplit" [nzStringTemplateOutletContext]="{ $implicit: index }">{{
            nzSplit
          }}</ng-template>
        </span>
      }
    }
  `,
  host: {
    class: 'ant-space',
    '[class.ant-space-horizontal]': 'nzDirection === "horizontal"',
    '[class.ant-space-vertical]': 'nzDirection === "vertical"',
    '[class.ant-space-align-start]': 'mergedAlign === "start"',
    '[class.ant-space-align-end]': 'mergedAlign === "end"',
    '[class.ant-space-align-center]': 'mergedAlign === "center"',
    '[class.ant-space-align-baseline]': 'mergedAlign === "baseline"',
    '[style.flex-wrap]': 'nzWrap ? "wrap" : null'
  },
  imports: [NgTemplateOutlet, NzStringTemplateOutletDirective]
})
export class NzSpaceComponent implements OnChanges, OnDestroy, AfterContentInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @Input() nzDirection: NzSpaceDirection = 'horizontal';
  @Input() nzAlign?: NzSpaceAlign;
  @Input() nzSplit: TemplateRef<{ $implicit: number }> | string | null = null;
  @Input({ transform: booleanAttribute }) nzWrap: boolean = false;
  @Input() @WithConfig() nzSize: NzSpaceSize = 'small';

  @ContentChildren(NzSpaceItemDirective, { read: TemplateRef }) items!: QueryList<TemplateRef<NzSafeAny>>;

  mergedAlign?: NzSpaceAlign;
  spaceSize: number = SPACE_SIZE.small;
  private destroy$ = new Subject<boolean>();

  constructor(
    public nzConfigService: NzConfigService,
    private cdr: ChangeDetectorRef
  ) {}

  private updateSpaceItems(): void {
    const numberSize = typeof this.nzSize === 'string' ? SPACE_SIZE[this.nzSize] : this.nzSize;
    this.spaceSize = numberSize / (this.nzSplit ? 2 : 1);
    this.cdr.markForCheck();
  }

  ngOnChanges(): void {
    this.updateSpaceItems();
    this.mergedAlign = this.nzAlign === undefined && this.nzDirection === 'horizontal' ? 'center' : this.nzAlign;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngAfterContentInit(): void {
    this.updateSpaceItems();
    this.items.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }
}
