/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, computed, input, output, ViewEncapsulation } from '@angular/core';

import { getEventWithPoint } from 'ng-zorro-antd/resizable';

@Component({
  selector: '[nz-splitter-bar]',
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
  `,
  host: {
    role: 'separator',
    class: 'ant-splitter-bar',
    '[attr.aria-valuenow]': 'ariaNow()',
    '[attr.aria-valuemin]': 'ariaMin()',
    '[attr.aria-valuemax]': 'ariaMax()'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzSplitterBarComponent {
  ariaNow = input.required<number>();
  ariaMin = input.required<number>();
  ariaMax = input.required<number>();
  active = input(false);
  resizable = input(true);
  vertical = input<boolean>();
  lazy = input(false);
  constrainedOffset = input<number>();

  readonly previewTransform = computed(() => {
    const offset = coerceCssPixelValue(this.constrainedOffset());
    return this.vertical() ? `translateY(${offset})` : `translateX(${offset})`;
  });

  readonly offsetStart = output<[x: number, y: number]>();

  protected resizeStartEvent(event: MouseEvent | TouchEvent): void {
    if (this.resizable()) {
      const { pageX, pageY } = getEventWithPoint(event);
      this.offsetStart.emit([pageX, pageY]);
    }
  }
}
