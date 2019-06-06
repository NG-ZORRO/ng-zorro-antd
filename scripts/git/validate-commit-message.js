#!/usr/bin/env node

// from https://github.com/angular/angular/blob/master/tools/validate-commit-message/validate-commit-message.js

'use strict';

const fs = require('fs');
const path = require('path');
const configPath = path.resolve(__dirname, './commit-message.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const PATTERN = /^(\w+)(?:\(([^)]+)\))?\: (.+)$/;
const FIXUP_SQUASH = /^(fixup|squash)\! /i;
const REVERT = /^revert:? /i;

module.exports = function (commitSubject) {

  const subject = commitSubject.replace(FIXUP_SQUASH, '');

  if (subject.match(REVERT)) {
    return true;
  }

  if (subject.length > config['maxLength']) {
    error(`The commit message is longer than ${config['maxLength']} characters`, commitSubject);
    error(`commit 信息不能超过 ${config['maxLength']} 字符`, commitSubject, 'zh');
    return false;
  }

  const match = PATTERN.exec(subject);
  if (!match) {
    error(`The commit message does not match the format of '<type>(<scope>): <subject>' OR '<type>: <subject>'`, commitSubject);
    error(`这条 commit 信息格式不正确 '<type>(<scope>): <subject>' 或 '<type>: <subject>`, commitSubject, 'zh');
    return false;
  }

  const type = match[1];

  if (type.toLowerCase() === 'wip') {
    error(`wip are not allowed in a commit, you can change this PR title`, commitSubject);
    error(`wip 不允许出现在 commit 中，你可以在 PR 中修改它的标题`, commitSubject, 'zh');
    return false;
  }

  if (config['types'].indexOf(type) === -1) {
    error(
      `${type} is not an allowed type.\n => TYPES: ${config['types'].join(', ')}`, commitSubject);
    error(
      `${type} 是不允许的 type.\n => TYPES: ${config['types'].join(', ')}`, commitSubject, 'zh');
    return false;
  }

  const scope = match[2];

  if (scope && !config['scopes'].includes(scope) && type !== 'release' && !/module:.+/.test(scope)) {
    error(
      `"${scope}" is not an allowed scope.\n => SCOPES: ${config['scopes'].join(', ')}`, commitSubject);
    error(
      `"${scope}" 是不允许的 scope.\n => SCOPES: ${config['scopes'].join(', ')}`, commitSubject, 'zh');
    return false;
  }

  return true;
};

function error(errorMessage, commitMessage, lang) {
  if (lang === 'zh') {
    console.error(`\x1b[33m无效的 COMMIT 信息: "${commitMessage}"\x1b[0m\n\x1b[31m => 错误: ${errorMessage}\x1b[0m\n`);
  } else {
    console.error(`\x1b[33mINVALID COMMIT MSG: "${commitMessage}"\x1b[0m\n\x1b[31m => ERROR: ${errorMessage}\x1b[0m\n`);
  }
}

module.exports.config = config;
