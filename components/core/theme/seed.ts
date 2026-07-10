/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSeedToken } from './interfaces';

/**
 * Default seed values reproduce the current v4-era look of ng-zorro-antd
 * (see `components/style/themes/default.less`), NOT Ant Design v5 defaults.
 * v5/v6 visual presets will ship as separate seed presets later.
 */
export const nzDefaultSeedToken: NzSeedToken = {
  colorPrimary: '#1890ff', // @blue-6
  colorSuccess: '#52c41a', // @green-6
  colorWarning: '#faad14', // @gold-6
  colorError: '#ff4d4f', // @red-5
  colorInfo: '#1890ff', // @info-color: @primary-color
  colorTextBase: '#000',
  colorBgBase: '#fff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  codeFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  fontSize: 14,
  lineHeight: 1.5715,
  borderRadius: 2, // @border-radius-base (v4), not v5's 6
  controlHeight: 32, // @height-base
  lineWidth: 1, // @border-width-base
  lineType: 'solid',
  sizeUnit: 4,
  sizeStep: 4,
  motionUnit: 0.1,
  motionBase: 0,
  zIndexBase: 0,
  zIndexPopupBase: 1000,
  opacityImage: 1,
  wireframe: true,
  motion: true
};

export const NZ_SEED_TOKEN_KEYS = Object.keys(nzDefaultSeedToken) as Array<keyof NzSeedToken>;
