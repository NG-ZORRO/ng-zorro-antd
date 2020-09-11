import { series, task } from 'gulp';
import { generateSitemap } from '../../prerender/sitemap';
import { execNodeTask } from '../util/task-helpers';

/** Run prerender script on the output directory, to render static html. */
task(':run:prerender', execNodeTask('@angular/cli', 'ng', ['run', 'ng-zorro-antd-doc:prerender']));

/** Run sitemap script on the output directory, to create sitemap.xml */
task(':run:sitemap', done => {
  generateSitemap();
  done();
});

/** Parallel run sitemap and prerender scripts */
task('run:prerender', series(':run:sitemap', ':run:prerender'));

/** Task that builds the universal-app and runs the prerender and sitemap script. */
task('prerender', series('run:prerender'));
