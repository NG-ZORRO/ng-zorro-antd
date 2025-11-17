/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import qrcodegen from './qrcodegen';

import Ecc = qrcodegen.QrCode.Ecc;
import QrCode = qrcodegen.QrCode;

export type Modules = ReturnType<QrCode['getModules']>;
export interface Excavation {
  x: number;
  y: number;
  w: number;
  h: number;
}
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

export type ERROR_LEVEL_MAPPED_TYPE = {
  [index in ErrorCorrectionLevel]: Ecc;
};

export interface ImageSettings {
  /**
   * The URI of the embedded image.
   */
  src: string;
  /**
   * The height, in pixels, of the image.
   */
  height: number;
  /**
   * The width, in pixels, of the image.
   */
  width: number;
  /**
   * Whether or not to "excavate" the modules around the embedded image. This
   * means that any modules the embedded image overlaps will use the background
   * color.
   */
  excavate: boolean;
  /**
   * The horizontal offset of the embedded image, starting from the top left corner.
   * Will center if not specified.
   */
  x?: number;
  /**
   * The vertical offset of the embedded image, starting from the top left corner.
   * Will center if not specified.
   */
  y?: number;
  /**
   * The opacity of the embedded image in the range of 0-1.
   * @defaultValue 1
   */
  opacity?: number;
  /**
   * The cross-origin value to use when loading the image. This is used to
   * ensure compatibility with CORS, particularly when extracting image data
   * from QRCodeCanvas.
   * Note: `undefined` is treated differently than the seemingly equivalent
   * empty string. This is intended to align with HTML behavior where omitting
   * the attribute behaves differently than the empty string.
   */
  crossOrigin?: CrossOrigin;
}
