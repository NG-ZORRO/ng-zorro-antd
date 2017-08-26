export const ROUTER_LIST = {
  'intro'     : [
    {
      'path'        : 'docs/angular/introduce',
      'loadChildren': './nz-intro-index/nz-intro.module#NzIntroModule',
      'label'       : 'Ant Design of Angular'
    },
    {
      'path'        : 'docs/angular/getting-started',
      'loadChildren': './nz-intro-getting-started/nz-intro-get-started.module#NzIntroGetStartedModule',
      'label'       : '快速上手'
    },
    {
      'path'        : 'changelog',
      'loadChildren': './nz-intro-changelog/nz-intro-changelog.module#NzIntroChangeLogModule',
      'label'       : '更新日志'
    }
  ],
  'components': [
    {
      'name'    : 'General',
      'children': [
        {
          'label'       : 'Button',
          'path'        : 'components/button',
          'loadChildren': './nz-demo-button/nz-demo-button.module#NzDemoButtonModule',
          'zh'          : '按钮'
        },
        {
          'label'       : 'Icon',
          'path'        : 'components/icon',
          'loadChildren': './nz-demo-icon/nz-demo-icon.module#NzDemoIconModule',
          'zh'          : '图标'
        }
      ]
    },
    {
      'name'    : 'Layout',
      'children': [
        {
          'label'       : 'Grid',
          'path'        : 'components/grid',
          'loadChildren': './nz-demo-grid/nz-demo-grid.module#NzDemoGridModule',
          'zh'          : '栅格'
        },
        {
          'label'       : 'Layout',
          'path'        : 'components/layout',
          'loadChildren': './nz-demo-layout/nz-demo-layout.module#NzDemoLayoutModule',
          'zh'          : '布局'
        }
      ]
    },
    {
      'name'    : 'Navigation',
      'children': [
        {
          'label'       : 'Affix',
          'path'        : 'components/affix',
          'loadChildren': './nz-demo-affix/nz-demo-affix.module#NzDemoAffixModule',
          'zh'          : '固钉'
        },
        {
          'label'       : 'Breadcrumb',
          'path'        : 'components/breadcrumb',
          'loadChildren': './nz-demo-breadcrumb/nz-demo-breadcrumb.module#NzDemoBreadCrumbModule',
          'zh'          : '面包屑'
        },
        {
          'label'       : 'Dropdown',
          'path'        : 'components/dropdown',
          'loadChildren': './nz-demo-dropdown/nz-demo-dropdown.module#NzDemoDropDownModule',
          'zh'          : '下拉菜单'
        },
        {
          'label'       : 'Menu',
          'path'        : 'components/menu',
          'loadChildren': './nz-demo-menu/nz-demo-menu.module#NzDemoMenuModule',
          'zh'          : '菜单'
        },
        {
          'label'       : 'Pagination',
          'path'        : 'components/pagination',
          'loadChildren': './nz-demo-pagination/nz-demo-pagination.module#NzDemoPaginationModule',
          'zh'          : '分页'
        },
        {
          'label'       : 'Steps',
          'path'        : 'components/steps',
          'loadChildren': './nz-demo-steps/nz-demo-steps.module#NzDemoStepsModule',
          'zh'          : '步骤条'
        }
      ]
    },
    {
      'name'    : 'Data Entry',
      'children': [
        {
          'label'       : 'Cascader',
          'path'        : 'components/cascader',
          'loadChildren': './nz-demo-cascader/nz-demo-cascader.module#NzDemoCascaderModule',
          'zh'          : '级联选择'
        },
        {
          'label'       : 'Checkbox',
          'path'        : 'components/checkbox',
          'loadChildren': './nz-demo-checkbox/nz-demo-checkbox.module#NzDemoCheckboxModule',
          'zh'          : '多选框'
        },
        {
          'label'       : 'DatePicker',
          'path'        : 'components/date-picker',
          'loadChildren': './nz-demo-datepicker/nz-demo-datepicker.module#NzDemoDatePickerModule',
          'zh'          : '日期选择框'
        },
        {
          'label'       : 'Form',
          'path'        : 'components/form',
          'loadChildren': './nz-demo-form/nz-demo-form.module#NzDemoFormModule',
          'zh'          : '表单'
        },
        {
          'label'       : 'InputNumber',
          'path'        : 'components/input-number',
          'loadChildren': './nz-demo-input-number/nz-demo-input-number.module#NzDemoInputNumberModule',
          'zh'          : '数字输入框'
        },
        {
          'label'       : 'Input',
          'path'        : 'components/input',
          'loadChildren': './nz-demo-input/nz-demo-input.module#NzDemoInputModule',
          'zh'          : '输入框'
        },
        {
          'label'       : 'Rate',
          'path'        : 'components/rate',
          'loadChildren': './nz-demo-rate/nz-demo-rate.module#NzDemoRateModule',
          'zh'          : '评分'
        },
        {
          'label'       : 'Radio',
          'path'        : 'components/radio',
          'loadChildren': './nz-demo-radio/nz-demo-radio.module#NzDemoRadioModule',
          'zh'          : '单选框'
        },
        {
          'label'       : 'Select',
          'path'        : 'components/select',
          'loadChildren': './nz-demo-select/nz-demo-select.module#NzDemoSelectModule',
          'zh'          : '选择器'
        },
        {
          'label'       : 'Slider',
          'path'        : 'components/slider',
          'loadChildren': './nz-demo-slider/nz-demo-slider.module#NzDemoSliderModule',
          'zh'          : '滑动输入条'
        },
        {
          'label'       : 'Switch',
          'path'        : 'components/switch',
          'loadChildren': './nz-demo-switch/nz-demo-switch.module#NzDemoSwitchModule',
          'zh'          : '开关'
        },
        {
          'label'       : 'TimePicker',
          'path'        : 'components/time-picker',
          'loadChildren': './nz-demo-timepicker/nz-demo-timepicker.module#NzDemoTimePickerModule',
          'zh'          : '时间选择框'
        }
      ]
    },
    {
      'name'    : 'Data Display',
      'children': [
        {
          'label'       : 'Avatar',
          'path'        : 'components/avatar',
          'loadChildren': './nz-demo-avatar/nz-demo-avatar.module#NzDemoAvatarModule',
          'zh'          : '头像'
        },
        {
          'label'       : 'Badge',
          'path'        : 'components/badge',
          'loadChildren': './nz-demo-badge/nz-demo-badge.module#NzDemoBadgeModule',
          'zh'          : '徽标数'
        },
        {
          'label'       : 'Calendar',
          'path'        : 'components/calendar',
          'loadChildren': './nz-demo-calendar/nz-demo-calendar.module#NzDemoCalendarModule',
          'zh'          : '日历'
        },
        {
          'label'       : 'Card',
          'path'        : 'components/card',
          'loadChildren': './nz-demo-card/nz-demo-card.module#NzDemoCardModule',
          'zh'          : '卡片'
        },
        {
          'label'       : 'Carousel',
          'path'        : 'components/carousel',
          'loadChildren': './nz-demo-carousel/nz-demo-carousel.module#NzDemoCarouselModule',
          'zh'          : '走马灯'
        },
        {
          'label'       : 'Collapse',
          'path'        : 'components/collapse',
          'loadChildren': './nz-demo-collapse/nz-demo-collapse.module#NzDemoCollapseModule',
          'zh'          : '折叠面板'
        },
        {
          'label'       : 'Popover',
          'path'        : 'components/popover',
          'loadChildren': './nz-demo-popover/nz-demo-popover.module#NzDemoPopoverModule',
          'zh'          : '气泡卡片'
        },
        {
          'label'       : 'Tooltip',
          'path'        : 'components/tooltip',
          'loadChildren': './nz-demo-tooltip/nz-demo-tooltip.module#NzDemoTooltipModule',
          'zh'          : '文字提示'
        },
        {
          'label'       : 'Table',
          'path'        : 'components/table',
          'loadChildren': './nz-demo-table/nz-demo-table.module#NzDemoTableModule',
          'zh'          : '表格'
        },
        {
          'label'       : 'Tabs',
          'path'        : 'components/tabs',
          'loadChildren': './nz-demo-tabs/nz-demo-tabs.module#NzDemoTabsModule',
          'zh'          : '标签页'
        },
        {
          'label'       : 'Tag',
          'path'        : 'components/tag',
          'loadChildren': './nz-demo-tag/nz-demo-tag.module#NzDemoTagModule',
          'zh'          : '标签'
        },
        {
          'label'       : 'Timeline',
          'path'        : 'components/timeline',
          'loadChildren': './nz-demo-timeline/nz-demo-timeline.module#NzDemoTimelineModule',
          'zh'          : '时间轴'
        }
      ]
    },
    {
      'name'    : 'FeedBack',
      'children': [
        {
          'label'       : 'Alert',
          'path'        : 'components/alert',
          'loadChildren': './nz-demo-alert/nz-demo-alert.module#NzDemoAlertModule',
          'zh'          : '警告提示'
        },
        {
          'label'       : 'Message',
          'path'        : 'components/message',
          'loadChildren': './nz-demo-message/nz-demo-message.module#NzDemoMessageModule',
          'zh'          : '全局提示'
        },
        {
          'label'       : 'Modal',
          'path'        : 'components/modal',
          'loadChildren': './nz-demo-modal/nz-demo-modal.module#NzDemoModalModule',
          'zh'          : '对话框'
        },
        {
          'label'       : 'Notification',
          'path'        : 'components/notification',
          'loadChildren': './nz-demo-notification/nz-demo-notification.module#NzDemoNotificationModule',
          'zh'          : '通知提醒框'
        },
        {
          'label'       : 'Progress',
          'path'        : 'components/progress',
          'loadChildren': './nz-demo-progress/nz-demo-progress.module#NzDemoProgressModule',
          'zh'          : '进度条'
        },
        {
          'label'       : 'Popconfirm',
          'path'        : 'components/popconfirm',
          'loadChildren': './nz-demo-popconfirm/nz-demo-popconfirm.module#NzDemoPopconfirmModule',
          'zh'          : '气泡确认框'
        },
        {
          'label'       : 'Spin',
          'path'        : 'components/spin',
          'loadChildren': './nz-demo-spin/nz-demo-spin.module#NzDemoSpinModule',
          'zh'          : '加载中'
        }
      ]
    },
    {
      'name'    : 'Other',
      'children': [
        {
          'label'       : 'Anchor',
          'path'        : 'other/anchor',
          'loadChildren': './nz-demo-anchor/nz-demo-anchor.module#NzDemoAnchorModule',
          'zh'          : '锚点'
        },
        {
          'label'       : 'BackTop',
          'path'        : 'other/back-top',
          'loadChildren': './nz-demo-back-top/nz-demo-back-top.module#NzDemoBackTopModule',
          'zh'          : '回到顶部'
        }
      ]
    }
  ]
};

export const INTRO_ROUTES = [
  {
    'path'        : 'docs/angular/introduce',
    'loadChildren': './nz-intro-index/nz-intro.module#NzIntroModule'
  },
  {
    'path'        : 'docs/angular/getting-started',
    'loadChildren': './nz-intro-getting-started/nz-intro-get-started.module#NzIntroGetStartedModule'
  },
  {
    'path'        : 'changelog',
    'loadChildren': './nz-intro-changelog/nz-intro-changelog.module#NzIntroChangeLogModule'
  }
];
export const DEMO_ROUTES = [
  {
    'path'        : 'components/button',
    'loadChildren': './nz-demo-button/nz-demo-button.module#NzDemoButtonModule'
  },
  {
    'path'        : 'components/icon',
    'loadChildren': './nz-demo-icon/nz-demo-icon.module#NzDemoIconModule'
  },
  {
    'path'        : 'components/grid',
    'loadChildren': './nz-demo-grid/nz-demo-grid.module#NzDemoGridModule'
  },
  {
    'path'        : 'components/layout',
    'loadChildren': './nz-demo-layout/nz-demo-layout.module#NzDemoLayoutModule'
  },
  {
    'path'        : 'components/breadcrumb',
    'loadChildren': './nz-demo-breadcrumb/nz-demo-breadcrumb.module#NzDemoBreadCrumbModule'
  },
  {
    'path'        : 'components/dropdown',
    'loadChildren': './nz-demo-dropdown/nz-demo-dropdown.module#NzDemoDropDownModule'
  },
  {
    'path'        : 'components/menu',
    'loadChildren': './nz-demo-menu/nz-demo-menu.module#NzDemoMenuModule'
  },
  {
    'path'        : 'components/pagination',
    'loadChildren': './nz-demo-pagination/nz-demo-pagination.module#NzDemoPaginationModule'
  },
  {
    'path'        : 'components/steps',
    'loadChildren': './nz-demo-steps/nz-demo-steps.module#NzDemoStepsModule'
  },
  {
    'path'        : 'components/cascader',
    'loadChildren': './nz-demo-cascader/nz-demo-cascader.module#NzDemoCascaderModule'
  },
  {
    'path'        : 'components/checkbox',
    'loadChildren': './nz-demo-checkbox/nz-demo-checkbox.module#NzDemoCheckboxModule'
  },
  {
    'path'        : 'components/date-picker',
    'loadChildren': './nz-demo-datepicker/nz-demo-datepicker.module#NzDemoDatePickerModule'
  },
  {
    'path'        : 'components/form',
    'loadChildren': './nz-demo-form/nz-demo-form.module#NzDemoFormModule'
  },
  {
    'path'        : 'components/input-number',
    'loadChildren': './nz-demo-input-number/nz-demo-input-number.module#NzDemoInputNumberModule'
  },
  {
    'path'        : 'components/input',
    'loadChildren': './nz-demo-input/nz-demo-input.module#NzDemoInputModule'
  },
  {
    'path'        : 'components/rate',
    'loadChildren': './nz-demo-rate/nz-demo-rate.module#NzDemoRateModule'
  },
  {
    'path'        : 'components/radio',
    'loadChildren': './nz-demo-radio/nz-demo-radio.module#NzDemoRadioModule'
  },
  {
    'path'        : 'components/select',
    'loadChildren': './nz-demo-select/nz-demo-select.module#NzDemoSelectModule'
  },
  {
    'path'        : 'components/slider',
    'loadChildren': './nz-demo-slider/nz-demo-slider.module#NzDemoSliderModule'
  },
  {
    'path'        : 'components/switch',
    'loadChildren': './nz-demo-switch/nz-demo-switch.module#NzDemoSwitchModule'
  },
  {
    'path'        : 'components/time-picker',
    'loadChildren': './nz-demo-timepicker/nz-demo-timepicker.module#NzDemoTimePickerModule'
  },
  {
    'path'        : 'components/badge',
    'loadChildren': './nz-demo-badge/nz-demo-badge.module#NzDemoBadgeModule'
  },
  {
    'path'        : 'components/calendar',
    'loadChildren': './nz-demo-calendar/nz-demo-calendar.module#NzDemoCalendarModule'
  },
  {
    'path'        : 'components/card',
    'loadChildren': './nz-demo-card/nz-demo-card.module#NzDemoCardModule'
  },
  {
    'path'        : 'components/carousel',
    'loadChildren': './nz-demo-carousel/nz-demo-carousel.module#NzDemoCarouselModule'
  },
  {
    'path'        : 'components/collapse',
    'loadChildren': './nz-demo-collapse/nz-demo-collapse.module#NzDemoCollapseModule'
  },
  {
    'path'        : 'components/popover',
    'loadChildren': './nz-demo-popover/nz-demo-popover.module#NzDemoPopoverModule'
  },
  {
    'path'        : 'components/tooltip',
    'loadChildren': './nz-demo-tooltip/nz-demo-tooltip.module#NzDemoTooltipModule'
  },
  {
    'path'        : 'components/table',
    'loadChildren': './nz-demo-table/nz-demo-table.module#NzDemoTableModule'
  },
  {
    'path'        : 'components/tabs',
    'loadChildren': './nz-demo-tabs/nz-demo-tabs.module#NzDemoTabsModule'
  },
  {
    'path'        : 'components/tag',
    'loadChildren': './nz-demo-tag/nz-demo-tag.module#NzDemoTagModule'
  },
  {
    'path'        : 'components/timeline',
    'loadChildren': './nz-demo-timeline/nz-demo-timeline.module#NzDemoTimelineModule'
  },
  {
    'path'        : 'components/alert',
    'loadChildren': './nz-demo-alert/nz-demo-alert.module#NzDemoAlertModule'
  },
  {
    'path'        : 'components/message',
    'loadChildren': './nz-demo-message/nz-demo-message.module#NzDemoMessageModule'
  },
  {
    'path'        : 'components/modal',
    'loadChildren': './nz-demo-modal/nz-demo-modal.module#NzDemoModalModule'
  },
  {
    'path'        : 'components/notification',
    'loadChildren': './nz-demo-notification/nz-demo-notification.module#NzDemoNotificationModule'
  },
  {
    'path'        : 'components/progress',
    'loadChildren': './nz-demo-progress/nz-demo-progress.module#NzDemoProgressModule'
  },
  {
    'path'        : 'components/popconfirm',
    'loadChildren': './nz-demo-popconfirm/nz-demo-popconfirm.module#NzDemoPopconfirmModule'
  },
  {
    'path'        : 'components/spin',
    'loadChildren': './nz-demo-spin/nz-demo-spin.module#NzDemoSpinModule'
  },
  {
    'path'        : 'components/affix',
    'loadChildren': './nz-demo-affix/nz-demo-affix.module#NzDemoAffixModule'
  },
  {
    'path'        : 'other/back-top',
    'loadChildren': './nz-demo-back-top/nz-demo-back-top.module#NzDemoBackTopModule'
  },
  {
    'path'        : 'other/anchor',
    'loadChildren': './nz-demo-anchor/nz-demo-anchor.module#NzDemoAnchorModule'
  },
  {
    'path'        : 'components/avatar',
    'loadChildren': './nz-demo-avatar/nz-demo-avatar.module#NzDemoAvatarModule'
  }
];

// export const INTRO_ROUTES = ROUTER_LIST.intro.map(route => {
//   return {
//     path        : route.path,
//     loadChildren: route.loadChildren
//   };
// });
// export const DEMO_ROUTES = ROUTER_LIST.components.reduce((previousValue, currentValue) => {
//   return previousValue.concat(currentValue.children)
// }, []).map(route => {
//   return {
//     path        : route.path,
//     loadChildren: route.loadChildren
//   };
// });
