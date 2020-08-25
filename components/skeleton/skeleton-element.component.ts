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
  @Input() nzType!: 'button' | 'input' | 'avatar' | 'image';
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
    ></span>
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
    ></span>
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
    ></span>
  `
})
export class NzSkeletonElementInputComponent {
  @Input() nzSize: NzSkeletonInputSize = 'default';
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-skeleton-element[nzType="image"]',
  template: `
    <span [class.ant-skeleton-image]="true">
      <svg [class.ant-skeleton-image-svg]="true" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path [attr.d]="path" [class.ant-skeleton-image-path]="true" />
      </svg>
    </span>
  `
})
export class NzSkeletonElementImageComponent {
  path: string =
    'M984.615385 196.923077c0-43.323077-35.446154-78.769231-78.769231-78.769231H118.153846c-43.323077 0-78.769231 35.446154-78.769231 78.769231v630.153846c0 43.323077 35.446154 78.769231 78.769231 78.769231h787.692308c43.323077 0 78.769231-35.446154 78.769231-78.769231V196.923077zM779.815385 748.307692h-571.076923c-23.630769 0-37.415385-25.6-25.6-45.292307l173.292307-301.292308c7.876923-13.784615 25.6-13.784615 33.476923 0l104.369231 179.2c7.876923 11.815385 25.6 13.784615 33.476923 1.969231l84.676923-122.092308c7.876923-11.815385 25.6-11.815385 33.476923 0L801.476923 708.923077c11.815385 17.723077 0 39.384615-21.661538 39.384615zM728.615385 393.846154c-43.323077 0-78.769231-35.446154-78.769231-78.769231s35.446154-78.769231 78.769231-78.769231 78.769231 35.446154 78.76923 78.769231-35.446154 78.769231-78.76923 78.769231z';
}
