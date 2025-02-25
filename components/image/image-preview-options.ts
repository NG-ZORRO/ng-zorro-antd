/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';

export class NzImagePreviewOptions {
  nzKeyboard?: boolean = true;
  nzNoAnimation?: boolean = false;
  nzMaskClosable?: boolean = true;
  nzCloseOnNavigation?: boolean = true;
  nzZIndex?: number;
  nzZoom?: number;
  nzRotate?: number;
  nzFlipHorizontally?: boolean;
  nzFlipVertically?: boolean;
  nzScaleStep?: number;
  nzDirection?: Direction;
}

export interface NzImage {
  src: string;
  srcset?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
}
