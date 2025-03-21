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
  linkedSignal,
  signal,
  booleanAttribute,
  ChangeDetectionStrategy
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, merge, Subject, takeUntil } from 'rxjs';
import { pairwise } from 'rxjs/operators';

import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import { getEventWithPoint } from 'ng-zorro-antd/resizable';

import { NzSplitterBarComponent } from './splitter-bar.component';
import { NzSplitterPanelComponent } from './splitter-panel.component';
import { NzSplitterCollapseOption, NzSplitterLayout } from './typings';
import { coerceCollapsible, getPercentValue, isPercent } from './utils';

interface PanelSize {
  // Calculated size of the panel in pixels, constrained by the min and max size.
  size: string | number | undefined;
  // Size in pixels
  postPxSize: number;
  // The percentage size of the panel, calculated based on the container size.
  percentage: number;
  // Original min size of the panel set by the user.
  min: string | number | undefined;
  // Original max size of the panel set by the user.
  max: string | number | undefined;
  // Post processed min size of the panel in percentage.
  postPercentMinSize: number;
  // Post processed max size of the panel in percentage.
  postPercentMaxSize: number;
}

interface ResizableInfo {
  resizable: boolean;
  collapsible: Required<NzSplitterCollapseOption>;
}

@Component({
  selector: 'nz-splitter',
  exportAs: 'nzSplitter',
  template: `
    @for (panel of panelProps(); let i = $index; track i; let last = $last) {
      @let size = sizes()[i];
      @let flexBasis = !!size.size ? size.size : 'auto';
      @let flexGrow = !!size.size ? 0 : 1;
      <div
        class="ant-splitter-panel"
        [class.ant-splitter-panel-hidden]="size.postPxSize === 0"
        [style.flex-basis]="flexBasis"
        [style.flex-grow]="flexGrow"
      >
        <ng-container *ngTemplateOutlet="panel.contentTemplate"></ng-container>
      </div>

      @if (!last) {
        @let resizableInfo = resizableInfos()[i];
        <div
          nz-splitter-bar
          [ariaNow]="size.percentage * 100"
          [ariaMin]="size.postPercentMinSize * 100"
          [ariaMax]="size.postPercentMaxSize * 100"
          [resizable]="resizableInfo.resizable"
          [collapsible]="resizableInfo.collapsible"
          [active]="movingIndex() === i"
          [vertical]="nzLayout() === 'vertical'"
          [lazy]="nzLazy()"
          [constrainedOffset]="constrainedOffset()"
          (offsetStart)="startResize(i, $event)"
          (collapse)="collapse(i, $event)"
        ></div>
      }
    }

    <!-- Fake mask for cursor -->
    @if (movingIndex() !== null) {
      <div
        aria-hidden
        class="ant-splitter-mask"
        [class.ant-splitter-mask-horizontal]="nzLayout() === 'horizontal'"
        [class.ant-splitter-mask-vertical]="nzLayout() === 'vertical'"
      ></div>
    }
  `,
  imports: [NgTemplateOutlet, NzSplitterBarComponent],
  providers: [NzDestroyService],
  host: {
    class: 'ant-splitter',
    '[class.ant-splitter-horizontal]': 'nzLayout() === "horizontal"',
    '[class.ant-splitter-vertical]': 'nzLayout() === "vertical"'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzSplitterComponent {
  /** ------------------- Props ------------------- */
  readonly nzLayout = input<NzSplitterLayout>('horizontal');
  readonly nzLazy = input(false, { transform: booleanAttribute });
  readonly nzResizeStart = output<number[]>();
  readonly nzResize = output<number[]>();
  readonly nzResizeEnd = output<number[]>();

  protected readonly destroy$ = inject(NzDestroyService);
  protected readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly resizeObserver = inject(NzResizeObserver);

  /** ------------------- Panels ------------------- */
  // Get all panels from content children
  protected readonly panels = contentChildren(NzSplitterPanelComponent);
  // Subscribe to the change of properties
  protected readonly panelProps = computed(() =>
    this.panels().map(panel => ({
      defaultSize: panel.nzDefaultSize(),
      size: panel.nzSize(),
      min: panel.nzMin(),
      max: panel.nzMax(),
      resizable: panel.nzResizable(),
      collapsible: coerceCollapsible(panel.nzCollapsible()),
      contentTemplate: panel.contentTemplate()
    }))
  );

  /** ------------------- Sizes ------------------- */
  /**
   * Observe the size of the container.
   */
  private readonly containerBox = toSignal(
    this.resizeObserver.observe(this.elementRef).pipe(
      map(([item]) => item.target as HTMLElement),
      map(el => ({ width: el.clientWidth, height: el.clientHeight }))
    ),
    {
      initialValue: {
        width: this.elementRef.nativeElement.clientWidth || 0,
        height: this.elementRef.nativeElement.clientHeight || 0
      }
    }
  );
  /**
   * The size of the container, used to calculate the percentage size and flex basis of each panel.
   */
  protected readonly containerSize = computed(() =>
    this.nzLayout() === 'horizontal' ? this.containerBox().width : this.containerBox().height
  );
  /**
   * Derived from defaultSize of each panel.
   * After that it will be updated by the resize event with **real** size in pixels.
   */
  protected readonly innerSizes = linkedSignal({
    source: this.panelProps,
    computation: source => source.map(panel => panel.defaultSize)
  });
  /**
   * Calculate the size of each panel based on the container size and the percentage size.
   */
  protected readonly sizes = computed(() => {
    let emptyCount = 0;
    const containerSize = this.containerSize();
    const innerSizes = this.innerSizes();
    /**
     * Get the calculated size, min and max percentage of each panel
     */
    const sizes = this.panelProps().map((panel, index) => {
      const size = panel.size ?? innerSizes[index];

      // Calculate the percentage size of each panel.
      let percentage: number | undefined;
      if (isPercent(size)) {
        percentage = getPercentValue(size);
      } else if (size || size === 0) {
        const num = Number(size);
        if (!isNaN(num)) {
          percentage = num / containerSize;
        }
      } else {
        percentage = undefined;
        emptyCount++;
      }

      // Calculate the min and max percentage size of each panel.
      const minSize = panel.min;
      const maxSize = panel.max;
      const postPercentMinSize = isPercent(minSize) ? getPercentValue(minSize) : (minSize || 0) / containerSize;
      const postPercentMaxSize = isPercent(maxSize)
        ? getPercentValue(maxSize)
        : (maxSize || containerSize) / containerSize;

      return {
        size,
        percentage,
        min: minSize,
        max: maxSize,
        postPercentMinSize,
        postPercentMaxSize
      } as PanelSize;
    });

    /**
     * Normalize the percentage size of each panel if the total percentage is larger than 1 or smaller than 1.
     */
    const totalPercentage = sizes.reduce((acc, { percentage }) => acc + (percentage ?? 0), 0);

    for (const size of sizes) {
      if (totalPercentage > 1 && !emptyCount) {
        // If total percentage is larger than 1, we will scale it down.
        const scale = 1 / totalPercentage;
        size.percentage = size.percentage === undefined ? 0 : size.percentage * scale;
      } else {
        // If total percentage is smaller than 1, we will fill the rest.
        const averagePercentage = (1 - totalPercentage) / emptyCount;
        size.percentage = size.percentage === undefined ? averagePercentage : size.percentage;
      }

      size.postPxSize = size.percentage * containerSize;
      size.size = containerSize ? coerceCssPixelValue(size.postPxSize) : size.size;
    }

    return sizes;
  });

  private getPxSizes(): number[] {
    return this.sizes().map(s => s.postPxSize);
  }

  /** ------------------ Resize ------------------ */
  /**
   * The index of the panel that is being resized.
   * @note Mark the moving splitter bar as activated to show the dragging effect even if the mouse is outside the
   * splitter container.
   */
  protected readonly movingIndex = signal<number | null>(null);
  /**
   * The offset of preview position (lazy mode) when dragging the splitter bar.
   * Constrained by the min and max size of the target panel.
   */
  protected readonly constrainedOffset = signal<number>(0);
  /**
   * The resizable information of each splitter bar.
   */
  protected readonly resizableInfos = computed(() => {
    const items = this.panelProps();
    const pxSizes = this.getPxSizes();

    const resizeInfos: ResizableInfo[] = [];

    for (let i = 0; i < items.length - 1; i += 1) {
      const prevItem = items[i];
      const nextItem = items[i + 1];
      const prevSize = pxSizes[i];
      const nextSize = pxSizes[i + 1];

      const { resizable: prevResizable = true, min: prevMin, collapsible: prevCollapsible } = prevItem;
      const { resizable: nextResizable = true, min: nextMin, collapsible: nextCollapsible } = nextItem;

      const mergedResizable =
        // Both need to be resizable
        prevResizable &&
        nextResizable &&
        // Prev is not collapsed and limit min size
        (prevSize !== 0 || !prevMin) &&
        // Next is not collapsed and limit min size
        (nextSize !== 0 || !nextMin);

      const startCollapsible =
        // Self is collapsible
        (prevCollapsible.end && prevSize > 0) ||
        // Collapsed and can be collapsed
        (nextCollapsible.start && nextSize === 0 && prevSize > 0);

      const endCollapsible =
        // Self is collapsible
        (nextCollapsible.start && nextSize > 0) ||
        // Collapsed and can be collapsed
        (prevCollapsible.end && prevSize === 0 && nextSize > 0);

      resizeInfos[i] = {
        resizable: mergedResizable,
        collapsible: {
          start: !!startCollapsible,
          end: !!endCollapsible
        }
      };
    }

    return resizeInfos;
  });

  /**
   * Handle the resize start event for the specified panel.
   * @param index The index of the panel.
   * @param startPos The start position of the resize event.
   */
  protected startResize(index: number, startPos: [x: number, y: number]): void {
    this.movingIndex.set(index);
    this.nzResizeStart.emit(this.getPxSizes());
    const end$ = new Subject<void>();

    // Updated constraint calculation
    const getConstrainedOffset = (rawOffset: number): number => {
      const { percentage, postPercentMinSize, postPercentMaxSize } = this.sizes()[index];
      const [ariaNow, ariaMin, ariaMax] = [percentage, postPercentMinSize, postPercentMaxSize].map(p => p * 100);

      const containerSize = this.containerSize();
      const currentPos = (containerSize * ariaNow) / 100;
      const newPos = currentPos + rawOffset;

      // Calculate available space
      const minAllowed = Math.max(0, (containerSize * ariaMin) / 100);
      const maxAllowed = Math.min(containerSize, (containerSize * ariaMax) / 100);

      // Constrain new position within bounds
      const clampedPos = Math.max(minAllowed, Math.min(maxAllowed, newPos));
      return clampedPos - currentPos;
    };

    const handleLazyMove = (offset: number): void => {
      this.constrainedOffset.set(getConstrainedOffset(offset));
    };

    const handleLazyEnd = (): void => {
      this.updateOffset(index, this.constrainedOffset());
      this.constrainedOffset.set(0);
    };

    // resizing
    merge(
      fromEventOutsideAngular<MouseEvent>(window, 'mousemove', { passive: true }),
      fromEventOutsideAngular<TouchEvent>(window, 'touchmove', { passive: true })
    )
      .pipe(
        map(event => getEventWithPoint(event)),
        map(({ pageX, pageY }) => (this.nzLayout() === 'horizontal' ? pageX - startPos[0] : pageY - startPos[1])),
        pairwise(),
        takeUntil(merge(end$, this.destroy$))
      )
      .subscribe(([prev, next]) => {
        if (this.nzLazy()) {
          handleLazyMove(next);
        } else {
          const deltaOffset = next - prev;
          // filter out the 0 delta offset
          if (deltaOffset !== 0) {
            this.updateOffset(index, deltaOffset);
          }
        }
      });

    // resize end
    merge(
      fromEventOutsideAngular<MouseEvent>(window, 'mouseup'),
      fromEventOutsideAngular<TouchEvent>(window, 'touchend')
    )
      .pipe(takeUntil(merge(end$, this.destroy$)))
      .subscribe(() => {
        if (this.nzLazy()) {
          handleLazyEnd();
        }
        this.movingIndex.set(null);
        this.nzResize.emit(this.getPxSizes());
        end$.next();
      });
  }

  /**
   * Update the sizes of specified panels based on the move offset.
   * @param index The index of the panel.
   * @param offset The move offset in pixels.
   */
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
    this.nzResize.emit(pxSizes);
  }

  /**
   * Collapse the specified panel.
   * @param index The index of the panel to collapse.
   * @param type The type of collapse, either `start` or `end`.
   */
  collapse(index: number, type: 'start' | 'end'): void {
    const containerSize = this.containerSize();
    const limitSizes = this.sizes().map(p => [p.min, p.max]);
    const currentSizes = this.sizes().map(p => p.percentage * containerSize);

    const currentIndex = type === 'start' ? index : index + 1;
    const targetIndex = type == 'start' ? index + 1 : index;
    const currentSize = currentSizes[currentIndex];
    const targetSize = currentSizes[targetIndex];

    const getLimitSize = (size: string | number | undefined, defaultLimit: number): number => {
      if (typeof size === 'string') {
        return getPercentValue(size) * containerSize;
      }
      return size ?? defaultLimit;
    };

    if (currentSize !== 0 && targetSize !== 0) {
      // Collapse directly
      currentSizes[currentIndex] = 0;
      currentSizes[targetIndex] += currentSize;
    } else {
      const totalSize = currentSize + targetSize;

      const currentSizeMin = getLimitSize(limitSizes[currentIndex][0], 0);
      const currentSizeMax = getLimitSize(limitSizes[currentIndex][1], containerSize);
      const targetSizeMin = getLimitSize(limitSizes[targetIndex][0], 0);
      const targetSizeMax = getLimitSize(limitSizes[targetIndex][1], containerSize);

      const limitStart = Math.max(currentSizeMin, totalSize - targetSizeMax);
      const limitEnd = Math.min(currentSizeMax, totalSize - targetSizeMin);
      const halfOffset = (limitEnd - limitStart) / 2;

      currentSizes[currentIndex] -= halfOffset;
      currentSizes[targetIndex] += halfOffset;
    }

    this.innerSizes.set(currentSizes);
    this.nzResize.emit(currentSizes);
  }
}
