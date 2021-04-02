/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export type NzImageLoader = (params: { src: string; width: number }) => string;

export const defaultLoader: NzImageLoader = ({ src }) => {
  return encodeURIComponent(src);
};
