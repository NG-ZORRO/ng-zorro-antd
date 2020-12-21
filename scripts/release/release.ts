import { bgBlue, bgGreen, bgRed, bgYellow, blue, green, red, yellow } from 'chalk';
import { execSync, spawnSync } from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';
import { buildConfig } from '../build-config';
import { checkVersionNumber } from './parse-version';
import { releaseSite } from './release-site';

const read = require('readline-sync');

/* Shortcut methods */
const print = console.log;
const log = {
  info: (msg: string) => print(bgBlue.black(' INFO\t'), blue(msg)),
  warn: (msg: string) => print(bgYellow.black(' WARN\t'), yellow(msg)),
  error: (msg: string) => {
    print(bgRed.black(' ERROR\t'), red(msg));
    process.exit(1);
  },
  success: (msg: string) => print(bgGreen.black(' SUCCESS\t'), green(msg))
};

/* The whole process */

run();

function run(): void {
  const stages = [
    {
      name: 'Fetch upstream',
      fun: fetchUpstream
    },
    {
      name: 'Bump version',
      fun: bumpVersion
    },
    {
      name: 'Update changelog',
      fun: updateChangelog
    },
    {
      name: 'Build release',
      fun: buildRelease
    },
    {
      name: 'Push library release',
      fun: pushLibraryRelease
    },
    {
      name: 'Push site release',
      fun: pushSiteRelease
    }
  ];

  let index = read.keyInSelect(
    stages.map(e => e.name),
    'Where do you want to start?'
  );
  if (index === -1) {
    return;
  }
  log.info('Starting publishing process...');
  for (index; index < stages.length; index++) {
    stages[index].fun();
  }
}

/** git has uncommitted changes */
function hasUncommittedChanges(): boolean {
  const output = spawnSync('git', ['diff-index', '--quiet', 'HEAD'], {
    encoding: 'utf-8'
  });
  return output.status !== 0;
}

function getUpstreamRemoteName(): string | null {
  const output = spawnSync('git', ['remote', 'show'], {
    encoding: 'utf-8'
  });
  // tslint:disable-next-line:no-any
  const names: string[] = (output.stdout as any).split('\n').map((e: string) => e.trim());
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < names.length; i++) {
    const url = getRemoteUrl(names[i]);
    if (url.search(/github\.com(\/|:)NG-ZORRO\/ng-zorro-antd/) !== -1) {
      return names[i];
    }
  }
  return null;
}

function getRemoteUrl(remote: string): string {
  const output = spawnSync('git', ['remote', 'get-url', remote], {
    encoding: 'utf-8'
  });
  // tslint:disable-next-line:no-any
  return (output.stdout as any).trim();
}

/**
 * Publisher should input the new version number. This script would check if the input is valid.
 */
function bumpVersion(): void {
  log.info('Updating version number...');

  const packageJsonPath = path.join(buildConfig.componentsDir, 'package.json');
  const packageJson = fs.readJsonSync(packageJsonPath);
  const zorroVersionPath = path.join(buildConfig.componentsDir, 'version', 'version.ts');
  const currentVersion = packageJson.version;
  let versionNumberValid = false;
  let version;

  while (!versionNumberValid) {
    version = read.question(bgYellow.black('Please input the new version:') + '  ');
    if (checkVersionNumber(currentVersion, version)) {
      versionNumberValid = true;
    } else {
      log.error(`Your input ${version} is not after the current version ${currentVersion} or is unvalid. Please check it.`);
    }
  }

  fs.writeJsonSync(packageJsonPath, { ...packageJson, version: version }, { spaces: 2 });
  fs.writeFileSync(zorroVersionPath, fs.readFileSync(zorroVersionPath, 'utf-8').replace(/Version\('.+'\);/g, `Version('${version}');`));
  log.success('Version updated!');
}

function fetchUpstream(): void {
  if (hasUncommittedChanges()) {
    log.error('Current working tree has changes which are not committed. ' + 'Please make sure your working tree is clean.');
    return;
  }
  log.info('Fetching upstream...');
  const remoteName = getUpstreamRemoteName();
  if (!remoteName) {
    log.error('The valid remote name does not exist. View detail https://help.github.com/en/articles/configuring-a-remote-for-a-fork');
    return;
  }
  execSync('git checkout master');
  execSync(`git pull ${remoteName} master -f`);
  execSync(`git fetch ${remoteName} master --prune --tags`);
  log.success('Older versions fetched!');
}

function updateChangelog(): void {
  log.info('Generating changelog...');
  execSync('npm run changelog');
  log.success('Changelog generated!');

  let completeEditing = false;

  while (!completeEditing) {
    const result = read.question(bgYellow.black('Please manually update docs/changelog. Press [Y] if you are done:') + '  ');
    if (result.trim().toLowerCase() === 'y') {
      completeEditing = true;
    }
  }

  log.success('Change log finished!');
}

function buildRelease(): void {
  log.info('Running pre-release script... Be patient...');
  execSync('npm run build', { stdio: [0, 1, 2] });
  log.info('pre-release completed!');
}

function pushLibraryRelease(): void {
  const releaseVersion = getCurrentVersion();
  log.info('Checkout and push a new branch for publishing...');
  execSync(`git checkout -b release/${releaseVersion}`);
  execSync('git add .');
  execSync(`git commit -m "chore(release): release ${releaseVersion}"`);
  execSync(`git push origin release/${releaseVersion}`);
  log.success('Push library release completed!');
  log.info('Please go to GitHub and make a pull request.');
}

function pushSiteRelease(): void {
  log.info('Checkout and push a new branch to ng-zorro.github.io...');
  releaseSite(getCurrentVersion());
  log.success('Push site release completed!');
  log.info('Please go to GitHub and make a pull request.');
}

function getCurrentVersion(): string {
  const packageJsonPath = path.join(buildConfig.componentsDir, 'package.json');
  const packageJson = fs.readJsonSync(packageJsonPath);
  return packageJson.version;
}
