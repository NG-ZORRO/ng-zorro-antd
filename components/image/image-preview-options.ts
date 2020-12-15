/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export class NzImagePreviewOptions {
  nzKeyboard?: boolean = true;
  nzNoAnimation?: boolean = false;
  nzMaskClosable?: boolean = true;
  nzCloseOnNavigation?: boolean = true;
  nzZIndex?: number;
  nzZoom?: number;
  nzRotate?: number;
}

export interface NzImage {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
}
