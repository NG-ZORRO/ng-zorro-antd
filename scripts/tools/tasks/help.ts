/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { chalk } from 'zx';

export function help(): void {
  console.log();
  console.log('Please specify a gulp task you want to run.');
  console.log(chalk.yellow('start:dev    '), 'Start development.');
  console.log(chalk.yellow('build:library'), 'Build ng-zorro-antd-lib to publish/ directory.');
  console.log(chalk.yellow('build:preview'), 'Build preview site to dist/ directory.');
  console.log(
    chalk.yellow('build:release'),
    'Build releasable library to publish/ directory and deployable site to dist/ directory.'
  );
  console.log();
}
