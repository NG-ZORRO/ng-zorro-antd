/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, computed, input, output, ViewEncapsulation } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { getEventWithPoint } from 'ng-zorro-antd/resizable';

import { NzSplitterCollapseOption } from './typings';

@Component({
  selector: '[nz-splitter-bar]',
  imports: [NzIconModule],
  template: `
    @if (lazy()) {
      @let preview = active() && !!this.constrainedOffset();
      <div
        class="ant-splitter-bar-preview"
        [class.ant-splitter-bar-preview-active]="preview"
        [style.transform]="preview ? previewTransform() : null"
      ></div>
    }

    <div
      class="ant-splitter-bar-dragger"
      [class.ant-splitter-bar-dragger-disabled]="!resizable()"
      [class.ant-splitter-bar-dragger-active]="active()"
      (mousedown)="resizeStartEvent($event)"
      (touchstart)="resizeStartEvent($event)"
    ></div>

    @if (collapsible()?.start) {
      <div class="ant-splitter-bar-collapse-bar ant-splitter-bar-collapse-bar-start" (click)="collapseEvent('start')">
        <nz-icon
          [nzType]="vertical() ? 'up' : 'left'"
          class="ant-splitter-bar-collapse-icon ant-splitter-bar-collapse-start"
        />
      </div>
    }

    @if (collapsible()?.end) {
      <div class="ant-splitter-bar-collapse-bar ant-splitter-bar-collapse-bar-end" (click)="collapseEvent('end')">
        <nz-icon
          [nzType]="vertical() ? 'down' : 'right'"
          class="ant-splitter-bar-collapse-icon ant-splitter-bar-collapse-end"
        />
      </div>
    }
  `,
  host: {
    role: 'separator',
    class: 'ant-splitter-bar',
    '[attr.aria-valuenow]': 'getValidNumber(ariaNow())',
    '[attr.aria-valuemin]': 'getValidNumber(ariaMin())',
    '[attr.aria-valuemax]': 'getValidNumber(ariaMax())'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzSplitterBarComponent {
  readonly ariaNow = input.required<number>();
  readonly ariaMin = input.required<number>();
  readonly ariaMax = input.required<number>();
  readonly active = input(false);
  readonly resizable = input(true);
  readonly vertical = input<boolean>();
  readonly lazy = input(false);
  readonly collapsible = input<NzSplitterCollapseOption>();
  readonly constrainedOffset = input<number>();

  readonly offsetStart = output<[x: number, y: number]>();
  readonly collapse = output<'start' | 'end'>();

  protected readonly previewTransform = computed(() => {
    const offset = coerceCssPixelValue(this.constrainedOffset());
    return this.vertical() ? `translateY(${offset})` : `translateX(${offset})`;
  });

  protected resizeStartEvent(event: MouseEvent | TouchEvent): void {
    if (this.resizable()) {
      const { pageX, pageY } = getEventWithPoint(event);
      this.offsetStart.emit([pageX, pageY]);
    }
  }

  protected collapseEvent(type: 'start' | 'end'): void {
    this.collapse.emit(type);
  }

  protected getValidNumber(num: number | undefined): number {
    return typeof num === 'number' && !isNaN(num) ? Math.round(num) : 0;
  }
}
