echo $SYSTEM_PULLREQUEST_PULLREQUESTID
export DEPLOY_DOMAIN=https://preview-${SYSTEM_PULLREQUEST_PULLREQUESTID}-ng-zorro-antd.surge.sh
surge --project ./dist --domain $DEPLOY_DOMAIN
