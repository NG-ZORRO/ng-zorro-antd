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
  computed,
  linkedSignal
} from '@angular/core';
import { map, merge, Subject, takeUntil } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';

import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import { getEventWithPoint } from 'ng-zorro-antd/resizable';

import { NzSplitterBarComponent } from './splitter-bar.component';
import { NzSplitterPanelComponent } from './splitter-panel.component';
import { NzSplitterLayout } from './typings';
import { getPercentValue, isPercent } from './utils';

interface PanelSize {
  innerSize: number;
  size: number | string | undefined;
  hasSize: boolean;
  postPxSize: string;
  percentage: number;
  min: number | string | undefined;
  max: number | string | undefined;
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
        @for (prop of debug(size); track prop) {
          <div>{{ prop }}</div>
        }
        <ng-container *ngTemplateOutlet="panel.contentTemplate()"></ng-container>
      </div>

      @if (!last) {
        <div
          nz-splitter-bar
          [ariaNow]="size.percentage * 100"
          [ariaMin]="size.postPercentMinSize * 100"
          [ariaMax]="size.postPercentMaxSize * 100"
          [resizable]="panel.nzResizable()"
          (offsetStart)="startResize(i, $event)"
        >
        </div>
      }
    }
  `,
  imports: [NgTemplateOutlet, NzSplitterBarComponent],
  providers: [NzDestroyService],
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
  readonly destroy$ = inject(NzDestroyService);
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly debug = (obj: NzSafeAny): string[] => Object.entries(obj).map(([key, value]) => `${key}: ${value}`);

  /** ------------------- Sizes ------------------- */
  /**
   * The size of the container, used to calculate the percentage size and flex basis of each panel.
   */
  readonly containerSize = computed(() =>
    this.nzLayout() === 'horizontal'
      ? this.elementRef.nativeElement.clientWidth || 0
      : this.elementRef.nativeElement.clientHeight || 0
  );
  readonly innerSizes = linkedSignal({
    source: this.panels,
    computation: source => source.map(panel => panel.nzDefaultSize())
  });
  readonly sizes = computed(() => {
    let emptyCount = 0;
    const containerSize = this.containerSize();
    const innerSizes = this.innerSizes();
    const sizes = this.panels().map((panel, index) => {
      const innerSize = innerSizes[index];
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
        min: minSize,
        max: maxSize,
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

  /** ------------------ Resize ------------------ */
  /**
   * Handle the resize start event for the specified panel.
   * @param index The index of the panel.
   * @param startPos The start position of the resize event.
   */
  startResize(index: number, startPos: [x: number, y: number]): void {
    this.nzResizeStart.emit([index, ...startPos]);
    const end$ = new Subject<void>();

    // resizing
    merge(
      fromEventOutsideAngular<MouseEvent>(window, 'mousemove', { passive: true }),
      fromEventOutsideAngular<TouchEvent>(window, 'touchmove', { passive: true })
    )
      .pipe(
        map(event => getEventWithPoint(event)),
        map(({ pageX, pageY }) => (this.nzLayout() === 'horizontal' ? pageX - startPos[0] : pageY - startPos[1])),
        pairwise(),
        // delta offset
        map(([prev, next]) => next - prev),
        // filter out the 0 delta offset
        filter(Boolean),
        takeUntil(merge(end$, this.destroy$))
      )
      .subscribe(offset => this.updateOffset(index, offset));

    // resize end
    merge(
      fromEventOutsideAngular<MouseEvent>(window, 'mouseup'),
      fromEventOutsideAngular<TouchEvent>(window, 'touchend')
    )
      .pipe(takeUntil(merge(end$, this.destroy$)))
      .subscribe(() => {
        this.endResize(index);
        end$.next();
      });
  }

  private updateOffset(index: number, offset: number): void {
    const containerSize = this.containerSize();
    const limitSizes = this.sizes().map(p => [p.min, p.max]);
    const pxSizes = this.sizes().map(p => p.percentage * containerSize);

    const getLimitSize = (size: string | number | undefined, defaultLimit: number): number => {
      if (typeof size === 'string') {
        return getPercentValue(size) * containerSize;
      }
      return size ?? defaultLimit;
    };

    const nextIndex = index + 1;

    // Get boundary
    const startMinSize = getLimitSize(limitSizes[index][0], 0);
    const endMinSize = getLimitSize(limitSizes[nextIndex][0], 0);
    const startMaxSize = getLimitSize(limitSizes[index][1], containerSize);
    const endMaxSize = getLimitSize(limitSizes[nextIndex][1], containerSize);

    let mergedOffset = offset;

    // Align with the boundary
    if (pxSizes[index] + mergedOffset < startMinSize) {
      mergedOffset = startMinSize - pxSizes[index];
    }
    if (pxSizes[nextIndex] - mergedOffset < endMinSize) {
      mergedOffset = pxSizes[nextIndex] - endMinSize;
    }
    if (pxSizes[index] + mergedOffset > startMaxSize) {
      mergedOffset = startMaxSize - pxSizes[index];
    }
    if (pxSizes[nextIndex] - mergedOffset > endMaxSize) {
      mergedOffset = pxSizes[nextIndex] - endMaxSize;
    }

    // Do offset
    pxSizes[index] += mergedOffset;
    pxSizes[nextIndex] -= mergedOffset;
    this.innerSizes.set(pxSizes);
  }

  private endResize(index: number): void {
    this.nzResizeEnd.emit([index]);
  }
}
