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
  DestroyRef,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  TemplateRef,
  booleanAttribute,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    <ng-content />
    @for (item of items; track item) {
      <div class="ant-space-item">
        <ng-container [ngTemplateOutlet]="item" />
      </div>
      @if (nzSplit && !$last) {
        <span class="ant-space-split">
          <ng-template [nzStringTemplateOutlet]="nzSplit" [nzStringTemplateOutletContext]="{ $implicit: $index }">{{
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
    '[style.flex-wrap]': 'nzWrap ? "wrap" : null',
    '[style.column-gap.px]': 'horizontalSize',
    '[style.row-gap.px]': 'verticalSize'
  },
  imports: [NgTemplateOutlet, NzStringTemplateOutletDirective]
})
export class NzSpaceComponent implements OnChanges, AfterContentInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  nzConfigService = inject(NzConfigService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  @Input() nzDirection: NzSpaceDirection = 'horizontal';
  @Input() nzAlign?: NzSpaceAlign;
  @Input() nzSplit: TemplateRef<{ $implicit: number }> | string | null = null;
  @Input({ transform: booleanAttribute }) nzWrap: boolean = false;
  @Input() @WithConfig() nzSize: NzSpaceSize | [NzSpaceSize, NzSpaceSize] = 'small';

  @ContentChildren(NzSpaceItemDirective, { read: TemplateRef }) items!: QueryList<TemplateRef<NzSafeAny>>;

  mergedAlign?: NzSpaceAlign;
  horizontalSize!: number;
  verticalSize!: number;

  constructor() {
    this.updateSpaceSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzSize } = changes;
    if (nzSize) {
      this.updateSpaceSize();
    }
    this.mergedAlign = this.nzAlign === undefined && this.nzDirection === 'horizontal' ? 'center' : this.nzAlign;
  }

  ngAfterContentInit(): void {
    this.items.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  private updateSpaceSize(): void {
    const { horizontalSize, verticalSize } = normalizeSpaceSize(this.nzSize);
    this.horizontalSize = horizontalSize;
    this.verticalSize = verticalSize;
  }
}

function normalizeSpaceSize(size: NzSpaceSize | [NzSpaceSize, NzSpaceSize]): {
  horizontalSize: number;
  verticalSize: number;
} {
  const [horizontalSize, verticalSize] = (Array.isArray(size) ? size : ([size, size] as const)).map(s =>
    typeof s === 'number' ? s : SPACE_SIZE[s]
  );
  return { horizontalSize, verticalSize };
}
