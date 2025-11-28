/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { deleteSync } from 'del';
import { TaskFunction, TaskFunctionCallback } from 'gulp';

import { spawn } from 'child_process';
import { platform } from 'os';

export function cleanTask(patterns: string | string[]): TaskFunction {
  return (done: TaskFunctionCallback) => {
    deleteSync(patterns);
    done();
  };
}

export function execTask(binPath: string, args: string[], env = {}): TaskFunction {
  return (done: TaskFunctionCallback) => {
    // https://github.com/angular/angular-cli/issues/10922
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.stdout as any)._handle.setBlocking(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.stderr as any)._handle.setBlocking(true);

    const bin = platform() === 'win32' && binPath === 'ng' ? `${binPath}.cmd` : binPath;
    const childProcess = spawn(bin, args, {
      env: { ...process.env, ...env },
      cwd: process.cwd(),
      stdio: 'inherit'
    });

    childProcess.on('close', (code: number) => {
      code !== 0 ? done(new Error(`Process failed with code ${code}`)) : done();
    });
  };
}
