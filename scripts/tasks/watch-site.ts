/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { watch } from 'chokidar';
import { debounce } from 'lodash';

import { buildConfig } from '../build-config';
import siteGenerate from '../site/generate-site';

const watchedFilePattern = /^(.+?)\/(doc|demo)\/[^/]+\.(md|txt|ts)$/;
const componentsDirNormalized = buildConfig.componentsDir.replace(/\\/g, '/').replace(/\/$/, '');

/**
 * Development watch task, to ensure the demos and docs that have changes are rebuilt.
 */
const reload = debounce((component: string) => {
  console.log(`Reload '${component}'`);
  siteGenerate(component);
}, 3000);

watch(buildConfig.componentsDir, { ignoreInitial: true })
  .on('all', (_eventType, filePath) => {
    const normalizedPath = filePath.replace(/\\/g, '/');
    const relativePath = normalizedPath.startsWith(`${componentsDirNormalized}/`)
      ? normalizedPath.slice(componentsDirNormalized.length + 1)
      : normalizedPath;
    const execArray = watchedFilePattern.exec(relativePath);
    if (execArray?.[1]) {
      reload(execArray[1]);
    }
  })
  .on('error', console.error);

console.log('Watching components docs and demos for changes...');
