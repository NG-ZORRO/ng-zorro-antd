/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { watch } from 'chokidar';
import { debounce } from 'lodash';

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

watch(buildConfig.componentsDir, { ignoreInitial: true })
  .on('all', (eventType, path) => {
    if (!path) {
      return;
    }
    const execArray = watchedFilePattern.exec(path.replace(/\\/g, '/'));
    if (execArray && execArray[1]) {
      reload(execArray[1]);
    }
  })
  .on('error', console.error);

console.log('Watching components docs and demos for changes...');
