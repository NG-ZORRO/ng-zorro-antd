/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { isNil } from 'ng-zorro-antd/core/util';
import { NzImageSrcLoader } from './typings';
import { normalizeSrc } from './utils';

export const defaultImageSrcLoader: NzImageSrcLoader = ({ src }) => {
  return src;
};

// Demo: https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/resize,w_256
export const aliObjectsLoader: NzImageSrcLoader = ({ src, width }) => {
  const params = isNil(width) ? '' : `?x-oss-process=image/resize,w_${width}`;
  return `https://zos.alipayobjects.com/rmsportal/${normalizeSrc(src)}${params}`;
};

// Demo: https://static.imgix.net/daisy.png?format=auto&fit=max&w=300
export const imgixLoader: NzImageSrcLoader = ({ src, width }) => {
  const params = isNil(width) ? '' : `&fit=max&w=${width}`;
  return `https://static.imgix.net/${normalizeSrc(src)}?format=auto${params}`;
};

// Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
export const cloudinaryLoader: NzImageSrcLoader = ({ src, width }) => {
  const params = isNil(width) ? '' : `,w_${width}`;
  return `https://res.cloudinary.com/demo/image/upload/c_limit,q_auto${params}/${normalizeSrc(src)}`;
};
