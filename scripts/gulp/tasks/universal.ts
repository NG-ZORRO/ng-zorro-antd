import { parallel, series, task } from 'gulp';
import { join } from 'path';
import { buildConfig } from '../../build-config';
import { execNodeTask, execTask } from '../util/task-helpers';

const tsconfigFile = join(buildConfig.scriptsDir, 'prerender', 'tsconfig.json');
const prerenderScript = join(buildConfig.outputDir, 'prerender', 'prerender.js');
const sitemapScript = join(buildConfig.outputDir, 'prerender', 'sitemap.js');

/** Build the universal app in the output directory. */
task('universal:build-app', execNodeTask(
  '@angular/cli',
  'ng',
  [ 'run', 'ng-zorro-antd-doc:server:production' ]
));

/** Build the prerender script in the output directory. */
task('universal:build-prerender-ts', execNodeTask(
  'typescript',
  'tsc',
  [ '-p', tsconfigFile ]
));

/** Run prerender script on the output directory, to render static html. */
task(':run:prerender', execTask('node', [prerenderScript]));

/** Run sitemap script on the output directory, to create sitemap.xml */
task(':run:sitemap', execTask('node', [sitemapScript]));

/** Parallel run sitemap and prerender scripts */
task('run:prerender', parallel(':run:prerender', ':run:sitemap'));

/** Task that builds the universal-app and runs the prerender and sitemap script. */
task('prerender', series('universal:build-app', 'universal:build-prerender-ts', 'run:prerender'));
