/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChildren,
  ElementRef,
  input,
  output,
  ViewEncapsulation,
  inject,
  signal,
  computed
} from '@angular/core';

import { NzDestroyService } from 'ng-zorro-antd/core/services';

import { NzSplitterBarComponent } from './splitter-bar.component';
import { NzSplitterPanelComponent } from './splitter-panel.component';
import { NZ_SPLITTER_PANEL_LIST } from './tokens';
import { NzSplitterLayout } from './typings';
import { getPercentValue, isPercent } from './utils';

interface PanelSize {
  innerSize: number;
  size: number | string | undefined;
  hasSize: boolean;
  percentage: number;
  postPxSize: string;
  postPercentMinSize: number;
  postPercentMaxSize: number;
}

@Component({
  selector: 'nz-splitter',
  exportAs: 'nzSplitter',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>

    @for (panel of panels(); let i = $index; track i; let last = $last) {
      @let size = sizes()[i];
      @let flexBasis = !!size.size ? size.size : 'auto';
      @let flexGrow = !!size.size ? 0 : 1;
      <div class="ant-splitter-panel" [style.flex-basis]="flexBasis" [style.flex-grow]="flexGrow">
        <ng-container *ngTemplateOutlet="panel.contentTemplate()"></ng-container>
      </div>

      @if (!last) {
        <div
          nz-splitter-bar
          [ariaNow]="size.percentage * 100"
          [ariaMin]="size.postPercentMinSize * 100"
          [ariaMax]="size.postPercentMaxSize * 100"
        >
        </div>
      }
    }
  `,
  imports: [NgTemplateOutlet, NzSplitterBarComponent],
  providers: [
    NzDestroyService,
    {
      provide: NZ_SPLITTER_PANEL_LIST,
      useValue: signal([])
    }
  ],
  host: {
    class: 'ant-splitter',
    '[class.ant-splitter-horizontal]': 'nzLayout() === "horizontal"',
    '[class.ant-splitter-vertical]': 'nzLayout() !== "horizontal"'
  }
})
export class NzSplitterComponent {
  /** ------------------- Props ------------------- */
  nzLayout = input<NzSplitterLayout>('horizontal');
  nzLazy = input<boolean>(false);
  readonly nzResizeStart = output<number[]>();
  readonly nzResize = output<number[]>();
  readonly nzResizeEnd = output<number[]>();

  readonly panels = contentChildren(NzSplitterPanelComponent);
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /** ------------------- Sizes ------------------- */
  /**
   * The size of the container, used to calculate the percentage size and flex basis of each panel.
   */
  readonly containerSize = computed(() =>
    this.nzLayout() === 'horizontal'
      ? this.elementRef.nativeElement.clientWidth || 0
      : this.elementRef.nativeElement.clientHeight || 0
  );
  readonly sizes = computed(() => {
    let emptyCount = 0;
    const containerSize = this.containerSize();
    const sizes = this.panels().map(panel => {
      const innerSize = panel.nzDefaultSize();
      const size = panel.nzSize() ?? innerSize;
      const hasSize = panel.nzSize() !== undefined;

      // Calculate the percentage size of each panel.
      const percentage = isPercent(size)
        ? getPercentValue(size)
        : typeof size === 'number' && (size || size === 0)
          ? size / containerSize
          : undefined;
      if (percentage === undefined) {
        emptyCount++;
      }

      // Calculate the min and max percentage size of each panel.
      const minSize = panel.nzMin();
      const maxSize = panel.nzMax();
      const postPercentMinSize = isPercent(minSize) ? getPercentValue(minSize) : (minSize || 0) / containerSize;
      const postPercentMaxSize = isPercent(maxSize)
        ? getPercentValue(maxSize)
        : (maxSize || containerSize) / containerSize;

      return {
        innerSize,
        size,
        hasSize,
        percentage,
        postPercentMinSize,
        postPercentMaxSize
      } as PanelSize;
    });

    const totalPercentage = sizes.reduce((acc, { percentage }) => acc + (percentage ?? 0), 0);

    if (totalPercentage > 1 && !emptyCount) {
      // If total percentage is larger than 1, we will scale it down.
      const scale = 1 / totalPercentage;
      sizes.forEach(size => {
        size.percentage = size.percentage === undefined ? 0 : size.percentage * scale;
      });
    } else {
      // If total percentage is smaller than 1, we will fill the rest.
      const averagePercentage = (1 - totalPercentage) / emptyCount;
      sizes.forEach(size => {
        size.percentage = size.percentage === undefined ? averagePercentage : size.percentage;
      });
    }

    sizes.forEach(size => {
      size.postPxSize = coerceCssPixelValue(size.percentage * containerSize);
      size.size = containerSize ? size.postPxSize : size.size;
    });

    return sizes;
  });
}
