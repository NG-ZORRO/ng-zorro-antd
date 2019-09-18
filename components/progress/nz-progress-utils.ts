/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzProgressColorGradient, NzProgressGradientProgress } from './nz-progress.definitions';

function stripPercentToNumber(percent: string): number {
  return +percent.replace('%', '');
}

export const sortGradient = (gradients: NzProgressGradientProgress) => {
  let tempArr: Array<{ key: number; value: string }> = [];

  Object.keys(gradients).forEach(key => {
    const value = gradients[key];
    const formatKey = stripPercentToNumber(key);
    if (isNaN(formatKey)) {
      return {};
    }
    tempArr.push({
      key: formatKey,
      value
    });
  });

  tempArr = tempArr.sort((a, b) => a.key - b.key);
  return tempArr;
};

export const handleCircleGradient = (
  strokeColor: NzProgressGradientProgress
): Array<{ offset: string; color: string }> => {
  return sortGradient(strokeColor).map(({ key, value }) => ({ offset: `${key}%`, color: value }));
};

export const handleLinearGradient = (strokeColor: NzProgressColorGradient) => {
  const { from = '#1890ff', to = '#1890ff', direction = 'to right', ...rest } = strokeColor;
  if (Object.keys(rest).length !== 0) {
    const sortedGradients = sortGradient(rest as NzProgressGradientProgress)
      .map(({ key, value }) => `${value} ${key}%`)
      .join(', ');
    return `linear-gradient(${direction}, ${sortedGradients})`;
  }
  return `linear-gradient(${direction}, ${from}, ${to})`;
};
