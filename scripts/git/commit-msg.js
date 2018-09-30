#!/usr/bin/env node

// from https://github.com/angular/angular/blob/master/scripts/git/commit-msg.js

'use strict';

const fs = require('fs');
const checkMsg = require('./validate-commit-message');
const msgFile = process.env['HUSKY_GIT_PARAMS'];

let isValid = true;
if (msgFile || true) {
    const commitMsg = fs.readFileSync(msgFile, {encoding: 'utf-8'});
    const firstLine = commitMsg.split('\n')[0];
    isValid = checkMsg(firstLine);
    if (!isValid) {
        console.error('\x1b[36mCheck CONTRIBUTING.md at the root of the repo for more information.(请查看根目录下的 CONTRIBUTING.md 获取更多信息)\x1b[0m\n');
    }
}

process.exit(isValid ? 0 : 1);
