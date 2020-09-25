import { InputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

const tooltipPrefix = [
  {
    pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/3909',
    changes: [
      {
        replace    : 'nzTitle',
        replaceWith: 'nzPopconfirmTitle',
        whitelist  : {
          attributes: ['nz-popconfirm']
        }
      },
      {
        replace    : 'nzTrigger',
        replaceWith: 'nzPopconfirmTrigger',
        whitelist  : {
          attributes: ['nz-popconfirm']
        }
      },
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
      },
      {
        replace    : 'nzTrigger',
        replaceWith: 'nzTooltipTrigger',
        whitelist  : {
          attributes: ['nz-tooltip']
        }
      },
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
      },
      {
        replace    : 'nzTrigger',
        replaceWith: 'nzPopoverTrigger',
        whitelist  : {
          attributes: ['nz-popover']
        }
      },
      {
        replace    : 'nzPlacement',
        replaceWith: 'nzPopoverPlacement',
        whitelist  : {
          attributes: ['nz-popover']
        }
      },
      {
        replace    : 'nzContent',
        replaceWith: 'nzPopoverContent',
        whitelist  : {
          attributes: ['nz-popover']
        }
      }
    ]
  }
]

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
  [ TargetVersion.V10 ]: [
    ...tooltipPrefix,
    {
      pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/5817',
      changes: [
        {
          replace    : 'nzVisible',
          replaceWith: 'nzTooltipVisible',
          whitelist  : {
            attributes: [ 'nz-tooltip' ]
          }
        },
        {
          replace    : 'nzVisible',
          replaceWith: 'nzPopoverVisible',
          whitelist  : {
            attributes: [ 'nz-popover' ]
          }
        },
        {
          replace    : 'nzVisible',
          replaceWith: 'nzPopconfirmVisible',
          whitelist  : {
            attributes: [ 'nz-popconfirm' ]
          }
        },
        {
          replace    : 'nzOverlayStyle',
          replaceWith: 'nzTooltipOverlayStyle',
          whitelist  : {
            attributes: [ 'nz-tooltip' ]
          }
        },
        {
          replace    : 'nzOverlayStyle',
          replaceWith: 'nzPopoverOverlayStyle',
          whitelist  : {
            attributes: [ 'nz-popover' ]
          }
        },
        {
          replace    : 'nzOverlayStyle',
          replaceWith: 'nzPopconfirmOverlayStyle',
          whitelist  : {
            attributes: [ 'nz-popconfirm' ]
          }
        },
        {
          replace    : 'nzOverlayClassName',
          replaceWith: 'nzTooltipOverlayClassName',
          whitelist  : {
            attributes: [ 'nz-tooltip' ]
          }
        },
        {
          replace    : 'nzOverlayClassName',
          replaceWith: 'nzPopoverOverlayClassName',
          whitelist  : {
            attributes: [ 'nz-popover' ]
          }
        },
        {
          replace    : 'nzOverlayClassName',
          replaceWith: 'nzPopconfirmOverlayClassName',
          whitelist  : {
            attributes: [ 'nz-popconfirm' ]
          }
        },
        {
          replace    : 'nzMouseLeaveDelay',
          replaceWith: 'nzTooltipMouseLeaveDelay',
          whitelist  : {
            attributes: [ 'nz-tooltip' ]
          }
        },
        {
          replace    : 'nzMouseLeaveDelay',
          replaceWith: 'nzPopoverMouseLeaveDelay',
          whitelist  : {
            attributes: [ 'nz-popover' ]
          }
        },
        {
          replace    : 'nzMouseLeaveDelay',
          replaceWith: 'nzPopconfirmMouseLeaveDelay',
          whitelist  : {
            attributes: [ 'nz-popconfirm' ]
          }
        },
        {
          replace    : 'nzMouseEnterDelay',
          replaceWith: 'nzTooltipMouseEnterDelay',
          whitelist  : {
            attributes: [ 'nz-tooltip' ]
          }
        },
        {
          replace    : 'nzMouseEnterDelay',
          replaceWith: 'nzPopoverMouseEnterDelay',
          whitelist  : {
            attributes: [ 'nz-popover' ]
          }
        },
        {
          replace    : 'nzMouseEnterDelay',
          replaceWith: 'nzPopconfirmMouseEnterDelay',
          whitelist  : {
            attributes: [ 'nz-popconfirm' ]
          }
        }
      ]
    },
    {
      pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/5776',
      changes: [
        {
          replace    : 'nzTarget',
          replaceWith: 'nzContainer',
          whitelist  : {
            elements: [ 'nz-anchor' ]
          }
        }
      ]
    },
    {
      pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/5792',
      changes: [
        {
          replace    : 'nzSort',
          replaceWith: 'nzSortOrder',
          whitelist  : {
            elements: [ 'th' ]
          }
        }
      ]
    },
    {
      pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/5793',
      changes: [
        {
          replace    : 'nzClassName',
          replaceWith: 'ngClass',
          whitelist  : {
            elements: [ 'nz-date-picker', 'nz-week-picker', 'nz-month-picker', 'nz-year-picker', 'nz-range-picker' ]
          }
        },
        {
          replace    : 'nzStyle',
          replaceWith: 'ngStyle',
          whitelist  : {
            elements: [ 'nz-date-picker', 'nz-week-picker', 'nz-month-picker', 'nz-year-picker', 'nz-range-picker' ]
          }
        }
      ]
    }
  ],
  [ TargetVersion.V9 ]: [
    ...tooltipPrefix,
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/4601',
      changes: [
        {
          replace    : 'nzDefaultExpandAll',
          replaceWith: 'nzExpandAll',
          whitelist  : {
            elements: ['nz-tree', 'nz-tree-node']
          }
        },
        {
          replace    : 'nzDefaultExpandedKeys',
          replaceWith: 'nzExpandedKeys',
          whitelist  : {
            elements: ['nz-tree', 'nz-tree-select']
          }
        },
        {
          replace    : 'nzDefaultSelectedKeys',
          replaceWith: 'nzSelectedKeys',
          whitelist  : {
            elements: ['nz-tree']
          }
        },
        {
          replace    : 'nzDefaultCheckedKeys',
          replaceWith: 'nzCheckedKeys',
          whitelist  : {
            elements: ['nz-tree']
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
