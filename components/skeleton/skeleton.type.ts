/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type ParagraphWidth = number | string | Array<number | string>;

export type SkeletonElementSize = 'small' | 'large' | 'default' | number;

export type SkeletonElementShape = 'square' | 'circle' | 'round' | 'default';

export interface NzSkeletonAvatar {
  size?: SkeletonElementSize;
  shape?: SkeletonElementShape;
}

export interface NzSkeletonTitle {
  width?: number | string;
}

export interface NzSkeletonParagraph {
  rows?: number;
  width?: ParagraphWidth;
}
