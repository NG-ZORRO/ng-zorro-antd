/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: '[nz-rate-item]',
  exportAs: 'nzRateItem',
  template: `
    <div
      class="ant-rate-star-second"
      (mouseover)="hoverRate(false); $event.stopPropagation()"
      (click)="clickRate(false)"
    >
      <ng-template
        [ngTemplateOutlet]="character || defaultCharacter"
        [ngTemplateOutletContext]="{ $implicit: index }"
      ></ng-template>
    </div>
    <div class="ant-rate-star-first" (mouseover)="hoverRate(true); $event.stopPropagation()" (click)="clickRate(true)">
      <ng-template
        [ngTemplateOutlet]="character || defaultCharacter"
        [ngTemplateOutletContext]="{ $implicit: index }"
      ></ng-template>
    </div>

    <ng-template #defaultCharacter>
      <span nz-icon nzType="star" nzTheme="fill"></span>
    </ng-template>
  `
})
export class NzRateItemComponent {
  static ngAcceptInputType_allowHalf: BooleanInput;

  @Input() character!: TemplateRef<void>;
  @Input() index = 0;
  @Input() @InputBoolean() allowHalf: boolean = false;
  @Output() readonly itemHover = new EventEmitter<boolean>();
  @Output() readonly itemClick = new EventEmitter<boolean>();

  hoverRate(isHalf: boolean): void {
    this.itemHover.next(isHalf && this.allowHalf);
  }

  clickRate(isHalf: boolean): void {
    this.itemClick.next(isHalf && this.allowHalf);
  }
}
