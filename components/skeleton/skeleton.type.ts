/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type NzSkeletonParagraphWidth = number | string | Array<number | string>;
export type NzSkeletonButtonShape = 'square' | 'circle' | 'round' | 'default';
export type NzSkeletonAvatarShape = 'square' | 'circle';
export type NzSkeletonInputSize = 'large' | 'small' | 'default';
export type NzSkeletonButtonSize = NzSkeletonInputSize;
export type NzSkeletonAvatarSize = NzSkeletonInputSize | number;

export interface NzSkeletonAvatar {
  size?: NzSkeletonAvatarSize;
  shape?: NzSkeletonAvatarShape;
}

export interface NzSkeletonTitle {
  width?: number | string;
}

export interface NzSkeletonParagraph {
  rows?: number;
  width?: NzSkeletonParagraphWidth;
}
