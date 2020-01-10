import { InputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const inputNames: VersionChanges<InputNameUpgradeData> = {
  [ TargetVersion.V7 ]: [
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/2969',
      changes: [
        {
          replace    : 'nzSuffix',
          replaceWith: 'nzAddOnAfter',
          whitelist  : {
            attributes: [ 'nzSearch' ]
          }
        }
      ]
    }
  ],
  [ TargetVersion.V9 ]: [
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/3909',
      changes: [
        {
          replace    : 'nzTitle',
          replaceWith: 'nzPopconfirmTitle',
          whitelist  : {
            attributes: ['nz-popconfirm']
          }
        }
      ]
    },
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/3909',
      changes: [
        {
          replace    : 'nzTrigger',
          replaceWith: 'nzPopconfirmTrigger',
          whitelist  : {
            attributes: ['nz-popconfirm']
          }
        }
      ]
    },
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/3909',
      changes: [
        {
          replace    : 'nzPlacement',
          replaceWith: 'nzPopconfirmPlacement',
          whitelist  : {
            attributes: ['nz-popconfirm']
          }
        }
      ]
    },
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/3909',
      changes: [
        {
          replace    : 'nzTitle',
          replaceWith: 'nzTooltipTitle',
          whitelist  : {
            attributes: ['nz-tooltip']
          }
        }
      ]
    },
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/3909',
      changes: [
        {
          replace    : 'nzTrigger',
          replaceWith: 'nzTooltipTrigger',
          whitelist  : {
            attributes: ['nz-tooltip']
          }
        }
      ]
    },
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/3909',
      changes: [
        {
          replace    : 'nzPlacement',
          replaceWith: 'nzTooltipPlacement',
          whitelist  : {
            attributes: ['nz-tooltip']
          }
        }
      ]
    },
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/3909',
      changes: [
        {
          replace    : 'nzTitle',
          replaceWith: 'nzPopoverTitle',
          whitelist  : {
            attributes: ['nz-popover']
          }
        }
      ]
    },
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/3909',
      changes: [
        {
          replace    : 'nzTrigger',
          replaceWith: 'nzPopoverTrigger',
          whitelist  : {
            attributes: ['nz-popover']
          }
        }
      ]
    },
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/3909',
      changes: [
        {
          replace    : 'nzPlacement',
          replaceWith: 'nzPopoverPlacement',
          whitelist  : {
            attributes: ['nz-popover']
          }
        }
      ]
    },
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/3909',
      changes: [
        {
          replace    : 'nzContent',
          replaceWith: 'nzPopoverContent',
          whitelist  : {
            attributes: ['nz-popover']
          }
        }
      ]
    },
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/4375',
      changes: [
        {
          replace    : 'type',
          replaceWith: 'nzType',
          whitelist  : {
            attributes: ['nz-icon']
          }
        }
      ]
    },
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/4375',
      changes: [
        {
          replace    : 'iconfont',
          replaceWith: 'nzIconfont',
          whitelist  : {
            attributes: ['nz-icon']
          }
        }
      ]
    },
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/4375',
      changes: [
        {
          replace    : 'spin',
          replaceWith: 'nzSpin',
          whitelist  : {
            attributes: ['nz-icon']
          }
        }
      ]
    },
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/4375',
      changes: [
        {
          replace    : 'theme',
          replaceWith: 'nzTheme',
          whitelist  : {
            attributes: ['nz-icon']
          }
        }
      ]
    },
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/4375',
      changes: [
        {
          replace    : 'twoToneColor',
          replaceWith: 'nzTwoToneColor',
          whitelist  : {
            attributes: ['nz-icon']
          }
        }
      ]
    }
  ]
};
