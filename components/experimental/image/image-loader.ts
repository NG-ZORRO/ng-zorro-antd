/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NzImageSrcLoader } from './typings';
import { normalizeSrc } from './utils';

export const defaultImageSrcLoader: NzImageSrcLoader = ({ src }) => {
  return src;
};

// Demo: https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/resize,w_256
export const aliObjectsLoader: NzImageSrcLoader = ({ src, width }) => {
  return `https://zos.alipayobjects.com/rmsportal/${normalizeSrc(src)}?x-oss-process=image/resize,w_${width}`;
};

// Demo: https://static.imgix.net/daisy.png?format=auto&fit=max&w=300
export const imgixLoader: NzImageSrcLoader = ({ src, width }) => {
  return `https://static.imgix.net/${normalizeSrc(src)}?format=auto&fit=max&w=${width}`;
};

// Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
export const cloudinaryLoader: NzImageSrcLoader = ({ src, width }) => {
  return `https://res.cloudinary.com/demo/image/upload/w_${width},c_limit,q_auto/${normalizeSrc(src)}`;
};
