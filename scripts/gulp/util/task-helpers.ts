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

    // Windows can only run `ng` (a .cmd shim) through a shell; spawning it
    // directly throws EINVAL since Node's CVE-2024-27980 fix.
    const childProcess = spawn(binPath, args, {
      env: { ...process.env, ...env },
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: platform() === 'win32'
    });

    childProcess.on('close', (code: number) => {
      code !== 0 ? done(new Error(`Process failed with code ${code}`)) : done();
    });
  };
}
