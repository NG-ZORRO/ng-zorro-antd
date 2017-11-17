#!/usr/bin/env bash
rm -rf issue-helper && rm -rf ./doc/issue-helper && git clone https://github.com/NG-ZORRO/issue-helper.git && cp -R issue-helper/issue-helper ./doc/
rm -rf issue-helper
# download 0.5.x
rm -rf ./doc/version && mkdir ./doc/version && cd ./doc/version && git clone https://github.com/NG-ZORRO/0.5.5-doc.git 0.5.x
