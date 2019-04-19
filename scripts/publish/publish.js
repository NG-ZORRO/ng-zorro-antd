const chalk = require('chalk');
const fs = require('fs-extra');
const read = require('readline-sync');
const path = require('path');

/* Shortcut methods */
const execSync = require('child_process').execSync;
const versionNameRegex = /^(\d+)\.(\d+)\.(\d+)(?:-(alpha|beta|rc)\.(\d+))?$/;
const print = console.log;
const log = {
  info   : (msg) => {
    print(chalk.bgBlue.black('INFO'), chalk.blue(msg));
  },
  warn   : (msg) => {
    print(chalk.bgYellow.black('WARN'), chalk.yellow(msg));
  },
  error  : (msg) => {
    print(chalk.bgRed.black('ERROR'), chalk.red(msg));
  },
  success: (msg) => {
    print(chalk.bgGreen.black('SUCCESS'), chalk.green(msg));
  }
};

/* The whole process */

log.info('Starting publishing process...');

let nextVersion;

fetchOlderVersions();
changeVersion();
generatingPublishNote();
preRelease();
checkout();

// publish();

/**
 * Publisher should input the new version number. This script would check if the input is valid.
 */
function changeVersion() {
  log.info('Updating version number...');

  const packageJsonPath = path.join(__dirname, '../../components/package.json');
  const appComponentPath = path.join(__dirname, '../site/_site/doc/app/app.component.ts');
  const codeBoxPath = path.join(__dirname, '../site/_site/doc/app/share/nz-codebox/stack-blitz.ts');
  const zorroVersionPath = path.join(__dirname, '../../components/version.ts');

  const packageJson = fs.readJsonSync(packageJsonPath);
  const currentVersion = packageJson.version;
  let versionNumberValid = false;
  let version;

  function parseVersion(version) {
    const matches = version.match(versionNameRegex);

    if (!matches) {
      return null;
    }

    return {
      major : Number(matches[1]),
      minor : Number(matches[2]),
      patch : Number(matches[3]),
      preTag: matches[4],
      pre   : Number(matches[5]),
    }
  }

  function checkVersionNumber(cur, next) {
    // Must be numbers and dots.
    if (!versionNameRegex.test(next)) {
      return false;
    }

    const curVersion = parseVersion(cur);
    const nextVersion = parseVersion(next);

    for (const k of ['major', 'minor', 'patch']) {
      if (curVersion[k] < nextVersion[k]) {
        return true;
      }

      if (curVersion[k] > nextVersion[k]) {
        return false;
      }
    }

    if (curVersion.preTag !== nextVersion.preTag) {
      return true;
    }

    return curVersion.pre < nextVersion.pre
  }

  while (!versionNumberValid) {
    version = read.question(chalk.bgYellow.black('Please input the new version:') + '  ');
    if (checkVersionNumber(currentVersion, version)) {
      versionNumberValid = true;
      nextVersion = version;
    } else {
      log.error(`Your input ${version} is not after the current version ${currentVersion} or is unvalid. Please check it.`);
    }
  }

  fs.writeJsonSync(packageJsonPath, {...packageJson, version: version}, {spaces: 2});
  fs.writeFileSync(appComponentPath,
    fs.readFileSync(appComponentPath, 'utf-8')
      .replace(/currentVersion = '.+';/g, `currentVersion = '${version}';`)
  );
  fs.writeFileSync(codeBoxPath,
    fs.readFileSync(codeBoxPath, 'utf-8').replace(/'ng-zorro-antd'\s*: '.+'/g, `'ng-zorro-antd': '^${version}'`)
  );
  fs.writeFileSync(zorroVersionPath,
    fs.readFileSync(zorroVersionPath, 'utf-8')
      .replace(/Version\('.+'\);/g, `Version('${version}');`)
  );
  log.success('Version updated!');
}

function fetchOlderVersions() {
  log.info('Fetching older versions...');
  execSync('git checkout master');
  execSync('git pull upstream master');
  execSync('git fetch upstream master --prune --tags');
  log.success('Older versions fetched!');
}

function generatingPublishNote() {
  log.info('Generating changelog...');
  execSync('npm run changelog');
  log.success('Changelog generated!');

  let completeEditing = false;

  while (!completeEditing) {
    const result = read.question(chalk.bgYellow.black('Please manually update docs/changelog. Press [Y] if you are done:') + '  ');
    if (result.trim().toLowerCase() === 'y') {
      completeEditing = true;
    }
  }

  log.success('Change log finished!');
}

function preRelease() {
  log.info('Running pre-release script... Be patient...');
  execSync('npm run pre-release', {stdio: [0, 1, 2]});
  log.info('pre-release completed!');
}

function checkout() {
  log.info('Checkout and push a new branch for publishing...');
  execSync(`git checkout -b publish-${nextVersion}`);
  execSync('git add .');
  execSync(`git commit -m "release(${nextVersion}): release ${nextVersion}"`);
  execSync(`git push origin publish-${nextVersion}`);
  log.success('Please go to GitHub and make a pull request.');
  log.success('Bye!');
}
