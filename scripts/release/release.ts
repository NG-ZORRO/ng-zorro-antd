/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { confirm, input, select } from '@inquirer/prompts';
import { bgBlue, bgGreen, bgRed, bgYellow, blue, green, red, yellow } from 'chalk';
import { readFileSync, readJsonSync, writeFileSync, writeJsonSync } from 'fs-extra';
import minimist = require('minimist');

import { execSync, spawnSync } from 'child_process';
import path from 'path';

import { buildConfig } from '../build-config';
import { checkVersionNumber, parseVersion, validVersion, type Version } from './parse-version';
import { releaseSite } from './release-site';

interface StageReleaseOptions {
  base: string;
  dryRun: boolean;
  version?: string;
}

const handleExitPromptError = (error: Error): void => {
  if (error.name === 'ExitPromptError') {
    log.info('Exited, see you next time :)');
    process.exit(1);
  }
};

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
void main();

async function main(): Promise<void> {
  const argv = minimist(process.argv.slice(2), {
    boolean: ['dry-run', 'help'],
    string: ['base', 'version'],
    default: {
      base: 'master',
      'dry-run': false
    }
  });

  if (argv.help) {
    printHelp();
    return;
  }

  const command = argv._[0];

  if (command === 'prepare') {
    prepareRelease({
      base: argv.base,
      dryRun: argv['dry-run'],
      version: argv.version
    });
    return;
  }

  if (command) {
    log.error(`Unknown command "${command}".`);
    return;
  }

  await run();
}

function printHelp(): void {
  print(`
Usage:
  npm run stage-release
  npm run stage-release -- prepare --version <version> [--base <branch>] [--dry-run]

Commands:
  prepare  Prepare local release files for a release PR without build, push, or site deploy.

Options:
  --version  Target release version, for example 21.3.2.
  --base     Release PR base branch. Defaults to master.
  --dry-run  Check release boundaries and print the plan without writing files.
`);
}

async function run(): Promise<void> {
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

  try {
    let index = await select({
      message: 'Where do you want to start?',
      choices: stages.map((stage, index) => ({
        name: `[${index}] ${stage.name}`,
        value: index
      }))
    });
    log.info('Starting publishing process...');
    for (index; index < stages.length; index++) {
      await stages[index].fun();
    }
  } catch (e) {
    handleExitPromptError(e);
  }
}

function prepareRelease(options: StageReleaseOptions): void {
  const { base, dryRun, version } = options;

  if (!version) {
    log.error('Missing required --version option.');
    return;
  }

  if (!validVersion(version)) {
    log.error(`Invalid version "${version}".`);
    return;
  }

  if (hasWorkingTreeChanges() && !dryRun) {
    log.error('Current working tree has changes. Please commit or stash them before preparing a release.');
    return;
  }

  if (hasWorkingTreeChanges()) {
    log.warn('Current working tree has changes. Continuing because this is a dry run.');
  }

  const remoteName = getUpstreamRemoteName();
  if (!remoteName) {
    log.error(
      'The valid remote name does not exist. View detail https://help.github.com/en/articles/configuring-a-remote-for-a-fork'
    );
    return;
  }

  log.info(`Fetching ${remoteName}/${base} and tags...`);
  runCommand('git', ['fetch', '--prune', '--tags', remoteName, base]);

  const baseRef = `${remoteName}/${base}`;
  ensureGitRefExists(baseRef, `Base branch "${baseRef}" does not exist.`);
  ensureBaseIsAncestor(baseRef);

  const packageJsonPath = path.join(buildConfig.componentsDir, 'package.json');
  const packageJson = readJsonSync(packageJsonPath);
  const currentVersion = packageJson.version;

  if (!checkVersionNumber(currentVersion, version)) {
    log.error(`Target version ${version} is not after the current version ${currentVersion}.`);
    return;
  }

  const previousTag = getPreviousReleaseTag(baseRef, version);
  log.info(`Preparing ${version} from ${baseRef}.`);
  log.info(`Changelog boundary: ${previousTag}..HEAD`);

  if (dryRun) {
    log.success('Dry run completed. No files were changed.');
    return;
  }

  updateVersionFiles(version);
  generateChangelog();
  log.success('Release files prepared.');
  log.info('Please review CHANGELOG.md, docs/changelog.en-US.md, and docs/changelog.zh-CN.md manually.');
  log.info(`When creating the release PR, use "${base}" as the PR base branch.`);
}

/** git has uncommitted changes */
function hasUncommittedChanges(): boolean {
  const output = spawnSync('git', ['diff-index', '--quiet', 'HEAD'], {
    encoding: 'utf-8'
  });
  return output.status !== 0;
}

function hasWorkingTreeChanges(): boolean {
  const output = spawnSync('git', ['status', '--porcelain'], {
    encoding: 'utf-8'
  });

  return output.stdout.trim().length > 0;
}

function getUpstreamRemoteName(): string | null {
  const output = spawnSync('git', ['remote', 'show'], {
    encoding: 'utf-8'
  });
  const names: string[] = (output.stdout as string).split('\n').map(e => e.trim());
  let i = 0;
  while (i < names.length) {
    const url = getRemoteUrl(names[i]);
    if (url.search(/github\.com(\/|:)NG-ZORRO\/ng-zorro-antd/) !== -1) {
      return names[i];
    }
    i++;
  }
  return null;
}

function getRemoteUrl(remote: string): string {
  const output = spawnSync('git', ['remote', 'get-url', remote], {
    encoding: 'utf-8'
  });

  return output.stdout.trim();
}

/**
 * Publisher should input the new version number. This script would check if the input is valid.
 */
async function bumpVersion(): Promise<void> {
  log.info('Updating version number...');

  const packageJsonPath = path.join(buildConfig.componentsDir, 'package.json');
  const packageJson = readJsonSync(packageJsonPath);
  const currentVersion = packageJson.version;
  let versionNumberValid = false;
  let version: string;

  while (!versionNumberValid) {
    version = await input({ message: 'Please input the new version:' });
    if (checkVersionNumber(currentVersion, version)) {
      versionNumberValid = true;
    } else {
      log.error(
        `Your input ${version} is not after the current version ${currentVersion} or is invalid. Please check it.`
      );
    }
  }

  updateVersionFiles(version!);
  log.success('Version updated!');
}

function updateVersionFiles(version: string): void {
  const packageJsonPath = path.join(buildConfig.componentsDir, 'package.json');
  const packageJson = readJsonSync(packageJsonPath);
  const zorroVersionPath = path.join(buildConfig.componentsDir, 'version', 'version.ts');

  writeJsonSync(packageJsonPath, { ...packageJson, version }, { spaces: 2 });
  writeFileSync(
    zorroVersionPath,
    readFileSync(zorroVersionPath, 'utf-8').replace(/Version\('.+'\);/g, `Version('${version}');`)
  );
}

function fetchUpstream(): void {
  if (hasUncommittedChanges()) {
    log.error(
      'Current working tree has changes which are not committed. ' + 'Please make sure your working tree is clean.'
    );
    return;
  }
  log.info('Fetching upstream...');
  const remoteName = getUpstreamRemoteName();
  if (!remoteName) {
    log.error(
      'The valid remote name does not exist. View detail https://help.github.com/en/articles/configuring-a-remote-for-a-fork'
    );
    return;
  }
  execSync('git checkout master');
  execSync(`git pull ${remoteName} master -f`);
  execSync(`git fetch ${remoteName} master --prune --tags`);
  log.success('Older versions fetched!');
}

async function updateChangelog(): Promise<void> {
  generateChangelog();

  let completeEditing = false;

  while (!completeEditing) {
    const result = await confirm({ message: 'Please manually update docs/changelog. Press [Y] if you are done:' });
    if (result) {
      completeEditing = true;
    }
  }

  log.success('Change log finished!');
}

function generateChangelog(): void {
  log.info('Generating changelog...');
  execSync('npm run changelog', { stdio: [0, 1, 2] });
  log.success('Changelog generated!');
}

function runCommand(command: string, args: string[]): void {
  const output = spawnSync(command, args, {
    encoding: 'utf-8',
    stdio: 'inherit'
  });

  if (output.status !== 0) {
    log.error(`Command failed: ${command} ${args.join(' ')}`);
  }
}

function getCommandOutput(command: string, args: string[]): string {
  const output = spawnSync(command, args, {
    encoding: 'utf-8'
  });

  if (output.status !== 0) {
    log.error(`Command failed: ${command} ${args.join(' ')}`);
  }

  return output.stdout.trim();
}

function ensureGitRefExists(ref: string, message: string): void {
  const output = spawnSync('git', ['rev-parse', '--verify', ref], {
    encoding: 'utf-8',
    stdio: 'ignore'
  });

  if (output.status !== 0) {
    log.error(message);
  }
}

function ensureBaseIsAncestor(baseRef: string): void {
  const output = spawnSync('git', ['merge-base', '--is-ancestor', baseRef, 'HEAD'], {
    encoding: 'utf-8'
  });

  if (output.status !== 0) {
    log.error(`Current HEAD is not based on ${baseRef}. Please switch to the correct release branch first.`);
  }
}

function getPreviousReleaseTag(baseRef: string, version: string): string {
  const tagOutput = getCommandOutput('git', ['tag', '--merged', baseRef]);
  const tags = tagOutput
    .split('\n')
    .map(tag => tag.trim())
    .filter(tag => tag && validVersion(tag) && checkVersionNumber(tag, version))
    .sort(compareVersionNames);

  const previousTag = tags.at(-1);

  if (!previousTag) {
    log.error(`Could not find a previous release tag merged into ${baseRef}.`);
  }

  ensureGitRefExists(previousTag!, `Previous release tag "${previousTag}" does not exist.`);

  return previousTag!;
}

function compareVersionNames(a: string, b: string): number {
  const versionA = parseVersion(a);
  const versionB = parseVersion(b);

  if (!versionA || !versionB) {
    return a.localeCompare(b);
  }

  return compareVersions(versionA, versionB);
}

function compareVersions(a: Version, b: Version): number {
  const result = a.major - b.major || a.minor - b.minor || a.patch - b.patch;

  if (result !== 0) {
    return result;
  }

  return comparePrerelease(a) - comparePrerelease(b);
}

function comparePrerelease(version: Version): number {
  const preTagOrder: Record<string, number> = {
    alpha: 0,
    beta: 1,
    rc: 2
  };

  if (!version.preTag) {
    return 10000;
  }

  return preTagOrder[version.preTag] * 1000 + version.pre;
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
  const packageJson = readJsonSync(packageJsonPath);
  return packageJson.version;
}
