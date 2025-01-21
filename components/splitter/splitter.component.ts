/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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
  computed,
  Injectable
} from '@angular/core';

import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NgStyleInterface } from 'ng-zorro-antd/core/types';

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
}

@Injectable()
export class NzSplitterResizeService {
  constructor() {}
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
      @let flexGrow = !!size.size ? '0' : '1';
      <div class="ant-splitter-panel" [style.flex-basis]="flexBasis" [style.flex-grow]="flexGrow">
        <ng-container *ngTemplateOutlet="panel.contentTemplate()"></ng-container>
      </div>
      @if (!last) {
        <div
          class="ant-splitter-bar"
          role="separator"
          [attr.aria-valuenow]="panel.nzMin()"
          [attr.aria-valuemin]="panel.nzMin()"
          [attr.aria-valuemax]="panel.nzMax()"
        >
          <div class="ant-splitter-bar-dragger"></div>
        </div>
      }
    }
  `,
  imports: [NgTemplateOutlet],
  providers: [
    NzDestroyService,
    NzSplitterResizeService,
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
  nzLayout = input<NzSplitterLayout>('horizontal');
  nzLazy = input<boolean>(false);
  readonly nzResizeStart = output<number[]>();
  readonly nzResize = output<number[]>();
  readonly nzResizeEnd = output<number[]>();

  readonly panels = contentChildren(NzSplitterPanelComponent);
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  containerSize = computed(() =>
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

      const percentage = isPercent(size)
        ? getPercentValue(size)
        : size || size === 0
          ? size / containerSize
          : undefined;
      if (percentage === undefined) {
        emptyCount++;
      }

      return {
        innerSize,
        size,
        hasSize,
        percentage
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
      size.postPxSize = `${size.percentage * containerSize}px`;
      size.size = containerSize ? size.postPxSize : size.size;
    });

    return sizes;
  });

  protected style(index: number): NgStyleInterface {
    const containerSize =
      this.nzLayout() === 'horizontal'
        ? this.elementRef.nativeElement.clientWidth
        : this.elementRef.nativeElement.clientHeight;
    const size = this.panels()[index].nzSize() ?? this.panels()[index].nzDefaultSize();
    console.log(containerSize, size);
    const hasSize = size !== undefined;
    return {
      'flex-basis': hasSize ? this.getFlexBasis(size, containerSize) : 'auto',
      'flex-grow': hasSize ? 0 : 1
    };
  }

  private getFlexBasis(size: number | string | undefined, containerSize: number): string {
    if (isPercent(size)) {
      return `${getPercentValue(size) * containerSize}px`;
    } else {
      return `${size}px`;
    }
  }
}
