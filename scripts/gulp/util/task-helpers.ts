import * as child_process from 'child_process';
import * as gulp from 'gulp';
import * as os from 'os';

const gulpClean = require('gulp-clean');
const resolveBin = require('resolve-bin');

export function cleanTask(glob: string | string[]): gulp.TaskFunction {
  return () => gulp.src(glob, { read: false, allowEmpty: true }).pipe(gulpClean(null));
}

export function execTask(binPath: string, args: string[], env: {} = {}): gulp.TaskFunction {
  return (done: (err?: Error | null) => void) => {
    // https://github.com/angular/angular-cli/issues/10922
    // tslint:disable-next-line:no-any
    (process.stdout as any)._handle.setBlocking(true);
    // tslint:disable-next-line:no-any
    (process.stdout as any)._handle.setBlocking(true);
    const bin = os.platform() === 'win32' && binPath === 'ng' ? `${binPath}.cmd` : binPath;
    const childProcess = child_process.spawn(bin, args, {
      env: { ...process.env, ...env },
      cwd: process.cwd(),
      stdio: 'inherit'
    });

    childProcess.on('close', (code: number) => {
      // tslint:disable-next-line:triple-equals
      code != 0 ? done(new Error(`Process failed with code ${code}`)) : done();
    });
  };
}

export function execNodeTask(packageName: string, executable: string | string[], args?: string[], env: {} = {}): gulp.TaskFunction {
  if (!args) {
    // tslint:disable-next-line:no-parameter-reassignment
    args = executable as string[];
    // tslint:disable-next-line:no-parameter-reassignment
    executable = '';
  }

  // tslint:disable-next-line:no-any
  return (done: (err: any) => void) => {
    // tslint:disable-next-line:no-any
    resolveBin(packageName, { executable: executable }, (err: any, binPath: string) => {
      if (err) {
        done(err);
      } else {
        execTask('node', ['--max_old_space_size=4096', binPath].concat(args!), env)(done);
      }
    });
  };
}
