/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { spawnSync, SpawnSyncReturns } from 'child_process';

export class GitClient {
  constructor(
    public projectDir: string,
    public remoteGitUrl: string
  ) {}

  spawnGitProcess(args: string[], printStderr: boolean = true): SpawnSyncReturns<string> {
    return spawnSync('git', args, {
      cwd: this.projectDir,
      stdio: ['pipe', 'pipe', printStderr ? 'inherit' : 'pipe'],
      encoding: 'utf8'
    });
  }

  clone(): void {
    this.spawnGitProcess(['clone', this.remoteGitUrl, '.', '--depth=1']);
  }

  stageAllChanges(): boolean {
    return this.spawnGitProcess(['add', '-A']).status === 0;
  }

  createNewCommit(message: string): boolean {
    return this.spawnGitProcess(['commit', '--no-verify', '-m', message]).status === 0;
  }

  checkoutNewBranch(branchName: string): boolean {
    return this.spawnGitProcess(['checkout', '-b', branchName]).status === 0;
  }

  pushBranchToRemote(branchName: string, force: boolean = false, remoteName: string = this.remoteGitUrl): boolean {
    return this.spawnGitProcess(['push', remoteName, branchName, `${force && '-f'}`]).status === 0;
  }
}
