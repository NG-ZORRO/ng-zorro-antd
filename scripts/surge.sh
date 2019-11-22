export SURGE_LOGIN=ng.zorro.antd@gmail.com
export SURGE_TOKEN=5c751dc2bb966953f09f645f2e5781ac
export DEPLOY_DOMAIN=https://preview-${TRAVIS_PULL_REQUEST}-ng-zorro-antd.surge.sh
surge --project ./dist --domain $DEPLOY_DOMAIN