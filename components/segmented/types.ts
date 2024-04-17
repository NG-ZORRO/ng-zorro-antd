/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type NzSegmentedOption = {
  value: string | number;
  useTemplate?: boolean;
  disabled?: boolean;
  className?: string;
} & (NzSegmentedWithLabel | NzSegmentedWithIcon);

export interface NzSegmentedWithLabel {
  label: string;
  icon?: string;
}

export interface NzSegmentedWithIcon {
  icon: string;
  label?: string;
}

export type NzSegmentedOptions = Array<NzSegmentedOption | string | number>;

export type NzNormalizedOptions = NzSegmentedOption[];

export function normalizeOptions(unnormalized: NzSegmentedOptions): NzNormalizedOptions {
  return unnormalized.map(item => {
    if (typeof item === 'string' || typeof item === 'number') {
      return {
        label: `${item}`,
        value: item
      } as NzSegmentedOption;
    }

    return item as NzSegmentedOption;
  });
}
