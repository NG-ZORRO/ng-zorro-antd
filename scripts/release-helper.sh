#!/usr/bin/env bash
rm -rf issue-helper && rm -rf ./dist/issue-helper && git clone https://github.com/NG-ZORRO/issue-helper.git && cp -R issue-helper/issue-helper ./dist/
rm -rf issue-helper
# download 0.5.x 0.6.x
rm -rf ./dist/version && mkdir ./dist/version && cd ./dist/version && git clone https://github.com/NG-ZORRO/0.5.5-doc.git 0.5.x && rm -rf 0.5.x/.git/ && git clone https://github.com/NG-ZORRO/0.6.x-doc.git 0.6.x && rm -rf 0.6.x/.git/ && git clone https://github.com/NG-ZORRO/0.7.x-doc.git 0.7.x && rm -rf 0.7.x/.git/
