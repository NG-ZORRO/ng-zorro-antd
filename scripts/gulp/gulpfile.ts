/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/* eslint-disable import/no-unassigned-import */
import { series, task } from 'gulp';
import './tasks/clean';
import './tasks/default';
import './tasks/schematic';
import './tasks/unit-test';

import './tasks/library';
import './tasks/site';

task('build:release', series('clean', 'build:library', 'build:release-site'));

task('start:dev', series('clean', 'start:site'));
