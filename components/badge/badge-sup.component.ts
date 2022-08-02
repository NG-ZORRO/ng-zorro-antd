/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { zoomBadgeMotion } from 'ng-zorro-antd/core/animation';
import { NzSafeAny, NzSizeDSType } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'nz-badge-sup',
  exportAs: 'nzBadgeSup',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [zoomBadgeMotion],
  template: `
    <ng-container *ngIf="count <= nzOverflowCount; else overflowTemplate">
      <span
        [nzNoAnimation]="noAnimation"
        *ngFor="let n of maxNumberArray; let i = index"
        class="ant-scroll-number-only"
        [style.transform]="'translateY(' + -countArray[i] * 100 + '%)'"
      >
        <ng-container *ngIf="!nzDot && countArray[i] !== undefined">
          <p
            *ngFor="let p of countSingleArray"
            class="ant-scroll-number-only-unit"
            [class.current]="p === countArray[i]"
          >
            {{ p }}
          </p>
        </ng-container>
      </span>
    </ng-container>
    <ng-template #overflowTemplate>{{ nzOverflowCount }}+</ng-template>
  `,
  host: {
    class: 'ant-scroll-number',
    '[@.disabled]': `disableAnimation`,
    '[@zoomBadgeMotion]': '',
    '[attr.title]': `nzTitle === null ? '' : nzTitle || nzCount`,
    '[style]': `nzStyle`,
    '[style.right.px]': `nzOffset && nzOffset[0] ? -nzOffset[0] : null`,
    '[style.margin-top.px]': `nzOffset && nzOffset[1] ? nzOffset[1] : null`,
    '[class.ant-badge-count]': `!nzDot`,
    '[class.ant-badge-count-sm]': `nzSize === 'small'`,
    '[class.ant-badge-dot]': `nzDot`,
    '[class.ant-badge-multiple-words]': `countArray.length >= 2`
  }
})
export class NzBadgeSupComponent implements OnInit, OnChanges {
  @Input() nzOffset?: [number, number];
  @Input() nzTitle?: string | null | undefined;
  @Input() nzStyle: { [key: string]: string } | null = null;
  @Input() nzDot = false;
  @Input() nzOverflowCount: number = 99;
  @Input() disableAnimation = false;
  @Input() nzCount?: number | TemplateRef<NzSafeAny>;
  @Input() noAnimation = false;
  @Input() nzSize: NzSizeDSType = 'default';
  maxNumberArray: string[] = [];
  countArray: number[] = [];
  count: number = 0;
  countSingleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor() {}

  generateMaxNumberArray(): void {
    this.maxNumberArray = this.nzOverflowCount.toString().split('');
  }

  ngOnInit(): void {
    this.generateMaxNumberArray();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzOverflowCount, nzCount } = changes;
    if (nzCount && typeof nzCount.currentValue === 'number') {
      this.count = Math.max(0, nzCount.currentValue);
      this.countArray = this.count
        .toString()
        .split('')
        .map(item => +item);
    }
    if (nzOverflowCount) {
      this.generateMaxNumberArray();
    }
  }
}
