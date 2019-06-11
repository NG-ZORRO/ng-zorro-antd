import * as child_process from 'child_process';
import * as gulp from 'gulp';
const gulpClean = require('gulp-clean');
const resolveBin = require('resolve-bin');

/** Options that can be passed to execTask or execNodeTask. */
export interface ExecTaskOptions {
  // Whether STDOUT and STDERR messages should be printed.
  silent?: boolean;
  // Whether STDOUT messages should be printed.
  silentStdout?: boolean;
  // If an error happens, this will replace the standard error.
  errMessage?: string;
  // Environment variables being passed to the child process.
  // tslint:disable-next-line:no-any
  env?: any;
  // Whether the task should fail if the process writes to STDERR.
  failOnStderr?: boolean;
}

export function cleanTask(glob: string | string[]) {
  return () => gulp.src(glob, { read: false, allowEmpty: true }).pipe(gulpClean(null));
}

export function execTask(binPath: string, args: string[], options: ExecTaskOptions = {}) {
  return (done: (err?: string) => void) => {
    const env = {...process.env, ...options.env};
    const childProcess = child_process.spawn(binPath, args, {env});
    const stderrData: string[] = [];

    if (!options.silentStdout && !options.silent) {
      childProcess.stdout.on('data', (data: string) => process.stdout.write(data));
    }

    if (!options.silent || options.failOnStderr) {
      childProcess.stderr.on('data', (data: string) => {
        options.failOnStderr ? stderrData.push(data) : process.stderr.write(data);
      });
    }

    childProcess.on('close', (code: number) => {
      if (options.failOnStderr && stderrData.length) {
        done(stderrData.join('\n'));
      } else {
        // tslint:disable-next-line:triple-equals
        code != 0 ? done(options.errMessage || `Process failed with code ${code}`) : done();
      }
    });
  };
}

export function execNodeTask(packageName: string, executable: string | string[], args?: string[],
                             options: ExecTaskOptions = {}) {
  if (!args) {
    args = executable as string[];
    executable = '';
  }

  // tslint:disable-next-line:no-any
  return (done: (err: any) => void) => {
    // tslint:disable-next-line:no-any
    resolveBin(packageName, { executable: executable }, (err: any, binPath: string) => {
      if (err) {
        done(err);
      } else {
        execTask('node', ['--max_old_space_size=5120', binPath].concat(args!), options)(done);
      }
    });
  };
}