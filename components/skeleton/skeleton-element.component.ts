/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  NzSkeletonAvatarShape,
  NzSkeletonAvatarSize,
  NzSkeletonButtonShape,
  NzSkeletonButtonSize,
  NzSkeletonInputSize
} from './skeleton.type';

@Directive({
  selector: 'nz-skeleton-element',
  host: {
    '[class.ant-skeleton]': 'true',
    '[class.ant-skeleton-element]': 'true',
    '[class.ant-skeleton-active]': 'nzActive'
  }
})
export class NzSkeletonElementDirective {
  @Input() nzActive: boolean = false;
  @Input() nzType!: 'button' | 'input' | 'avatar';
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-skeleton-element[nzType="button"]',
  template: `
    <span
      [class.ant-skeleton-button]="true"
      [class.ant-skeleton-button-round]="nzShape === 'round'"
      [class.ant-skeleton-button-circle]="nzShape === 'circle'"
      [class.ant-skeleton-button-lg]="nzSize === 'large'"
      [class.ant-skeleton-button-sm]="nzSize === 'small'"
    >
    </span>
  `
})
export class NzSkeletonElementButtonComponent {
  @Input() nzShape: NzSkeletonButtonShape = 'default';
  @Input() nzSize: NzSkeletonButtonSize = 'default';
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-skeleton-element[nzType="avatar"]',
  template: `
    <span
      [class.ant-skeleton-avatar]="true"
      [class.ant-skeleton-avatar-square]="nzShape === 'square'"
      [class.ant-skeleton-avatar-circle]="nzShape === 'circle'"
      [class.ant-skeleton-avatar-lg]="nzSize === 'large'"
      [class.ant-skeleton-avatar-sm]="nzSize === 'small'"
      [ngStyle]="styleMap"
    >
    </span>
  `
})
export class NzSkeletonElementAvatarComponent implements OnChanges {
  static ngAcceptInputType_nzShape: NzSkeletonAvatarShape | undefined | null;
  static ngAcceptInputType_AvatarSize: NzSkeletonAvatarSize | undefined | null;

  @Input() nzShape: NzSkeletonAvatarShape = 'circle';
  @Input() nzSize: NzSkeletonAvatarSize = 'default';

  styleMap = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzSize && typeof this.nzSize === 'number') {
      const sideLength = `${this.nzSize}px`;
      this.styleMap = { width: sideLength, height: sideLength, 'line-height': sideLength };
    } else {
      this.styleMap = {};
    }
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-skeleton-element[nzType="input"]',
  template: `
    <span
      [class.ant-skeleton-input]="true"
      [class.ant-skeleton-input-lg]="nzSize === 'large'"
      [class.ant-skeleton-input-sm]="nzSize === 'small'"
    >
    </span>
  `
})
export class NzSkeletonElementInputComponent {
  @Input() nzSize: NzSkeletonInputSize = 'default';
}
