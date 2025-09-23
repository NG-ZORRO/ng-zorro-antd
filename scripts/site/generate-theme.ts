/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { writeFile } from 'fs-extra';
import less from 'less';
import LessPluginCleanCSS from 'less-plugin-clean-css';

import path from 'path';

import { aliyunPaletteLess } from '../build/aliyun-vars';
import { compactPaletteLess } from '../build/compact-vars';
import { darkPaletteLess } from '../build/dark-vars';

const themePath = path.join(__dirname, '../../site/doc/styles.less');
const colorPalettePath = path.join(__dirname, '../../components/style/color/colorPalette.less');
const themeContent = `
@import '${themePath}';
`;

async function generateTheme(vars: Record<string, string | number>, fileName: string): Promise<void> {
  const data = await less.render(themeContent, {
    plugins: [new LessPluginCleanCSS({ advanced: true })],
    modifyVars: {
      hack: `true;@import '${colorPalettePath}';`,
      ...vars,
      '@site-markdown-code-bg': '@input-bg',
      '@site-text-color': '@heading-color'
    }
  });

  return writeFile(path.join(__dirname, `../../site/doc/assets/${fileName}`), data.css);
}

export default function generateAllTheme(): Promise<void[]> {
  return Promise.all([
    generateTheme(compactPaletteLess, 'compact.css'),
    generateTheme(darkPaletteLess, 'dark.css'),
    generateTheme(aliyunPaletteLess, 'aliyun.css')
  ]);
}
