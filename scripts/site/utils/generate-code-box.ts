/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { readFileSync } from 'fs-extra';

import path from 'path';

import { IframeMeta } from '../types';

const template = String(readFileSync(path.resolve(__dirname, '../template/code-box.template.html')));

export function generateCodeBox(
  component: string,
  demoName: string,
  key: string,
  title: string,
  version: string,
  doc: string,
  iframe?: IframeMeta
): string {
  let output = template;
  output = output.replace(/{{title}}/g, title);
  output = output.replace(/{{version}}/g, version ?? '');
  output = output.replace(/{{component}}/g, component);
  output = output.replace(/{{componentName}}/g, demoName);
  output = output.replace(/{{key}}/g, key);
  output = output.replace(/{{doc}}/g, doc);
  output = output.replace(/{{iframe}}/g, iframe ? 'true' : 'false');
  output = output.replace(/{{iframeSource}}/g, iframe?.source ?? '');
  output = output.replace(/{{iframeHeight}}/g, String(iframe?.height ?? null));
  output = output.replace(/{{nzGenerateCommand}}/g, `ng g ng-zorro-antd:${component}-${key} <name>`);
  return output;
}
