/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export interface Version {
  major: number;
  minor: number;
  patch: number;
  preTag: string;
  pre: number;
}

const versionNameRegex = /^(\d+)\.(\d+)\.(\d+)(?:-(alpha|beta|rc)\.(\d+))?$/;

export function validVersion(version: string): boolean {
  return versionNameRegex.test(version);
}

export function parseVersion(version: string): Version | null {
  const matches = version.match(versionNameRegex);

  if (!matches) {
    return null;
  }

  return {
    major: Number(matches[1]),
    minor: Number(matches[2]),
    patch: Number(matches[3]),
    preTag: matches[4],
    pre: Number(matches[5])
  };
}

export function checkVersionNumber(cur: string, next: string): boolean {
  // Must be numbers and dots.
  if (!validVersion(next)) {
    return false;
  }

  const curVersion = parseVersion(cur);
  const nextVersion = parseVersion(next);

  if (!nextVersion || !curVersion) {
    return false;
  }

  if (curVersion.major !== nextVersion.major) {
    return curVersion.major < nextVersion.major;
  }

  if (curVersion.minor !== nextVersion.minor) {
    return curVersion.minor < nextVersion.minor;
  }

  if (curVersion.patch !== nextVersion.patch) {
    return curVersion.patch < nextVersion.patch;
  }

  if (curVersion.preTag !== nextVersion.preTag) {
    return true;
  }

  return curVersion.pre < nextVersion.pre;
}
