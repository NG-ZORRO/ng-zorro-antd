import { task } from 'gulp';
import { execTask } from '../util/task-helpers';

task('test:watch', (done) => {
  const argv = require('minimist')(process.argv.slice(2));
  return execTask(
    'ng',
    ['test', '--watch=true', '--code-coverage'],
    {
      'NG_TEST_TAGS': argv.tags || ''
    }
  )(done);
});
