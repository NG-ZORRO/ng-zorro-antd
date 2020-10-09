import { series, task } from 'gulp';
import { generate } from '../../prerender/ngsw-config';
import { generateSitemap } from '../../prerender/sitemap';
import { execNodeTask } from '../util/task-helpers';

/** Run prerender script on the output directory, to render static html. */
task(':run:prerender', execNodeTask('@angular/cli', 'ng', ['run', 'ng-zorro-antd-doc:prerender']));
task(':run:service-work', execNodeTask('@angular/cli', 'ng', ['run', 'ng-zorro-antd-doc:service-work']));

/** Run sitemap script on the output directory, to create sitemap.xml */
task(':run:sitemap', done => {
  generateSitemap();
  done();
});

/** Regenerate the ngsw-config to fix https://github.com/angular/angular/issues/23613 */
task(':run:regen-ngsw-config', generate);

/** Parallel run sitemap and prerender scripts */
task('run:prerender', series(':run:prerender', ':run:service-work', ':run:regen-ngsw-config', ':run:sitemap'));

/** Task that builds the universal-app and runs the prerender and sitemap script. */
task('prerender', series('run:prerender'));
