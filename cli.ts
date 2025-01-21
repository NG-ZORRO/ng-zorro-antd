/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { $, argv } from 'zx';

import { clean, help, buildSchematics, testSchematics, site, library, runTest } from './scripts/tools/tasks';

$.verbose = true;
const task = argv['task'] || argv['t'];
const showHelp = argv['help'] || argv['h'];

async function main(): Promise<void> {
  if (showHelp) {
    help();
  } else {
    switch (task) {
      case 'clean':
        await clean();
        break;
      case 'test:schematics':
        await buildSchematics();
        await testSchematics();
        break;
      case 'start:dev':
        await clean();
        await site.start();
        break;
      case 'build:release':
        await clean();
        await site.build();
        break;
      case 'build:preview':
        await clean();
        await site.preview();
        break;
      case 'build:library':
        await library.build();
        break;
      case 'test:watch':
        await runTest();
        break;
      default:
        help();
        break;
    }
  }
}

main().then();
