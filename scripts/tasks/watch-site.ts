/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { debounce } from 'lodash';

import { watch } from 'fs';

import { buildConfig } from '../build-config';
import siteGenerate from '../site/generate-site';

const watchedFilePattern = /^(.+)[\\/](doc|demo)[\\/][^\\/]+\.(md|txt|ts)$/;

/**
 * Development watch task, to ensure the demos and docs that have changes are rebuilt.
 */
const reload = debounce((component: string) => {
  console.log(`Reload '${component}'`);
  siteGenerate(component);
}, 3000);

watch(buildConfig.componentsDir, { recursive: true }, (_eventType, filename) => {
  if (!filename) {
    return;
  }
  const execArray = watchedFilePattern.exec(filename.replace(/\\/g, '/'));
  if (execArray && execArray[1]) {
    reload(execArray[1]);
  }
});

console.log('Watching components docs and demos for changes...');
