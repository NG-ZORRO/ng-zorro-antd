/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import * as gulp from 'gulp';

import * as child_process from 'child_process';
import * as os from 'os';

const gulpClean = require('gulp-clean');
const resolveBin = require('resolve-bin');

export function cleanTask(glob: string | string[]): gulp.TaskFunction {
  return () => gulp.src(glob, { read: false, allowEmpty: true }).pipe(gulpClean(null));
}

export function execTask(binPath: string, args: string[], env = {}): gulp.TaskFunction {
  return (done: (err?: Error | null) => void) => {
    // https://github.com/angular/angular-cli/issues/10922
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.stdout as any)._handle.setBlocking(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.stdout as any)._handle.setBlocking(true);
    const bin = os.platform() === 'win32' && binPath === 'ng' ? `${binPath}.cmd` : binPath;
    const childProcess = child_process.spawn(bin, args, {
      env: { ...process.env, ...env },
      cwd: process.cwd(),
      stdio: 'inherit'
    });

    childProcess.on('close', (code: number) => {
      code !== 0 ? done(new Error(`Process failed with code ${code}`)) : done();
    });
  };
}

export function execNodeTask(
  packageName: string,
  executable: string | string[],
  args?: string[],
  env = {}
): gulp.TaskFunction {
  if (!args) {
    args = executable as string[];
    executable = '';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (done: (err: any) => void) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolveBin(packageName, { executable }, (err: any, binPath: string) => {
      if (err) {
        done(err);
      } else {
        execTask('node', [binPath].concat(args!), env)(done);
      }
    });
  };
}
