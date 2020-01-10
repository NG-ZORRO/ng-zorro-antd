#!/usr/bin/env bash
rm -rf archive-docs
git clone https://github.com/NG-ZORRO/archive-docs.git
cp -r archive-docs/issue-helper dist/issue-helper
cp -r archive-docs/version dist/version
rm -rf archive-docs