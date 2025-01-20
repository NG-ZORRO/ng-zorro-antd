/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { deleteAsync } from 'del';
import { $, chalk } from 'zx';

export async function cleanTask(path: string | string[]): Promise<string[]> {
  return deleteAsync(path);
}

export async function execTask(executable: string, args: string[], env: Record<string, string> = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log('$', chalk.green(executable), args.join(' '));
    const childProcess = $.spawn(executable, args, {
      env: { ...process.env, ...env },
      cwd: process.cwd(),
      stdio: 'inherit'
    });
    childProcess.on('close', code => {
      code !== 0 ? reject(new Error(`Process failed with code ${code}`)) : resolve();
    });
  });
}

export async function setEnv(key: string, value: string): Promise<void> {
  return execTask('cross-env', [`${key}=${value}`]);
}
