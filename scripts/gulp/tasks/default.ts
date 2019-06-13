import chalk from 'chalk';
import { parallel, task } from 'gulp';

task('help', done => {
  console.log();
  console.log('Please specify a gulp task you want to run.');
  console.log(chalk.yellow('start:dev    '), 'Start development.');
  console.log(chalk.yellow('build:library'), 'Build ng-zorro-antd-lib to publish/ directory.');
  console.log(chalk.yellow('build:preview'), 'Build preview site to dist/ directory.');
  console.log(chalk.yellow('build:release'), 'Build releaseable library to publish/ directory and deployable site to dist/ directory.');
  console.log();
  done();
});

task('default', parallel('help'));
