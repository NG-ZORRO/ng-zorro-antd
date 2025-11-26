/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  booleanAttribute
} from '@angular/core';

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
    class: 'ant-skeleton ant-skeleton-element',
    '[class.ant-skeleton-active]': 'nzActive',
    '[class.ant-skeleton-block]': 'nzBlock'
  }
})
export class NzSkeletonElementDirective {
  @Input({ transform: booleanAttribute }) nzActive: boolean = false;
  @Input() nzType!: 'button' | 'input' | 'avatar' | 'image';
  @Input({ transform: booleanAttribute }) nzBlock: boolean = false;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'nz-skeleton-element[nzType="button"]',
  template: `
    <span
      class="ant-skeleton-button"
      [class.ant-skeleton-button-square]="nzShape === 'square'"
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
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'nz-skeleton-element[nzType="avatar"]',
  template: `
    <span
      class="ant-skeleton-avatar"
      [class.ant-skeleton-avatar-square]="nzShape === 'square'"
      [class.ant-skeleton-avatar-circle]="nzShape === 'circle'"
      [class.ant-skeleton-avatar-lg]="nzSize === 'large'"
      [class.ant-skeleton-avatar-sm]="nzSize === 'small'"
      [style]="styleMap"
    ></span>
  `
})
export class NzSkeletonElementAvatarComponent implements OnChanges {
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
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'nz-skeleton-element[nzType="input"]',
  template: `
    <span
      class="ant-skeleton-input"
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
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'nz-skeleton-element[nzType="image"]',
  template: `
    <span class="ant-skeleton-image">
      <svg class="ant-skeleton-image-svg" viewBox="0 0 1098 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z"
          class="ant-skeleton-image-path"
        />
      </svg>
    </span>
  `
})
export class NzSkeletonElementImageComponent {}
