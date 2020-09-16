import { ClassNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const classNames: VersionChanges<ClassNameUpgradeData> = {
  [TargetVersion.V10]: [
    {
      pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/5774',
      changes: [
        {replace: 'UploadType', replaceWith: 'NzUploadType'},
        {replace: 'UploadListType', replaceWith: 'NzUploadListType'},
        {replace: 'UploadFile', replaceWith: 'NzUploadFile'},
        {replace: 'UploadChangeParam', replaceWith: 'NzUploadChangeParam'},
        {replace: 'ShowUploadListInterface', replaceWith: 'NzShowUploadList'},
        {replace: 'UploadTransformFileType', replaceWith: 'NzUploadTransformFileType'},
        {replace: 'UploadXHRArgs', replaceWith: 'NzUploadXHRArgs'}
      ]
    },
    {
      pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/5779',
      changes: [
        {replace: 'NzNotificationDataFilled', replaceWith: 'NzNotificationRef'},
        {replace: 'NzMessageDataFilled', replaceWith: 'NzMessageRef'}
      ]
    },
    {
      pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/5778',
      changes: [
        {replace: 'CascaderOption', replaceWith: 'NzCascaderOption'},
        {replace: 'CascaderSearchOption', replaceWith: 'NzCascaderSearchOption'}
      ]
    }
  ]
};
