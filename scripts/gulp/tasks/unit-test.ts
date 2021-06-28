/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { task } from 'gulp';

import { execTask } from '../util/task-helpers';

task('test:watch', done => {
  const argv = require('minimist')(process.argv.slice(2));
  let tags = '';
  if (argv.tags && typeof argv.tags === 'string') {
    tags = argv.tags;
  }
  return execTask('ng', ['test', '--watch=true', '--code-coverage'], {
    NG_TEST_TAGS: tags
  })(done);
});
