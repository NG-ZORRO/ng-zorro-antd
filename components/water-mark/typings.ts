/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export interface FontType {
  color?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'light' | 'weight' | number;
  fontFamily?: string;
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
}

export interface MarkStyleType {
  zIndex: number;
  position: string;
  left: string | number;
  top: string | number;
  width: string;
  height: string;
  pointerEvents: string;
  backgroundRepeat: string;
  backgroundPosition?: string;
  visibility: string;
}

export interface MarkStyleCanvasType extends MarkStyleType {
  backgroundImage: string;
  backgroundSize: string;
}
