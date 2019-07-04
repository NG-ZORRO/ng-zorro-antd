import { task } from 'gulp';
import { execTask } from '../util/task-helpers';

task('test:watch', (done) => {
  const argv = require('minimist')(process.argv.slice(2));
  let tags = '';
  if (argv.tags && typeof argv.tags === 'string') {
    tags = argv.tags;
  }
  return execTask(
    'ng',
    ['test', '--watch=true', '--code-coverage'],
    {
      'NG_TEST_TAGS': tags
    }
  )(done);
});

task('test-ivy:watch', (done) => {
  const argv = require('minimist')(process.argv.slice(2));
  let tags = '';
  if (argv.tags && typeof argv.tags === 'string') {
    tags = argv.tags;
  }
  return execTask(
    'ng',
    ['test', '--configuration=ivy', '--watch=true', '--code-coverage'],
    {
      'NG_TEST_TAGS': tags
    }
  )(done);
});
