/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { detect } from 'detect-port';

import { spawn } from 'child_process';

/** Run `nx serve` on a free port (falls back to a random port if 4200 is taken). */
async function main(): Promise<void> {
  const port = await detect(4200);
  const childProcess = spawn('nx', ['run', 'ng-zorro-antd-doc:serve', `--port=${port}`], {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  childProcess.on('close', code => process.exit(code ?? 0));
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
