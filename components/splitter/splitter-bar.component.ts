/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';

import { getEventWithPoint } from 'ng-zorro-antd/resizable';

@Component({
  selector: '[nz-splitter-bar]',
  template: `
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

  readonly offsetStart = output<[x: number, y: number]>();

  protected resizeStartEvent(event: MouseEvent | TouchEvent): void {
    if (this.resizable()) {
      const { pageX, pageY } = getEventWithPoint(event);
      this.offsetStart.emit([pageX, pageY]);
    }
  }
}
