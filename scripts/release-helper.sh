#!/usr/bin/env bash
rm -rf archive-docs
git clone https://github.com/NG-ZORRO/archive-docs.git
cp -r archive-docs/issue-helper dist/browser/issue-helper
cp -r archive-docs/version dist/browser/version
rm -rf archive-docs