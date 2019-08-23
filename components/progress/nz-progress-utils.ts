/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzProgressColorGradient, NzProgressGradientProgress } from './nz-progress.definitions';

export const sortGradient = (gradients: NzProgressGradientProgress) => {
  let tempArr: Array<{ key: number; value: string }> = [];
  const keys = Object.keys(gradients);

  for (const key of keys) {
    if (!gradients.hasOwnProperty(key)) {
      return;
    }

    const value = gradients[key];
    const formatKey = parseFloat(key.replace(/%/g, ''));
    if (isNaN(formatKey)) {
      return {};
    }
    tempArr.push({
      key: formatKey,
      value
    });
  }

  tempArr = tempArr.sort((a, b) => a.key - b.key);
  return tempArr.map(({ key, value }) => `${value} ${key}%`).join(', ');
};

export const handleLinearGradient = (strokeColor: NzProgressColorGradient) => {
  const { from = '#1890ff', to = '#1890ff', direction = 'to right', ...rest } = strokeColor;
  if (Object.keys(rest).length !== 0) {
    const sortedGradients = sortGradient(rest as NzProgressGradientProgress);
    return `linear-gradient(${direction}, ${sortedGradients})`;
  }
  return `linear-gradient(${direction}, ${from}, ${to})`;
};
