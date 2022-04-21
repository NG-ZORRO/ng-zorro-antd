/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

const tooltipPrefix = [
  {
    pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/3909',
    changes: [
      {
        replace    : 'nzTitle',
        replaceWith: 'nzPopconfirmTitle',
        limitedTo  : {
          attributes: ['nz-popconfirm']
        }
      },
      {
        replace    : 'nzTrigger',
        replaceWith: 'nzPopconfirmTrigger',
        limitedTo  : {
          attributes: ['nz-popconfirm']
        }
      },
      {
        replace    : 'nzPlacement',
        replaceWith: 'nzPopconfirmPlacement',
        limitedTo  : {
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
        limitedTo  : {
          attributes: ['nz-tooltip']
        }
      },
      {
        replace    : 'nzTrigger',
        replaceWith: 'nzTooltipTrigger',
        limitedTo  : {
          attributes: ['nz-tooltip']
        }
      },
      {
        replace    : 'nzPlacement',
        replaceWith: 'nzTooltipPlacement',
        limitedTo  : {
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
        limitedTo  : {
          attributes: ['nz-popover']
        }
      },
      {
        replace    : 'nzTrigger',
        replaceWith: 'nzPopoverTrigger',
        limitedTo  : {
          attributes: ['nz-popover']
        }
      },
      {
        replace    : 'nzPlacement',
        replaceWith: 'nzPopoverPlacement',
        limitedTo  : {
          attributes: ['nz-popover']
        }
      },
      {
        replace    : 'nzContent',
        replaceWith: 'nzPopoverContent',
        limitedTo  : {
          attributes: ['nz-popover']
        }
      }
    ]
  }
];

export const inputNames: VersionChanges<InputNameUpgradeData> = {
  [ TargetVersion.V7 ]: [
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/2969',
      changes: [
        {
          replace    : 'nzSuffix',
          replaceWith: 'nzAddOnAfter',
          limitedTo  : {
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
          limitedTo  : {
            attributes: [ 'nz-tooltip' ]
          }
        },
        {
          replace    : 'nzVisible',
          replaceWith: 'nzPopoverVisible',
          limitedTo  : {
            attributes: [ 'nz-popover' ]
          }
        },
        {
          replace    : 'nzVisible',
          replaceWith: 'nzPopconfirmVisible',
          limitedTo  : {
            attributes: [ 'nz-popconfirm' ]
          }
        },
        {
          replace    : 'nzOverlayStyle',
          replaceWith: 'nzTooltipOverlayStyle',
          limitedTo  : {
            attributes: [ 'nz-tooltip' ]
          }
        },
        {
          replace    : 'nzOverlayStyle',
          replaceWith: 'nzPopoverOverlayStyle',
          limitedTo  : {
            attributes: [ 'nz-popover' ]
          }
        },
        {
          replace    : 'nzOverlayStyle',
          replaceWith: 'nzPopconfirmOverlayStyle',
          limitedTo  : {
            attributes: [ 'nz-popconfirm' ]
          }
        },
        {
          replace    : 'nzOverlayClassName',
          replaceWith: 'nzTooltipOverlayClassName',
          limitedTo  : {
            attributes: [ 'nz-tooltip' ]
          }
        },
        {
          replace    : 'nzOverlayClassName',
          replaceWith: 'nzPopoverOverlayClassName',
          limitedTo  : {
            attributes: [ 'nz-popover' ]
          }
        },
        {
          replace    : 'nzOverlayClassName',
          replaceWith: 'nzPopconfirmOverlayClassName',
          limitedTo  : {
            attributes: [ 'nz-popconfirm' ]
          }
        },
        {
          replace    : 'nzMouseLeaveDelay',
          replaceWith: 'nzTooltipMouseLeaveDelay',
          limitedTo  : {
            attributes: [ 'nz-tooltip' ]
          }
        },
        {
          replace    : 'nzMouseLeaveDelay',
          replaceWith: 'nzPopoverMouseLeaveDelay',
          limitedTo  : {
            attributes: [ 'nz-popover' ]
          }
        },
        {
          replace    : 'nzMouseLeaveDelay',
          replaceWith: 'nzPopconfirmMouseLeaveDelay',
          limitedTo  : {
            attributes: [ 'nz-popconfirm' ]
          }
        },
        {
          replace    : 'nzMouseEnterDelay',
          replaceWith: 'nzTooltipMouseEnterDelay',
          limitedTo  : {
            attributes: [ 'nz-tooltip' ]
          }
        },
        {
          replace    : 'nzMouseEnterDelay',
          replaceWith: 'nzPopoverMouseEnterDelay',
          limitedTo  : {
            attributes: [ 'nz-popover' ]
          }
        },
        {
          replace    : 'nzMouseEnterDelay',
          replaceWith: 'nzPopconfirmMouseEnterDelay',
          limitedTo  : {
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
          limitedTo  : {
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
          limitedTo  : {
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
          limitedTo  : {
            elements: [ 'nz-date-picker', 'nz-week-picker', 'nz-month-picker', 'nz-year-picker', 'nz-range-picker' ]
          }
        },
        {
          replace    : 'nzStyle',
          replaceWith: 'ngStyle',
          limitedTo  : {
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
          limitedTo  : {
            elements: ['nz-tree', 'nz-tree-node']
          }
        },
        {
          replace    : 'nzDefaultExpandedKeys',
          replaceWith: 'nzExpandedKeys',
          limitedTo  : {
            elements: ['nz-tree', 'nz-tree-select']
          }
        },
        {
          replace    : 'nzDefaultSelectedKeys',
          replaceWith: 'nzSelectedKeys',
          limitedTo  : {
            elements: ['nz-tree']
          }
        },
        {
          replace    : 'nzDefaultCheckedKeys',
          replaceWith: 'nzCheckedKeys',
          limitedTo  : {
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
          limitedTo  : {
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
          limitedTo  : {
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
          limitedTo  : {
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
          limitedTo  : {
            attributes: ['nz-icon']
          }
        }
      ]
    },
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/7141',
      changes: [
        {
          replace    : 'twoToneColor',
          replaceWith: 'nzTwoToneColor',
          limitedTo  : {
            attributes: ['nz-icon']
          }
        }
      ]
    }
  ],
  [ TargetVersion.V12 ]: [
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/6754',
      changes: [
        {
          replace    : 'nzNodeWidth',
          replaceWith: 'nzItemSize',
          limitedTo  : {
            elements: ['nz-tree-virtual-scroll-view']
          }
        }
      ]
    }
  ],
  [ TargetVersion.V13 ]: [
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/7141',
      changes: [
        {
          replace    : 'nzHasBackdrop',
          replaceWith: 'nzBackdrop',
          limitedTo  : {
            elements: ['nz-filter-trigger'],
            attributes: ['nz-dropdown']
          }
        }
      ]
    }
  ]
};
