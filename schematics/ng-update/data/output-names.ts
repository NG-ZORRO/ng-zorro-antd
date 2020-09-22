import { OutputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const outputNames: VersionChanges<OutputNameUpgradeData> = {
  [ TargetVersion.V9 ]: [
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/4601',
      changes: [
        {
          replace    : 'nzOnSearchNode',
          replaceWith: 'nzSearchValueChange',
          whitelist  : {
            elements: ['nz-tree']
          }
        }
      ]
    }
  ],
  [ TargetVersion.V10 ]: [
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/5792',
      changes: [
        {
          replace    : 'nzSortChange',
          replaceWith: 'nzSortOrderChange',
          whitelist  : {
            elements: ['thead', 'th']
          }
        }
      ]
    },
    {
      pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/5817',
      changes: [
        {
          replace : 'nzVisibleChange',
          replaceWith: 'nzTooltipVisibleChange',
          whitelist : {
            attributes: ['nz-tooltip']
          }
        },
        {
          replace : 'nzVisibleChange',
          replaceWith: 'nzPopoverVisibleChange',
          whitelist : {
            attributes: ['nz-popover']
          }
        },
        {
          replace : 'nzVisibleChange',
          replaceWith: 'nzPopconfirmVisibleChange',
          whitelist : {
            attributes: ['nz-popconfirm']
          }
        }
      ]
    }
  ]
};
