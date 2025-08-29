---
order: 13
title: 更新日志
toc: false
timeline: true
---

`ng-zorro-antd` 严格遵循 [Semantic Versioning 2.0.0](https://semver.org/lang/zh-CN/) 语义化版本规范。

### 发布周期

- 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
- 次版本号：每月发布一个带有新特性的向下兼容的版本。
- 主版本号：含有破坏性更新和新特性，不在发布周期内。

---

## 20.2.0

`2025-08-29`

### Features

- **cascader:** 新增 `nzOpen` 属性控制可见性 ([#9339](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9339)) ([354c7cf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/354c7cfb9e9746fc55ccc3f5967721ab01737652))
- **collapse:** 新增 `nzCollapsible` 设置可折叠触发区域 ([#9349](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9349)) ([1ddbcaf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ddbcaf8e8c5f47a5c2354ac61bf3da707e8a99c))
- **collapse:** 新增 `nzSize` 设置折叠面板大小 ([#9348](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9348)) ([b5c256d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b5c256da531b5b306f831c8ee05acf0139bc7ad3))
- **divider:** 新增 `nzSize` 设置分割线大小 ([#9346](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9346)) ([1f54536](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f5453639f059c9058815834500e459df4082882))
- **dropdown:** 新增 `nzArrow` 属性控制是否展示箭头 ([#9329](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9329)) ([3686b73](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3686b7375839412b0db26f896fb810a4bdb2ae0c))
- **float-button:** `nzIcon` 支持字符串类型 ([#9302](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9302)) ([ce611e5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ce611e5d9096456e032db78acc886b5dde60220c))
- **segmented:** 新增 `nzVertical` 属性支持展示垂直方向 ([#9359](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9359)) ([52322cd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/52322cd50c1d2883a0df7ca0aee91f803448315b))
- **select,tree-select,cascader:** 支持设置前缀和后缀图标 ([#9328](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9328)) ([527ffb6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/527ffb6efee5759e58c7472f1fae2a619092f246))
- **tag:** 导出 `NzTagColor` 类型 ([#9314](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9314)) ([1efd29e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1efd29ee1de0f77854dd75c10c9156d50013067d))

### Bug Fixes

- **carousel:** `nzDotPotion` 为 `left` 或 `right` 时指示点位置不正确 ([#9358](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9358)) ([f117ccb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f117ccb739754e5a1b73be844679357cc807a238))
- **range-picker:** 鼠标离开时清理 outline ([#9352](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9352)) ([573d092](https://github.com/NG-ZORRO/ng-zorro-antd/commit/573d092f6e332acaeb33dfc03c0e370be6753df8))
- **segmented:** 仅图标时应只渲染一个元素 ([#9363](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9363)) ([89d2168](https://github.com/NG-ZORRO/ng-zorro-antd/commit/89d216871b0a9127aa4adbf6a034b7e2e1febf2d))

## 20.1.3

`2025-08-22`

### Bug Fixes

- **i18n:** 更新 `cs_CZ` 国际化文案 ([#9334](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9334)) ([93e486e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/93e486eeb848fb3cbb2073f107ae7be4bba2457b))
- **i18n:** 更新 `sk_SK` 国际化文案 ([#9335](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9335)) ([ddefc7f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ddefc7f9e95cde34101896fd5bfe587ff1dd8a89))
- **cascader:** 动态绑定时 value 和 label 不正确的问题 ([#9338](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9338)) ([324ab5b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/324ab5b2ad281abb77344b9ca0dd66d4ca55e794))
- **popconfirm:** 正确渲染标题和图标 ([#9322](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9322)) ([2c83788](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2c837883853a77a5a8fe1c2245daa0548a7bb2d9))
- **select:** 修复使用 `TemplateRef` 作为 `nzNotFoundContent` 时关闭下拉框时抖动的问题 ([#9336](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9336)) ([366f8eb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/366f8ebcd79900a4d6a512b72094af3494c55871))

## 20.1.2

`2025-08-08`

### Bug Fixes

- **input-number:** 修复展示值不正确的问题 ([#9312](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9312)) ([7a2d3b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7a2d3b6f97bf80f2f517626f5e02625c4488be80))
- **select,tree-select,cascader:** 已选项文本超出时展示省略号 ([#9316](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9316)) ([30672d7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/30672d7978f0ca4b24ec04c196c967b69e614525))
- **table:** 内部滚动元素增加 `cdkScrollable` 指令 ([#9308](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9308)) ([8cb4113](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8cb411332b90b55bab3ec742c455e3aaaf4618d7))

## 20.1.1

`2025-08-05`

### Bug Fixes

- **badge:** 导出 `NzBadgeStatusType` 类型 ([#9298](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9298)) ([91b1ad7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/91b1ad7af23eda253c21530e2a01a5ac9f7c62a8))
- **layout:** 修复代码示例问题 ([#9303](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9303)) ([9a37ef8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9a37ef8325522ee200462b75e13a72f403ec4bef))

## 20.1.0

`2025-07-21`

### Features

- 新增 [llms.txt](https://ng.ant.design/llms.txt) 和 [llms-full.txt](https://ng.ant.design/llms-full.txt) ([#9281](https://github.com/NG-ZORRO/ng-zorro-antd/pull/9281)) ([165b963](https://github.com/NG-ZORRO/ng-zorro-antd/commit/165b96372e737a6dceac9404bded06041d286e2a))
- **float-button:** 新增 `nzPlacement` 属性自定义弹出位置 ([#9267](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9267)) ([9dc19f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9dc19f35c9f4d9de0c6fc1f2b58c97f2aded95c1))
- **input-number:** 支持输入的数字带 `,` ([#9256](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9256)) ([7567bd8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7567bd87a7862b52c12e152b9ce0c395b5e18ff0))
- **input:** 一次性密码框支持通过键盘控制光标位置 ([#9268](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9268)) ([da97b02](https://github.com/NG-ZORRO/ng-zorro-antd/commit/da97b02a82361e23c77f14bec76add77f6c39302))
- **popconfirm:** 取消按钮支持设置 `nzDanger` 属性 ([#9270](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9270)) ([f94cb31](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f94cb318b05b01d1560ddfe3a5bfb226f23a83b4))
- **space:** 支持通过数组形式设置 `nzSize` ([#9289](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9289)) ([8809885](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8809885be2b268e38c8ba04f57f46803e92e0c28))
- **schematics:** 对齐 Angular 20 更新的风格指南 ([#9295](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9295)) ([b5f607b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b5f607b874ed150fb1858eb81b19c3cc67478f37))

### Bug Fixes

- **core:** 避免使用 `setAttribute` 设置 `style` ([#9292](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9292)) ([12d58bd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/12d58bde7cb8d762405728825d6261fe5fc663b8))
- **input-number:** ngModel 的值可为 `undefined` ([#9269](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9269)) ([4c5666a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c5666a90f477703dcda96ec135a6eea99d11105))
- **tooltip:** 重命名 `ToolTip` 为 `Tooltip` ([#9285](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9285)) ([2ebef97](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2ebef970cb7cd2855ee725b89ab8dfef9e6e35d6))
- **schematics:** 支持迁移 `ToolTip` 到 `Tooltip` ([#9294](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9294)) ([add21f7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/add21f71d92645be9f1c7684c2f213a6864f5891))

## 20.0.0

`2025-07-01`

### Features

- **cascader,date-picker,input-number,input,select,time-picker,tree-select:** 新增 `nzVariant` 属性设置变体 ([#9131](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9131)) ([b342bb4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b342bb464eb544a2e3fda8723cac7e550828b3f2))
- **popover:** 新增 `nzPopoverTitleContext` 和 `nzPopoverContentContext` 属性 ([#9126](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9126)) ([df3ead9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/df3ead9af8368eb7e2374744f01cecd5ccc21440))
- **select:** 新增 `nzOnClear` 事件回调 ([#9188](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9188)) ([e047ac2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e047ac249b16b547525a0ca4d13beeef620f44c4))
- **avatar:** 支持设置原生 `<img>` 的 `loading` 和 `fetchpriority` 属性 ([#7347](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7347)) ([ff8419f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ff8419f6614bdac8bc3c778e470da08b679889d0))
- **popconfirm:** 新增 `nzOkButtonProps` 和 `nzCancelButtonProps` ([#9245](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9245)) ([22e2a9f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/22e2a9fb148fd875c76fb339c6582d92aef62791))
- **tree-select:** 支持以 innerHTML 渲染已选项的 title ([#9259](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9259)) ([8066f7b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8066f7bb082c95652a2e158a01e55382992fe8c6))

### Bug Fixes

- **flex:** 修复 `NzAlign` 类型 ([#9151](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9151)) ([b271c19](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b271c19076ead71fabbe5b224072cfea975d801d))
- **segmented:** 接受 ng control 的禁用状态 ([#9166](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9166)) ([134cd59](https://github.com/NG-ZORRO/ng-zorro-antd/commit/134cd5976220d51179118491a4b4b2e4d7cf761c))
- **space:** 紧凑模式下只有一个子元素时的 border-radius 不正确 ([#9165](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9165)) ([d2f4541](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d2f4541a9ae01d6ea8705faf2bc4b96bf34b6945))
- **tabs:** 修复 tab focus 时不正确的滚动行为 ([#9186](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9186)) ([4f658e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4f658e0834e99ea2be0ffd4ead2dd041ec88fb83))
- **schematics:** 修复重复执行 `ng add` 时的问题 ([#9171](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9171)) ([d0a9748](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d0a974848c0e31ad41ba69a5af60c002a7b251cd))
- **water-mark:** 修复 ssr 模式的兼容问题 ([#9250](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9250)) ([a70a682](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a70a682c8aa4d073bb150abd4b69104fbe21e2ed))
- **icon:** 在 animation frame 上增加渲染防抖 ([#8579](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8579)) ([c0709d1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c0709d1e01d80969a48634fe8194dbfd49f6192f))

### Code Refactoring

- **core:** 移除对 animation frame 的 polyfill ([#9243](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9243)) ([272237a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/272237a7a33d150ac9c0f6965df37a678221b074))
- 从基于 `constructor` 的依赖注入模式迁移到 `inject`

### ⚠ BREAKING CHANGES

- **core:** 移除对 animation frame 的 polyfill
  - 重命名 `cancelRequestAnimationFrame` 为 `cancelAnimationFrame`
  - 重命名 `reqAnimFrame` 为 `requestAnimationFrame`
- **tabs:** 废弃 `NzTabsetComponent` 并重命名为 `NzTabsComponent`，废弃 `nz-tabset` 选择器并重命名为 `nz-tabs`
- **table:** 移除对 material 组件的兼容

* **popconfirm:** 废弃 `nzOkDisabled` 和 `nzOkDanger`，请使用 `nzOkButtonProps` 代替

移除以下在过去的版本中标记为废弃的 API:

| Module                       | API                                                      |
| ---------------------------- | -------------------------------------------------------- |
| `ng-zorro-antd/button`       | `NzButtonGroupComponent`                                 |
| `ng-zorro-antd/core/form`    | `NzFormPatchModule`                                      |
| `ng-zorro-antd/checkbox`     | `NzCheckBoxOptionInterface`                              |
| `ng-zorro-antd/input`        | `NzInputGroupComponent#nzCompact`                        |
| `ng-zorro-antd/message`      | `NzMessageModule`                                        |
| `ng-zorro-antd/notification` | `NzNotificationModule`<br/>`NzNotificationServiceModule` |

组件的 `exportAs` 属性命名统一采用小驼峰 `camelCase` 且以 `nz` 开头，并移除一些内部组件的 `exportAs` 属性。变化如下：

| Component                | Original               | Current                |
| ------------------------ | ---------------------- | ---------------------- |
| `calendar-footer`        | `calendarFooter`       | -                      |
| `date-helper`            | `dateHelper`           | -                      |
| `date-range-popup`       | `dateRangePopup`       | -                      |
| `date-table`             | `dateTable`            | -                      |
| `decade-helper`          | `decadeHelper`         | -                      |
| `decade-table`           | `decadeTable`          | -                      |
| `month-helper`           | `monthHelper`          | -                      |
| `month-table`            | `monthTable`           | -                      |
| `quarter-helper`         | `quarterHelper`        | -                      |
| `quarter-table`          | `quarterTable`         | -                      |
| `year-helper`            | `yearHelper`           | -                      |
| `year-table`             | `yearTable`            | -                      |
| `inner-popup`            | `innerPopup`           | -                      |
| `nz-color-block`         | `NzColorBlock`         | `nzColorBlock`         |
| `nz-color-format`        | `NzColorFormat`        | `nzColorFormat`        |
| `nz-color-picker`        | `NzColorPicker`        | `nzColorPicker`        |
| `nz-model-close`         | `NzModalCloseBuiltin`  | `nzModalCloseBuiltin`  |
| `nz-model-footer`        | `NzModalFooterBuiltin` | `nzModalFooterBuiltin` |
| `nz-model-title`         | `NzModalTitleBuiltin`  | `nzModalTitleBuiltin`  |
| `nz-tree-drop-indicator` | `NzTreeDropIndicator`  | `nzTreeDropIndicator`  |
| `nz-water-mark`          | `NzWaterMark`          | `nzWaterMark`          |
| `nz-tabs`                | `nzTabset`             | `nzTabs`               |

### Deprecations

在 v20 中，以下 API 被标记为 **deprecated**，并将在下一个主要版本中移除。 请参考相关文档以获取更好的替代方案。

| Module                         | API                                                                          |
| ------------------------------ | ---------------------------------------------------------------------------- |
| `ng-zorro-antd/autocomplete`   | `NZ_AUTOCOMPLETE_VALUE_ACCESSOR` <br /> `getNzAutocompleteMissingPanelError` |
| `ng-zorro-antd/button`         | `NzButtonGroupComponent`                                                     |
| `ng-zorro-antd/core/highlight` | `NzHighlightModule`                                                          |
| `ng-zorro-antd/core/form`      | `NzFormPatchModule`                                                          |
| `ng-zorro-antd/checkbox`       | `NzCheckBoxOptionInterface`                                                  |
| `ng-zorro-antd/input`          | `NzInputGroupComponent#nzCompact`                                            |
| `ng-zorro-antd/mention`        | `NZ_MENTION_TRIGGER_ACCESSOR`                                                |
| `ng-zorro-antd/message`        | `NzMessageModule`                                                            |
| `ng-zorro-antd/notification`   | `NzNotificationModule`<br/>`NzNotificationServiceModule`                     |
| `ng-zorro-antd/tabs`           | `NzTabsetComponent`                                                          |

## 19.3.1

`2025-05-29`

### Bug Fixes

- **cascader:** ngModel 值在选项中不存在时无法更新值 ([#9124](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9124)) ([689fc72](https://github.com/NG-ZORRO/ng-zorro-antd/commit/689fc72e5c8175c830f995155daf1d7d4c318c25))
- **date-picker:** `nzFormat` 改变时更新 input 元素的值 ([#9129](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9129)) ([f4c4e05](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f4c4e05264dd3109a0c45018886603ddd9c45aa2))
- **tabs:** 修复首次加载页面时 `nzLinkRouter` 不生效的问题 ([#9130](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9130)) ([925a6a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/925a6a54dd477b687b3dd0b836c32cb17e6d8a0f))

## 19.3.0

`2025-05-23`

### Features

- **avatar:** 支持通过 ng-content 自定义图标 ([#9090](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9090)) ([89d0767](https://github.com/NG-ZORRO/ng-zorro-antd/commit/89d076775b542996c46e48d2fb6f49c5981be40b))
- **input-number:** 新增 Output 属性 `nzBlur` 和 `nzFocus` ([#9098](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9098)) ([1b1a013](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1b1a0130df4a86fb2abd42d95213d880fd0b14d7))
- **tabs:** 附加内容支持 start 和 end 两种位置 ([#9097](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9097)) ([2500821](https://github.com/NG-ZORRO/ng-zorro-antd/commit/250082160770d7f24404bbed86af5df96b9f3e53))
- **transfer:** 支持键入 `Shift` 后多选 ([#9092](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9092)) ([b78b99f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b78b99f9f4cec6298cffc915b8ab86f708dccddf))

### Bug Fixes

- **i18n:** 更新 `es_ES` 国际化文案 ([#9127](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9127)) ([0aadfdf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0aadfdf39682bd779eabae57e02596fd0f730624))
- **segmented:** 修复初始化时发射不必要的值更新事件 ([#9125](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9125)) ([fb0635b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb0635b0dc2fed0f28d60248b60b0ecd5e3294d4))
- **tabs:** 修复首次加载页面时 `nzLinkRouter` 不生效的问题 ([#9118](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9118)) ([0f7f94d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0f7f94dab24175b28f34720f5c98e7dc9a2c6c88))

### Performance Improvements

- **transfer:** 使用 item.key 跟踪数据条目 ([#9123](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9123)) ([adb91e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/adb91e4ba0cbcfc72cccb26a66580fa19dc9c8aa))

## 19.2.2

`2025-04-25`

### Bug Fixes

- **select:** 多选模式下，限制粘贴后的选项数不超过 `nzMaxMultipleCount` ([#9080](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9080)) ([3714840](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3714840a8a72d4d7809a2cac339dd3891052225d))
- **input-number:** 修复 `NG0600` 错误 ([#9106](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9106)) ([9f5b525](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9f5b525e5eb5e50ed4f93ed15b6831d7db3483ee))
- **checkbox:** 修复 `NG0600` 错误 ([#9105](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9105)) ([61b6886](https://github.com/NG-ZORRO/ng-zorro-antd/commit/61b68861a6215e40bd29e14d2fe2bc02ce112ce0))
- **checkbox:** 修正 `nzOptions` 的类型定义 ([#9099](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9099)) ([7be2fe5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7be2fe5412aa00b9178dcae49f202b21a1b7e9e8))

## 19.2.1

`2025-03-29`

### Bug Fixes

- **select:** 修复 `@internal` 注释导致 select-arrow 组件在编译时未导出 ([#9074](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9074)) ([c9b2dd9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c9b2dd96db78ff257137b7a2cba79bbf70f64d3e))

## 19.2.0

`2025-03-28`

### Features

- **splitter:** 新增 `splitter` 组件 ([#8987](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8987)) ([9b3f62e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b3f62e088f3d0953f236910df00175edf07e26e))
- **page-header:** 无路由历史时隐藏回退按钮 ([#9041](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9041)) ([bb48232](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bb482328637829b91443075dddaaaef74b85cda8))

### Documentation

- **tabs:** 新增使用 CDK `DragDropModule` 实现可拖拽页签的[示例](https://ng.ant.design/components/tabs/zh#components-tabs-demo-card-draggable)

### Bug Fixes

- **input-number:** 输入数字以 0 结尾时视作输入进行中 ([#9051](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9051)) ([2a0c2e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2a0c2e08bcec7577558bf2578adf7710a5235a38))
- **segmented:** 修复 FormControl 第一次更新时不生效 ([#9039](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9039)) ([33fe53d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/33fe53de16bbafd234fa369f677355349d24860a))
- **select:** 默认模式下禁用 `nzMaxMultipleCount` 属性 ([#9068](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9068)) ([dcf8a5d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dcf8a5d35785d5a4b282719601c0b226e67543bc))
- **select:** 多选模式下 ngModel 值变化时更新是否达到 `nzMaxMultipleCount` 的状态 ([#9056](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9056)) ([d7031da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d7031dada3f24cf9c7e48a2eb09678d44caaf9b1))
- **space:** 修复 rtl 模式下 nzSpaceItem 的行内边距 ([#7801](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7801)) ([2d9ff5f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d9ff5f0735afc4f4ae03e9f85ae4a8062c21f1a))
- **tabs:** tabs 改变时更新活动的路由联动页签 ([#7649](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7649)) ([1f07121](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f07121c3c8521036b011a6f71e1859f70cfe429))
- **tree-select:** 修复虚拟滚动下选项无法水平滚动 ([#9045](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9045)) ([e70cae3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e70cae3c7cbd47c82d575a49e1dc6a31faa5912d))

## 19.1.0

`2025-02-21`

### Features

- **check-list:** 新增 `CheckList` 组件 ([#8969](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8969)) ([4cd298b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4cd298bfdce3c96e47c91e689fbad16c36d72b60))
- **message,notification:** 内容为模板时支持通过 `nzData` 传入数据 ([#9001](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9001)) ([5157470](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5157470dd7d890703e4b3a8db9909891da4932c0))
- **popover,popconfirm,tooltip:** 支持空格分割的字符串作为 `overlayClassName` ([#8972](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8972)) ([3fcec91](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3fcec916b81a284fc8934846aab26d5b8ce99a1b))
- **popover:** 支持通过 `nzPopoverOverlayClickable` 禁止点击蒙层关闭面板 ([#8878](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8878)) ([5898da7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5898da718f2568cdb2a6dcc63b6e7e18ccb217aa))

### Bug Fixes

- **input-number,checkbox:** 接受来自 control 的禁用状态变化 ([#8979](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8979)) ([2d8968d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d8968d4709aee858634274d22196ecbbfbe8764))
- **input-number:** 修复一系列输入事件问题，详见 ([#8989](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8989)) ([6d8d915](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d8d91521a6d4315b6a01fc173e3ed8df8bdecf0))
- **tree-select:** 修复判断多个实例条件错误 ([#9008](https://github.com/NG-ZORRO/ng-zorro-antd/issues/9008)) ([5006ea6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5006ea695430c3c0f127f04c3a9bcf6dfd6c1a29))

### Code Refactoring

- 重构为 ECMAScript 标准类成员 ([#8718](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8718)) ([f1d8d92](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f1d8d926b48a798489f54d4f3da6eec0f90f9955))
- 启用 `isolatedModules` 编译选项 ([#8970](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8970)) ([0d42aa7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0d42aa7d4605c881c242e245b8127629e9657e39))

现在你可以在项目中使用 `isolatedModules` 编译选项。

## 19.0.2

`2025-01-10`

### Bug Fixes

- **auto-complete:** 点击聚焦的输入框时应弹出浮层 ([#8900](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8900)) ([79cc2f8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/79cc2f830133dfe0ee99eaabdb7b5b5f1eca2e02))
- **progress:** 修复 `NG0956` 错误 ([#8962](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8962)) ([c4d2f81](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c4d2f81f125feca0ce5ad90e12997875b4465230))
- **transfer:** 修复 body 样式异常 ([#8960](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8960)) ([a3546a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a3546a9032dcc8fbbd72088e4a431e83b99b32f1))

## 19.0.1

`2025-01-03`

### Bug Fixes

- **date-picker:** 原生 title 属性遵循 `nzFormat` 格式 ([#8744](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8744)) ([1b7ab5a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1b7ab5adb5af783e3a6a47ffc4916961993f4d6f))
- **i18n:** 更新 `zh_TW` 国际化文案 ([#8950](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8950)) ([9607e11](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9607e1161244b441badb2c37093c4f44a2d63695))
- **input-number:** 修复 `NG0600` 错误 ([#8955](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8955)) ([8d6135e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8d6135e65a6aa716678b9485e3e7790182d160b1))
- **table:** 修复水合节点不匹配问题 ([#8948](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8948)) ([0a73deb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0a73deb053d2d9ab8d8194038355fad898b60759))

## 19.0.0

`2024-12-06`

### Bug Fixes

- **autocomplete:** 修复 CSP 问题 ([#8875](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8875)) ([30c25f0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/30c25f0201130ccb00c8d2ba2e709763d7bcfd6e))
- **avatar:** 修复 overlay 中尺寸计算问题 ([#8754](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8754)) ([3a5ba37](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3a5ba37de6553c5973ac1741a250dff957ca7ec5))
- **card:** 移除 `nzBorderless` input 属性 ([#8741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8741)) ([22ce17c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/22ce17c8a4bb7345cf026fd570bc8d3984722815))
- **carousel:** 修复 rtl 模式下轮播切换顺序问题 ([#8770](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8770)) ([0202a19](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0202a191b3259e3dc454272b53feb3687a32cf0a))
- **cascader:** 取消选择时收起子选项列 ([#8866](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8866)) ([5fec53e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5fec53e597d50a26a1083bb1e726af885ba807ae))
- **drawer:** 打开时清除之前 focus 的元素 ([#8893](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8893)) ([4498af0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4498af0f1a8c700099e82f4027bec30086f6d29a))
- **i18n:** 更新 `vi_VN` 国际化文案 ([#8894](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8894)) ([f08ad1c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f08ad1cb0728d19655c8143658e6a44f8843cb4a))
- **tree-view:** 修复 `nzTreeNodePadding` 在虚拟滚动中不生效问题 ([#8920](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8920)) ([82b660a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/82b660ac55539e9cb2c39b399884f8bec4d028d4))

### Code Refactoring

- 取消支持渲染 HTML 字符串 ([#8831](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8831)) ([5fae01a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5fae01ad4120841390f7ebb6267a043774ea2266))
- 移除 `ngClass` and `ngStyle` ([#8895](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8895)) ([c3ab3ba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c3ab3ba6ad50dc4a8f23b43872b3f235ee316f4c))
- **image:** 移除废弃的 `FADE_CLASS_NAME_MAP` 和 `IMAGE_PREVIEW_MASK_CLASS_NAME` ([#8912](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8912)) ([65223d9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/65223d9a595e78f8c73347c5d1b12a807389c434))
- **transfer,tree,tree-select** 相关 Output 属性中的 `CheckBox` 重命名为 `Checkbox` ([#8934](https://github.com/NG-ZORRO/ng-zorro-antd/pull/8934)) ([c76433d5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c76433d5533f6d5c0467ee99c61877a0ec4d35ac))

### Features

- **cascader:** 支持多选 ([#8903](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8903)) ([e5dfb49](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5dfb495dc4f9e5493e425aeab3802a13a0f5e28))
- **cascader:** 支持 `nzPlacement` 自定义浮层弹出位置 ([#8935](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8935)) ([6fbd22c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6fbd22c5b38b78cc991bb61446acbea635f30797))
- **checkbox:** 重新设计 `nz-checkbox-group` 组件，支持自定义布局 ([#8932](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8932)) ([489e0de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/489e0defbfeeb03c29562d139614451575f8ed8d))
- **divider:** 新增 `nzVariant` 选项 ([#8827](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8827)) ([2c63c87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2c63c87f557e2400224566342a0185d212055004))
- **float-button:** 新增 float-button 组件 ([#7884](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7884)) ([dab4d66](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dab4d669b3ef746d1761fbb2199c1b0ae704cda5))
- **icon:** 新增 `nz-icon` selector ([#8778](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8778)) ([1406241](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1406241f2e636bb3bf11515b0ad68cbe0535d5e1))
- **image:** 支持通过 `esc` 按键关闭预览 ([#8809](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8809)) ([d587615](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d587615c7dd8d911af06551181f1bffb6eb67149))
- **input:** 新增一次性密码框组件 ([#8715](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8715)) ([cdbaf4d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cdbaf4de291f380cfcfdf6788d24da3e344175a9))
- **menu:** 新增 `nzTriggerSubMenuAction` 支持点击触发子菜单 ([#8461](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8461)) ([860df87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/860df87a1be62f462ac3ea136d53948ccd69213a))
- **qrcode:** 新增 `nzStatusRender` 支持自定义状态渲染 ([#8714](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8714)) ([6f36d75](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6f36d75741e301bc3e7634a93c106c48a02c0a1b))
- **segmented:** 重新设计 segmented 组件 ([#8753](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8753)) ([4dc866c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4dc866cb2fcc7afb4cc309f433c216d1b7cba2e1))
- **space:** 新增 `nz-space-compact` 组件 ([#8755](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8755)) ([b9c511d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b9c511db0b1b28521e23148a6fce5b1f169f99a2))
- **table:** 支持在全局配置中设置 `nzSortDirections` ([#6613](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6613)) ([#8721](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8721)) ([eb1fdc5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb1fdc5037d9122a237e317e5b93857deb51e5d5))
- **transfer:** 新增 `nzOneWay` 属性支持单向样式 ([#8717](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8717)) ([99fd4de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/99fd4de95b2a5a44a2837af38d31ddcabf0a60bf))
- **input-number:** 重新设计 input-number 组件 ([#8901](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8901)) ([df55d88](https://github.com/NG-ZORRO/ng-zorro-antd/commit/df55d8882c9f36bc6a0cd8a4d752e03070658ff7))
- **schematics:** 支持 v19 ng update 迁移 ([#8911](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8911)) ([1a20de2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1a20de223bc6e214b54f741f42ed8260611b9b67))

### BREAKING CHANGES

- **All**
  - `nzClass` / `nzStyle` 属性不再支持下列值：
    - `Set()`： 使用数组代替
    - 键分隔的多个类名或样式：使用空格分隔的多个键代替
  - 移除一些组件内部支持渲染 HTML 字符串的功能，因为这是非良好的模式。message，notification，modal 组件除外，因为这些组件可以通过 service 方式创建，渲染 html 字符串的用例会比较多。
  - 使用标准装饰器重写 `@WithConfig`。如果在库中使用了 `@WithConfig`，请在 `tsconfig.json` 中关闭 `experimentalDecorators` 选项
  - 组件内部写法从 `[nz-icon]` 迁移到新的 `nz-icon` 标签。如果在 CSS 中使用了 `[nz-icon]` 选择器来选择**组件内部**的图标，请使用为 `nz-icon` 替代

- **input-number:** 重新设计 input-number 组件，使其更加简单灵活

  现在为新的 input-number 添加前缀或后缀的写法如下，不再需要使用 `nz-input-number-group` 与 `ng-template`：

  ```html
  <!-- Custom handler icons -->
  <nz-input-number>
    <nz-icon nzInputNumberUpIcon />
    <nz-icon nzInputNumberDownIcon />
  </nz-input-number>

  <!-- With affixes -->
  <nz-input-number>
    <span nzInputPrefix>Prefix</span>
    <span nzInputSuffix>Suffix</span>
  </nz-input-number>

  <!-- With addons -->
  <nz-input-number>
    <span nzInputAddonBefore>Before</span>
    <span nzInputAddonAfter>After</span>
  </nz-input-number>
  ```

  旧的 input-number 组件被标记为 **deprecated**，其入口已更改为 `ng-zorro-antd/input-number-legacy`。
  `NzInputNumberComponent` 更名为 `NzInputNumberLegacyComponent`，`NzInputNumberModule` 更名为 `NzInputNumberLegacyModule`。

  不用担心，`ng update ng-zorro-antd` 会自动迁移你的代码。

- **cascader:** `ngModel` 取消支持 `NzCascaderOption[]` 类型

  旧版本中，在表单中为 Cascader 组件赋值为 `NzCascaderOption[]` 类型时，Cascader 组件会根据提供的 `nzValueProperty` 映射成实际的值并写入，例如：

  ```ts
  @Component({
    template: `<nz-cascader [nzOptions]="options" [ngModel]="value"></nz-cascader>`
  })
  export class ExampleComponent {
    value = [{ label: 'NG ZORRO', value: 'ng-zorro-antd' }];
  }
  ```

  此时 Cascader 组件输出的值将为 `'ng-zorro-antd'`。这就导致输入与输出的值不一致，可能存在潜在的数据问题。

  在 v19 中，我们将移除该特性，如果您已经在代码中运用了该特性，请考虑增加一个 `map` 方法将其映射到实际的值。

- **checkbox** Redesign the checkbox group component.
  - 移除 `NzCheckBoxOptionInterface['checked]` 字段，另外 `NzCheckBoxOptionInterface` 被标记为弃用，请使用 `NzCheckboxOption` 替代
  - `nz-checkbox-group`: `ngModel` 类型从 `NzCheckBoxOptionInterface[]` 改为选项值的类型 `NzCheckboxOption['value'][]`

- **card:** 移除冗余的 `nzBorderless` 属性，使用 `nzBordered` 替代
- **image:** 移除废弃的 `FADE_CLASS_NAME_MAP` 和 `IMAGE_PREVIEW_MASK_CLASS_NAME`
- **pipes:** 移除废弃的 `NzSafeNullPipe`
- **segmented:** 重新设计 segmented 组件
  - `ngModel` 的值从索引值 `index` 改为选项值
  - `nzValueChange` 发出值的类型从 `number` 改为选项值的类型 （`string | number`）
  - 移除 `nzLabelTemplate`， 使用 `nz-segmented-item` 指令替代
- **space:** `NzSpaceComponent` 的` exportAs` 属性重命名为标准 `nzSpace`
- **transfer:** 属性 `nzTreeCheckBoxChange` 重命名为 `nzTreeCheckboxChange`
- **tree,tree-select:** 属性 `nzCheckBoxChange` 重命名为 `nzCheckboxChange`

### Deprecations

在 v19 中，以下 API 被标记为 **deprecated**，并将在下一个主要版本中移除。 请参考相关文档以获取更好的替代方案。

| Module                              | API                                                      |
| ----------------------------------- | -------------------------------------------------------- |
| `ng-zorro-antd/button`              | `NzButtonGroupComponent`                                 |
| `ng-zorro-antd/core/form`           | `NzFormPatchModule`                                      |
| `ng-zorro-antd/checkbox`            | `NzCheckboxWrapperComponent`                             |
| `ng-zorro-antd/input`               | `NzInputGroupComponent#nzCompact`                        |
| `ng-zorro-antd/input-number-legacy` | `*`                                                      |
| `ng-zorro-antd/message`             | `NzMessageModule`                                        |
| `ng-zorro-antd/notification`        | `NzNotificationModule`<br/>`NzNotificationServiceModule` |

## 18.2.1

`2024-11-15`

### Bug Fixes

- **anchor:** 修复 `nzTitle` 使用 TemplateRef 时 `a` 标签 title 内容异常 ([#8864](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8864)) ([41f6609](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41f66095fdaee05d8bfdae13e8ec18a63cee1f2c))
- **color-picker:** 修复 CSP 问题 ([#8874](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8874)) ([0264da9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0264da98babca9f14a2c69ccb019944aa4e9f88f))
- **image:** 修复 CSP 问题 ([#8876](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8876)) ([63c8953](https://github.com/NG-ZORRO/ng-zorro-antd/commit/63c895329a78575654994b607fa822f5735166f4))
- **select:** 修复 CSP 问题 ([#8873](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8873)) ([9431d0d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9431d0d9e54c76271f7dc13c9833c29bf4e7dc13))
- **transfer:** 修复取消全选未触发 `nzSelectChange` 事件 ([#8872](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8872)) ([5ff9821](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5ff98216002da5c9fc23a9d9c8bd4d3b68495d51))
- **qrcode:** 加载稳定后移除事件监听器 ([#8861](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8861)) ([40d466d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/40d466dab751c51b8cecb97dc974a1d17a7692e6))
- **watermark:** 加载稳定后移除事件监听器 ([#8862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8862)) ([decd477](https://github.com/NG-ZORRO/ng-zorro-antd/commit/decd4772bdbfeb1a1397c2b597882503ca5685ad))

## 18.2.0

`2024-11-07`

### Bug Fixes

- **i18n:** 添加国际化文案 `nb_NO` ([#8712](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8712)) ([8c9bcd1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8c9bcd18867fca3778d42b844034a4d3370ebe3b))
- **i18n:** 添加国际化文案 `hu_HU` ([#8769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8769)) ([9e21ae8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9e21ae8c3c771ff3bce98a11c37f5c81c62f3402))
- **badge:** 修复组件中的 NG0955 警告 ([#8858](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8858)) ([cc52555](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc5255587edae6731d38f39786c701679c50020b))
- **select:** 修复多选模式下和 switch 一起使用时，引发初始化时 switch 组件大小闪烁 ([#8851](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8851)) ([d28876c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d28876cdae5bb1b4df3fda66ebdf6248e43f5a36))
- **carousel:** 修复 rtl 模式下轮播图切换异常 ([#8705](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8705)) ([85f23a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/85f23a1b768151a35637c054c7bf42cbf656268e))
- **drawer:** 导航关闭时发射 `nzVisibleChange` 事件 ([#8850](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8850)) ([29827df](https://github.com/NG-ZORRO/ng-zorro-antd/commit/29827dfe2346badc5178da71884bb4c3264a695d))
- **modal,drawer:** 修复弹出容器中滚动异常 ([#8804](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8804)) ([ed7951d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ed7951d2e95707c93e993dbb744382e6c9c7dee8))
- **modal:** 修复 `nzMask` 为 `false` 时遮罩被渲染 ([#8798](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8798)) ([f2f04fe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f2f04fe8971b23aba9ec5807414afe5ab6f27fc7))
- **transfer:** 正确更新穿梭按钮的禁用状态 ([#8824](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8824)) ([195ad26](https://github.com/NG-ZORRO/ng-zorro-antd/commit/195ad260a8259129517ee18a208853b9e32c132d))

### Features

- **datepicker:** 新增改变模式或日期的回调 `nzOnPanelChange` ([#8685](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8685)) ([6462a47](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6462a47538a4c7f00f180d82dc3567379277e4b3))
- **tabs:** 新增 `destroyInactiveTabPane` 支持销毁非活动状态的 tab ([#8845](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8845)) ([0de6d62](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0de6d627cb9105d97b1aca827b1f89a8f3bdcec9))

## 18.1.1

`2024-08-20`

### Bug Fixes

- 修复 [@angular/compiler-cli#56945](https://github.com/angular/angular/issues/56945) 导致的 ngtypecheck reference 问题 ([#8699](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8699)) ([8e459c1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8e459c192cf5c4b1903a744c0548df800aa64bfc))
- **date-picker:** 修复重新渲染时的 NG0956 警告 ([#8658](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8658)) ([70a0817](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70a0817cd8db49234726f160d9c2ae36f5c650b7))
- **grid:** 修复示例中的 NG0955 警告 ([#8679](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8679)) ([6414c92](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6414c924cdb013c0ffb96436dd89354e275fa544))
- **tree-select:** 修改值时清空选中节点 ([#8693](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8693)) ([91927bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/91927bcede24a89ffc5ec4c814503547c86ad09e))

## 18.1.0

`2024-07-25`

### Bug Fixes

- **cascader:** `compositionstart` 事件触发时隐藏 placeholder ([#8641](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8641)) ([17b0ea3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/17b0ea362021a458c18204f73c34c08695300e2a))
- **i18n:** 更新 `pt_BR` 国际化文案 ([#7790](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7790)) ([6fc1c78](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6fc1c78b4ca0d37bf5eb6e9e52f0fd150ca5855d))
- **i18n:** 更新 `fr_BE`, `fr_CA`, `fr_FR`, `lv_LV` 国际化文案 ([#8614](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8614)) ([9b69410](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b69410ce8f84fbd65e2f0dc627189403888d8f1))
- **schematics:** 修复模板中 `RouterLink` 引入缺失问题 ([#8621](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8621)) ([032a0c2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/032a0c2384434fc042674a60b005a5a479f6626a))
- **transfer:** 修复选项全部禁用后全选按钮仍可点击 ([#8633](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8633)) ([75d8c7b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/75d8c7b93310cd54677ac75f470b2967ebd092cb))

### Features

- **breadcrumb:** 新增 `nzRouteFn` 以格式化面包屑路由 ([#6313](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6313)) ([6d805c4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d805c44073297ea17742d43066c6b95e4af5ffe))
- **i18n:** 添加国际化文案 `en_AU` ([#7919](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7919)) ([c4e6c8d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c4e6c8df3fe48ced3097f0f1347ddbbfde3fda9c))
- **icon:** 新增 `provideNzIcons` 和 `provideNzIconsPatch` API ([#8650](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8650)) ([b22672d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b22672db7cbce362b14a3dad1ff3b3c45abed27f))
- **popconfirm:** 新增支持 `nzPopconfirmTitleContext` 上下文 ([#7989](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7989)) ([6d27073](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d27073a52a96d17d8625a9d5d7b820984aa5000))
- **table:** 新增支持 `nzSummary` 总结栏 ([#8639](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8639)) ([20bb5b2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/20bb5b24c7d01d87f0d50c37248ddd862d9bf341))
- **table:** 总结栏支持 `nzFixed` 固定 ([#8642](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8642)) ([bef12e6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bef12e6218c53028f8907f2e917945ddc8283db5))
- **tree-select:** `nzNotFoundContent` 支持 TemplateRef 类型 ([#8638](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8638)) ([13e8a45](https://github.com/NG-ZORRO/ng-zorro-antd/commit/13e8a452c4a96f78d6cf900830ba4b585ed36735))

## 18.0.1

`2024-06-27`

### Bug Fixes

- **graph:** 修复 [@for](https://angular.dev/guide/templates/control-flow#for-block---repeaters) track 表达式异常 ([#8587](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8587)) ([7687ff2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7687ff2c907ee5ab262ee08240bc932b6112b1ae))
- **icon:** 修复 [@for](https://angular.dev/guide/templates/control-flow#for-block---repeaters) track 表达式异常 ([#8588](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8588)) ([8a27bab](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8a27babf30f7726113fed5511bfbd0067c0bbd37))
- **table:** 修复 [@for](https://angular.dev/guide/templates/control-flow#for-block---repeaters) track 表达式异常 ([#8593](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8593)) ([b275063](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b2750630a0da3f415931cdf9ba6e6a618dd5d329))
- **pagination:** 修复 [@for](https://angular.dev/guide/templates/control-flow#for-block---repeaters) track 表达式异常 ([#8586](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8586)) ([6bb95c0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6bb95c0905de9da1493590da2c6f76cc1b2a23bc))
- **i18n:** 更新 `de_DE` 国际化文案 ([#8605](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8605)) ([8d75378](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8d75378ea612a0ab91f03ec1a709f88c2d22af21))
- **i18n:** 更新 `fa_IR` 国际化文案 ([#8597](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8597)) ([9c6e4bf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9c6e4bf6b65810b0f659a366d34b54528d55cc0f))
- **table:** 修复固定表头下渲染内容缺失问题 ([#8574](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8574)) ([6cff80e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6cff80e90788ce0b84b232a0fb67516b795c88b0))

## 18.0.0

`2024-06-06`

### ⚠ BREAKING CHANGES

- **collapse:** `nzExpandIconPosition` 类型从 `left` | `right` 变更为 `start` | `end` ([#8561](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8561)) ([3ad5674](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3ad56749b0c8222b37444f27f81942fba4bc53e3))
- Less 中不再使用 inline JavaScript ([#8552](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8552)) ([7e873c8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e873c863a1c8e9c053f64aca86bf9c7c9a11a21))

使用 antd 提供的 Less 函数时不再需要用 ~\`\` 包裹，例如：

```diff
- color(~`colorPalette('@{primary-color}', 5)`)
+ color(colorPalette('@{primary-color}', 5))
```

受影响的函数包括：`colorEasing`，`colorPalette`，`tinycolor`

### Bug Fixes

- **cascader,select,time-picker,tooltip,tree-select:** 修复在 shadow DOM 中获取 `EventTarget` 异常问题 ([#7853](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7853)) ([843b703](https://github.com/NG-ZORRO/ng-zorro-antd/commit/843b7035225df3d3a635a5ef8926d1e80f10ae18))
- **tooltip:** 修复箭头颜色未被自定义颜色覆盖问题 ([#8555](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8555)) ([92c586b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/92c586b8f5e5fc0ec0e4cb2cc10b73a699b1555a))
- **upload:** 仅在 firefox 浏览器中阻止拖拽事件 ([#8551](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8551)) ([c6e7bd7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c6e7bd7682a776a7ad3f34b589c9c473430e6baa))
- **rate:** 修复 `nzAllowHalf` 为 `false` 时展示半星 ([#8536](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8536)) ([7742fe3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7742fe30b718aa19f2988f6354d982d439ad2c7b))

### Features

- **date-picker:** 支持季度选择 ([#8478](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8478)) ([3513889](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3513889367ef468b9e792698f85bb6b890edec86)), closes [#7818](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7818) [#7380](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7380)
- **qrcode:** 新增已扫描状态 ([#8447](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8447)) ([0be6178](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0be617854d1493a342c9354ce1156fcf323acc97))
- **rate:** 鼠标离开时触发 `nzOnHoverChange` 事件 ([#8448](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8448)) ([38dcc31](https://github.com/NG-ZORRO/ng-zorro-antd/commit/38dcc3196c62369cd8061a9ead8ab20752e56a66))
- **statistic:** 新增加载中状态 ([#8537](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8537)) ([21c8b62](https://github.com/NG-ZORRO/ng-zorro-antd/commit/21c8b621f15d642c391253ca91c3b124227ca2d9))
- **table:** 支持设置空数据时内部滚动的高度 ([#8457](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8457)) ([724d841](https://github.com/NG-ZORRO/ng-zorro-antd/commit/724d841ebd88a329c59e2cfeee3f9625393c8372))

## 17.4.1

`2024-05-24`

### Bug Fixes

- **card:** 使用 `skeleton` 代替 `card-loading-content` ([#8528](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8528)) ([a36ebd3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a36ebd329d042dad19733543ce96f459e4cc09d3))
- **color-picker:** 避免两次 `nzOnChange` 事件 ([#8530](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8530)) ([5dea059](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5dea059202947caf5ef86f802f08ba14a0867288))
- **list:** 静态查询列表项操作模板 ([#8527](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8527)) ([85301e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/85301e0267593457560c5cdcc7fb09ed38944d45))
- **popconfirm:** icon 样式丢失 ([#8511](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8511)) ([4f1f9bb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4f1f9bba03f38d9ef4ee57380d61e5ca4188648c))
- **tooltip,popover,popconfirm:** SSR 引入的异常 ([#8512](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8512)) ([5009ec0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5009ec0b3a6ff770186681bd4eb61ec662d9896e))

### Features

- **popconfirm:** popconfirm 确认按钮支持禁用 ([#8542](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8542)) ([8c247db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8c247dbda2b633d522c53113456600315192a792))

### Performance Improvements

- **back-top:** 删除多余的 `changeDetectorRef` ([c1e39e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c1e39e7bbc1f863c3a1d26a9cc9cc359b4054dc5))
- **qr-code:** 提高背景绘制效率 ([#8543](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8543)) ([db09bf7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/db09bf73e45d03817c89bba97e1f340cc09ed5d0))

## 17.4.0

`2024-04-19`

### Bug Fixes

- **autocomplete:** 移除 `NgZone` 依赖 ([#8462](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8462)) ([24bb1bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/24bb1bc5959c0e617090f0459c39db00fd4e2d9a))
- **button:** 补充 `ant-btn-default` Class ([#8501](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8501)) ([1588199](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15881996f0a9b1e93b0c81843132ba5d7651e528))
- **calendar:** 修复年份下拉框数据更新异常问题 ([#8286](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8286)) ([ee68a2c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee68a2c90370a6e3a599fe9f914af20117d2faa6))
- **date-picker:** 移除内联样式 ([#8458](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8458)) ([e6b83eb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e6b83eb1881ece341b68f9048e9d3e5ea438ba19))
- **drawer:** 移除内联样式 ([#8065](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8065)) ([5e89441](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5e89441c26a7df50d0feed746d5595cde2589a7a))
- **graph:** 修复箭头渲染异常问题 ([#8493](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8493)) ([342841c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/342841ceafddb1b74f55e31bfa9ca3e7734e842e))
- **graph:** 移除 `NgZone` 依赖 ([#8460](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8460)) ([a4ec21a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a4ec21a684b5c96a64bd66670c270533926252bb))
- **icon:** 补充 SwapOutline 图标 ([#8433](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8433)) ([f1a4050](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f1a405042f84fbc96ed0587ea2e748dc7d468719))
- **image:** 修复 rtl 模式下预览切换按钮位置异常 ([#8468](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8468)) ([886138d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/886138d630965b9a0a89d1727f76fed81c6f9528))
- **list:** 移除 `NgZone` 依赖 ([#8439](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8439)) ([1ec0e76](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ec0e7672eaba0890b145c706fcc0a75cb5c47f8))
- **notification:** 修复 `nzMaxStack` 初始值问题 ([#8451](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8451)) ([2c09162](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2c0916265c00cdc026a55b3ab9d829c5e207cf31))
- **pagination:** `nz-pagination-item` 支持可访问名称 ([#8476](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8476)) ([47ee143](https://github.com/NG-ZORRO/ng-zorro-antd/commit/47ee14325910c154f1541ee2d5e97539ba9a4e52))
- **slider:** 修复垂直模式下标度刻记样式异常 ([#8494](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8494)) ([9bcce6c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9bcce6c969c0bef7bdf4526407b2dfc56b7ff660))
- **tag:** 修复无边框样式异常 ([#8495](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8495)) ([b35e6d6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b35e6d6ba2422eb2c4725b2029a2f9c60720b697)), closes [#8492](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8492)
- **typography:** 移除 `NgZone` 依赖 ([#8440](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8440)) ([af7fb5d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af7fb5d27254d26a284faaaa5b812b105f539e3f))
- **upload:** 移除内联样式 ([#8064](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8064)) ([1ac84a8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ac84a8428fe644362e0f733c9a151fa848cedbf))

### Features

- **modal:** 遮罩层支持响应每次点击 ([#8429](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8429)) ([31b90fa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/31b90fa52232abe7b090f60797d4335329677c4c))
- **notification:** 调整弹出顺序 ([#8450](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8450)) ([742f14a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/742f14a93472772cbdd96ce89797dc4120c55330))
- **select:** 支持在全局配置中设置 `nzOptionHeightPx` ([#8504](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8504)) ([4efc5ab](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4efc5ab38f74ce07a769f57453b0da375c17ce5c)), closes [#8503](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8503)
- **skeleton:** 支持正方形骨架按钮 ([#8481](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8481)) ([af1483a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af1483a9be544bd41b8f2a4a4c8027425f22b925))

## 17.3.0

`2024-03-11`

### Bug Fixes

- **doc:** 更新 monaco editor 参考链接 ([#8393](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8393)) ([fdfc816](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fdfc816e72938fce47bbdfe274de00ad4e89b242))
- **docs:** 修复部分文档问题 ([#8383](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8383)) ([407e76a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/407e76a21afb4e1677fc73e89df69b26789da2fd))
- **select:** 修复缩放页面时 `nzScrollToBottom` 未触发问题 ([#8355](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8355)) ([bb0468e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bb0468e9e95c7c00efd2a5655d0266ae1ce17368))
- **avatar:** 修复部分场景无法正确缩放问题 ([#8365](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8365)) ([e7b1fa0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e7b1fa0d36b173934bda10f796efa0c6e17d66e5))
- **carousel:** 修复调整大小时不适应新的大小问题 ([#8374](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8374)) ([6e1decb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6e1decbc7507b07dbb28897f53c6cbcc6ca2eaa6))
- **cdk:** `zIndex` 设置问题 ([#8373](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8373)) ([b932d65](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b932d65a546f0b2729249713fdaad41fefebb602))
- **i18n:** 添加国际化文案 ([#8426](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8426)) ([d575c53](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d575c53371f34053a7cd2b6a020a3da1005b708a))
- **i18n:** 添加国际化文案 `ja_JP` ([#8290](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8290)) ([662b730](https://github.com/NG-ZORRO/ng-zorro-antd/commit/662b73049f8ed8ae70caea573e809016607a795a))
- **i18n:** 添加国际化文案 `vi_VN` ([#8295](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8295)) ([987a799](https://github.com/NG-ZORRO/ng-zorro-antd/commit/987a799ab1ca5bfdcef162d322423b65fb64dfe6))
- **tabs:** 修复小屏幕下 `tab` 定位样式丢失问题 ([#8372](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8372)) ([a0b08be](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a0b08be73a77c0a0967f5a301fe8c7ebbfca103c))
- **tabs:** 修复光标样式 ([#8386](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8386)) ([3dc1579](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3dc1579805f1a867689160fede25fd005983ddf1))

### Features

- 优化 schematics ([#8411](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8411)) ([921f1c1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/921f1c18266ead602c2e2c627a171608507807d4))
- **anchor:** 支持水平锚点 ([#8342](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8342)) ([9cc44f8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9cc44f8bdb55fbf2fcf4c8ce4da4fab1120245dc))
- **calendar:** 支持自定义 header ([#8418](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8418)) ([ec7ec35](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ec7ec35573fc46ba01af1368087b5de0b13ab7c7))
- **color-picker:** 转为内置 `color-picker` 组件 ([#8428](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8428)) ([534fe62](https://github.com/NG-ZORRO/ng-zorro-antd/commit/534fe6277287dd64730546d3d4cc0f1be90a211a))
- **drawer:** `nzContent` 类型为组件时返回 `componentRef` ([#8339](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8339)) ([f71162b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f71162bbbb30c7b362774b2bc170a0ffd1c0dcf7))
- **image:** 支持水平和垂直翻转 ([#8168](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8168)) ([e856515](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e856515888102b5a3583a2223372263a4bff1c50))
- **image:** 支持鼠标滚动缩放 ([#8180](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8180)) ([4235c29](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4235c293c0abf889bba0bc31d2ba18cf5d41b51d))
- **modal:** 支持拖拽 ([#8419](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8419)) ([ce33294](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ce332947c49e7e6dd02d9bb80eb2fe3f7beab3af))
- **modal:** `nzContent` 返回 `componentRef` 对象 ([#8389](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8389)) ([e53000e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e53000e8b52972cc73070a8781d276dc26ebca0b))
- **segmented:** 支持仅图标展示 ([#8368](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8368)) ([e8dea7a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e8dea7a83e6f98e2486c4e3f894f86b646025c1c))
- **select:** 支持多选最大值设置 ([#8371](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8371)) ([18b898e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/18b898e8c5201c6785e5060850d3597601c39401))

## 17.2.0

`2024-01-29`

### Bug Fixes

- **table:** 修复 `nz-table-inner-scroll` 未正确 import 问题 ([#8328](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8328)) ([936317e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/936317e6702e790f5f8827e074fe12fd55fbf0f3))
- **tree-select:** 修复中文搜索异常问题 ([#8324](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8324)) ([aacd62b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aacd62b0beeac35b18829ae4e382626b655c7e05))
- 修复 pipeline 依赖报错问题 ([#8367](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8367)) ([6024bcc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6024bcc7a9453976d0023fe7b455dc452ced8bd4))

### Features

- **color-picker:** 支持 `standalone` ([#8316](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8316)) ([b050474](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b05047433311fe60ee82d100467c896f2167d925))
- **tag:** 支持无边框模式 ([#8320](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8320)) ([e428083](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e428083537c8c25d463980749f63b1b8ab129057))
- **timeline:** 支持自定义颜色 ([#8335](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8335)) ([66a88db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/66a88dbbb1cdd26ee9411de2394fd2231a2807f0))

## 17.1.0

`2023-12-17`

### Bug Fixes

- **calendar:** 修复单选按钮样式问题 ([#8298](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8298)) ([996e141](https://github.com/NG-ZORRO/ng-zorro-antd/commit/996e141042470e487d915d38477ad51928d3e2a0))
- **core:** 隐藏构建时 cron 警告信息 ([#8277](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8277)) ([138d666](https://github.com/NG-ZORRO/ng-zorro-antd/commit/138d666e0527dba2f3f5ac43b05ce4810fffe9f7))
- **cron-expression:** 输出类型错误 ([#8189](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8189)) ([ad02381](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad02381cfc4643b191caab7e056fd1a93086a45e)), closes [#8188](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8188)
- **select:** `nzAutoClear` 设置 true 时自动清理输入 ([#8167](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8167)) ([fefcb68](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fefcb68dc9831eb2208746b3fe44346f80f8202f))
- **tabs:** 修复 `aria` 错误值 ([#8237](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8237)) ([d9a2d27](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d9a2d27be30e9bfc635d8ac3d0e31538f6092b1c))
- **tooltip:** 修复箭头颜色未更新问题 ([#8192](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8192)) ([bc344ed](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc344edc3dca8cdf777bf986130eeae5c3543f63))

### Features

- **alert:** 支持 `standalone` ([#8182](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8182)) ([167bed0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/167bed0350400a4a69f727c62237953b71831f26))
- **anchor:** 支持 `standalone` ([#8185](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8185)) ([03cda21](https://github.com/NG-ZORRO/ng-zorro-antd/commit/03cda216f2d0f1b31e365d6cb30a309309cbc868))
- **autocomplete:** 支持 `standalone` ([#8193](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8193)) ([548e842](https://github.com/NG-ZORRO/ng-zorro-antd/commit/548e842c00d74fc4f8a8c9b69587bc14fdd9aecf))
- **avatar:** 支持 `standalone` ([#8194](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8194)) ([4e2cb74](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4e2cb748b1c13ba1176b93f547fda10a188fec95))
- **back-top:** 支持 `standalone` ([#8195](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8195)) ([db5d5f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/db5d5f4d02531665e2a88dc114545ab225e61673))
- **badge:** 支持 `standalone` ([#8201](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8201)) ([3d1427f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3d1427f60f450c9193669a39ef632017fa33c4f6))
- **breadcrumb:** 支持 `standalone` ([#8202](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8202)) ([165f171](https://github.com/NG-ZORRO/ng-zorro-antd/commit/165f171dd51cff29ac3e02f046bf2966c4ad9aa0))
- **button:** 支持 `standalone` ([#8275](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8275)) ([3c09507](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c09507c2c50f67e4f500c4f08a15617ae8e42bc))
- **calendar:** 支持 `standalone` ([#8274](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8274)) ([80d68a3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80d68a31d65dd1d5505a1b96f3e02e6ea45e000b))
- **card:** 支持 `standalone` ([#8273](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8273)) ([0902a4b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0902a4b2b3c3ad0a8bf1740c67bf94194212af7c))
- **carousel:** 支持 `standalone` ([#8272](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8272)) ([e4244fb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e4244fb7891eed2f21253e922317eae3b8469a3a))
- **cascader:** 支持 `standalone` ([#8271](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8271)) ([3ab6e5b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3ab6e5bafbb007a5929f347fb81ca83761e4e074))
- **cdk:** 支持 `standalone` ([#8270](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8270)) ([d66bcba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d66bcbad09552c3f86401948710d417bb39fd68f))
- **checkbox:** 支持 `standalone` ([#8269](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8269)) ([1491fb3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1491fb3523ab4cd4b4ff498d37669dd9407e1638))
- **code-editor:** 支持 `standalone` ([#8268](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8268)) ([24547c6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/24547c61858d0656a71c943a67395cffdfa05881))
- **collapse:** 支持 `standalone` ([#8267](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8267)) ([dc43fa5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dc43fa5c189d8b6d09f661e52e10e955d873c264))
- **color-picker:** 禁用 alpha ([#8178](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8178)) ([0bebd6a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0bebd6a696cc29c179758951f706fd276a1dae89))
- **comment:** 支持 `standalone` ([#8266](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8266)) ([5af11ea](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5af11ea0232c90d74607c9e4a9ffb053d0f0950c))
- **core:** `no-animation` 支持 `standalone` ([#8257](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8257)) ([de579bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/de579bca2112bd9691429eee6144c09bb16d3b2b))
- **core:** 支持 `standalone` ([#8265](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8265)) ([c51e8da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c51e8daf1ba09646cf7c043756fd14274483c641))
- **cron-expression:** 支持 `standalone` ([#8264](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8264)) ([ae6ceeb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ae6ceeb560f86ead21d6c9ce9a53f435c52f9944))
- **date-picker:** 支持 `standalone` ([#8263](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8263)) ([ac48fba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ac48fba4c6e591db03e41ab427b317c1868f8071))
- **description:** 支持 `standalone` ([#8262](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8262)) ([128f4c0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/128f4c0055fd1150520509e1fa6bddbc74c65b85))
- **divider:** 支持 `standalone` ([#8258](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8258)) ([3a7cd50](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3a7cd50e092ad712b66243fa5c2c582f169e658c))
- **drawer:** 支持 `standalone` ([#8256](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8256)) ([2fbe4c0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2fbe4c0eb221f833fbb0d0801ce546a3c0300555))
- **dropdown:** 支持 `standalone` [#8254](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8254) ([#8255](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8255)) ([c5df26f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c5df26f2ba94f00d80b66c24bf98b09e5f162081))
- **empty:** 支持 `standalone` ([#8254](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8254)) ([15636d2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15636d2c530f294e3b217e4150be70a5f050bccf))
- **experimental-image:** 支持 `standalone` ([#8253](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8253)) ([7325781](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7325781367998543680af043bd19b911c3ac67e7))
- **flex:** 新增 `flex` 组件 ([#8145](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8145)) ([f8fedfc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f8fedfc88957a449de2a9960605d3528848f9caa))
- **form:** 支持 `standalone` ([#8252](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8252)) ([e742e39](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e742e399e2e870f7079f183f800d0d2023b8447d))
- **graph:** 支持 `standalone` ([#8251](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8251)) ([d2f1d30](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d2f1d30fe7925205b79d7da4462a33a496fd94bf))
- **grid:** 支持 `standalone` ([#8250](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8250)) ([208652c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/208652c1ffd98ef8ea8e52b69d9376aaafeb390a))
- **i18n:** 支持 `standalone` ([#8249](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8249)) ([a91cac7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a91cac7e1bbd4379b9498d705a9b6fa1a00e4cd8))
- **icon:** 支持 `standalone` ([#8248](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8248)) ([b0dbfbc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b0dbfbca5452b54ed7c8c4c0b6d1aa2ae0512a34))
- **image:** 支持 `standalone` ([#8200](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8200)) ([63b8777](https://github.com/NG-ZORRO/ng-zorro-antd/commit/63b8777645fe93f587e7b09c5ea9d6efbd497b87))
- **input-number:** 支持 `standalone` ([#8246](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8246)) ([6210fa0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6210fa0b571dd3d0a6b1069bcddd4ad44c3d6104))
- **input:** 支持 `standalone` ([#8247](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8247)) ([0a7028c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0a7028c27c2018039b771cdfccd8cc0654e2a97a))
- **layout:** 支持 `standalone` ([#8245](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8245)) ([d21f8a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d21f8a10876d222160c5e60d467283562b21f087))
- **list:** 支持 `standalone` ([#8244](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8244)) ([1f3010f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f3010fccc0c6bfe8e6b0149152794e3e2371a9a))
- **mention:** 支持 `standalone` ([#8243](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8243)) ([adc5e94](https://github.com/NG-ZORRO/ng-zorro-antd/commit/adc5e94cdd7dfc75800808a046861bc9943dd548))
- **menu:** 支持 `standalone` ([#8242](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8242)) ([4673926](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4673926a581b532470062f7cd5672a176638f111))
- **message:** 支持 `standalone` ([#8241](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8241)) ([c2120b2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c2120b2fad4b1ce30d496c75db27cf08d648ef8c))
- **modal:** 支持 `standalone` ([#8240](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8240)) ([387d664](https://github.com/NG-ZORRO/ng-zorro-antd/commit/387d66434cad9b117cf3a5f54c75bc2eeab1f69f))
- **notification:** 支持 `standalone` ([#8236](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8236)) ([686b6b0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/686b6b0d1183a15e69ba59b777d3d3078bacd1af))
- **page-header:** 支持 `standalone` ([#8235](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8235)) ([aa91486](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aa91486c5ec9ffe26a2aef62800793c909e4349f))
- **pagination:** 支持 `standalone` ([#8234](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8234)) ([0f1690c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0f1690c89de63bc479653f4d3514a06f5d19a5f7))
- **pipes:** `css-unit` pipe 支持更多 ([#8260](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8260)) ([5e611e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5e611e7d51a8cad3697a381612225b0d12879d55))
- **pipes:** 支持 `standalone` ([#8233](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8233)) ([319381a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/319381a443b7cbb64053d7d30f12d501b0221bcb))
- **pop-confirm:** 支持 `standalone` ([#8232](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8232)) ([9d656b2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9d656b2c9bde26bf4bb600ad5eff5fa0f3035804))
- **popover:** 支持 `standalone` ([#8231](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8231)) ([f7468e2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f7468e212533d21655a7c74ab1efcf320facfc07))
- **progress:** 支持 `standalone` ([#8230](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8230)) ([7022471](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7022471052e562a72e741abf5e9b9597f6437d2c))
- **qr-code:** 支持 `standalone` ([#8228](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8228)) ([769f74c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/769f74c9323db91251c191151d48283be64781a8))
- **radio:** 支持 `standalone` ([#8227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8227)) ([b62ac64](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b62ac6471b7038db01ebfbb9efd597eae0b8517f))
- **rate:** 支持 `standalone` ([#8226](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8226)) ([90edba6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/90edba69d11b82c5b31e91af8da34174b71c6fb8))
- **resizable:** 支持 `standalone` ([#8225](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8225)) ([ff14ed0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ff14ed0e4a5ae6562a71459e407863bd9f84a1ca))
- **result:** 支持 `standalone` ([#8224](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8224)) ([572965d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/572965d3b61045a01cb8fc14a132a5c0aa8574ec))
- **segmented:** 支持 `standalone` ([#8223](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8223)) ([86a49d2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/86a49d277b8c8e66bd310d920c43b1e801c2d31c))
- **select:** 支持 `standalone` ([#8222](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8222)) ([ed0de77](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ed0de779cfe63f1ca68b4b8dedbba40a5ad59e95))
- **skeleton:** 支持 `standalone` ([#8220](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8220)) ([a2858d3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a2858d3bb10e87e472e4f917176172f283d46352))
- **slider:** 支持 `standalone` ([#8219](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8219)) ([428c53c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/428c53c6361c5f9afe79ee147a28635c010fea4c))
- **space:** 支持 `standalone` ([#8218](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8218)) ([a84ddef](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a84ddeff5582426a3dd608cab567245898be60c7))
- **spin:** 支持 `standalone` ([#8217](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8217)) ([cd23e33](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cd23e3355d1f8828d93a7d3e331f20180ada4bef))
- **statistics:** 支持 `standalone` ([#8216](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8216)) ([186ef60](https://github.com/NG-ZORRO/ng-zorro-antd/commit/186ef6049cae90e10a2c3f66186cf856f5b9abb2))
- **steps:** 支持 `standalone` ([#8215](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8215)) ([dbb6fcb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dbb6fcb952366f200673bcec8e28097844370869))
- **switch:** 支持 `standalone` ([#8214](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8214)) ([3f6a9ed](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3f6a9ed0a04ba93b97dedcb4b5625d3b79828c32))
- **table:** 支持 `standalone` ([#8276](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8276)) ([5765ae9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5765ae93f1adf304020697fc84a1984ef54f9a1b))
- **tab:** 支持 `standalone` ([#8213](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8213)) ([69dd31a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/69dd31ac275f6251b22f7af9aef4ea78fd278adf))
- **tag:** 支持 `standalone` ([#8212](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8212)) ([15af7c8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15af7c8956ed4c8f11f637446d0285b5a52339f1))
- **time-picker:** 支持 `standalone` ([#8211](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8211)) ([641ebb2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/641ebb2d8072fa343c9275222be8c4a23f8fceb4))
- **timeline:** 支持 `standalone` ([#8210](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8210)) ([b7c6859](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b7c685913abb14133955dfc81678207ec3e64aff))
- **tooltip:** 支持 `standalone` ([#8209](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8209)) ([125768c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/125768c16f3c5030373058d120c05141208ec42c))
- **transfer:** 支持 `standalone` ([#8208](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8208)) ([960144e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/960144e5f5a076fe8c7ad56a48ba97e147bc430b))
- **tree-select:** 支持 `standalone` ([#8206](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8206)) ([64ec76a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/64ec76a2440c7befeaeb8409f84801fd8483af47))
- **tree-view:** 支持 `standalone` ([#8205](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8205)) ([d4426fc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d4426fc6675515ddd1db54be84731d1ba44b52b8))
- **tree:** 支持 `standalone` ([#8207](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8207)) ([b9cf3b0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b9cf3b03d8c51fcfd809dd8d4424aae70ff77094))
- **typography:** 支持 `standalone` ([#8204](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8204)) ([d7e387f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d7e387fa707f3a8473225187e660459498d97ca2))
- **upload:** 支持 `standalone` ([#8203](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8203)) ([7cd08ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7cd08ae3b6d7ff0e252eb237a60288930f73c15d))
- **water-mark:** 支持 `standalone` ([#8197](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8197)) ([e4d6082](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e4d608274e0b56acf9b720cf519d757c660c125e)), closes [#8187](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8187)

## 17.0.1

`2023-11-20`

### Bug Fixes

- **schematics:** 修复 schematics 命令问题 ([#8176](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8176)) ([de8a6b7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/de8a6b782d16f906198d6d6ba512059b8dcb463c))

## 17.0.0

`2023-11-19`

### Bug Fixes

- **autocomplete:** 修复内部 `nz-auto-option` 的错误值 ([#7907](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7907)) ([0a312e3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0a312e3203db13cba6e4ebd6dc4c53e3c09ac206))
- **cron-expression:** 修复报错信息 ([#8114](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8114)) ([ea69790](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ea697909231753e438b2ba07d4ec15c255f3a5dc))
- **form:** 修复点击 label 聚焦元素错误问题 ([#8135](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8135)) ([b3d135f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b3d135fc512a016430426a36330c0f527234f4e4))
- **i18n:** 添加 `pl_PL` 语言 ([#7950](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7950)) ([7819426](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7819426f9ff3a110e06aa9cb47e7396edcfc18d7))
- **i18n:** 更新 `fa_IR` 语言 ([#8143](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8143)) ([4f63198](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4f63198aae7441fe94de64e1740d1f2429a629c1))
- **i18n:** 更新 `fr/be/ca` 语言 ([#8137](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8137)) ([211db31](https://github.com/NG-ZORRO/ng-zorro-antd/commit/211db31202ea7b099405aecaa5273461bbc26ef4))
- **mention:** 修复表单内未完全加载问题 ([#8146](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8146)) ([9505c7c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9505c7c4aa222d36e63597b128f01ab0ba3e934a))
- **resizable:** 修复 pointer capture 问题 ([#8169](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8169)) ([a0b8a0b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a0b8a0baba0259552a8d0e9eae442daa99027f24))
- **select:** 性能优化 ([#8159](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8159)) ([7ce50b3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7ce50b3494d01bedbfdd8413dc8ef36ef836e377))
- **slider:** 修复 step 不可点击问题 ([#7820](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7820)) ([1e1c753](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e1c753b04e5c01cc61589d16048815ec9f4b9c5))
- **table:** 优化样式文件 ([#8044](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8044)) ([fde48f9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fde48f9c8a5e934fe32f421d627960dbeb5615ef))
- **tree-select:** 修复回显顺序问题 ([#8108](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8108)) ([eb4077d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb4077df104743fd7ccdc44307c2dc8aa5dbbbca))
- **tree:** 修复 nzCheckBoxChange 事件未发出问题 ([#8038](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8038)) ([a9dc205](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a9dc2052930b7f6694d5933a86fc3b488b7bd786))

### Features

- **affix:** 支持 `standalone` 用法 ([#8037](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8037)) ([583883c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/583883c0623d640bbea2d04b3a76896d08a68d4c))
- **hash-code:** 新增 `HashCode` 组件 ([#8111](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8111)) ([0254ee2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0254ee2e673d8ac8cff42a2aef2933367f8b0931))
- **image:** 支持指定缩放步骤比例 ([#8163](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8163)) ([5aa4db9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5aa4db9f3b429e1f973a75f65cdd8b107586634d))
- **notification:** 支持自定义 template ([#8046](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8046)) ([9689c42](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9689c4298e57d67eb340140c8924d4743f07bd04))
- **schematics:** 支持 `standalone` 下 ng-add 命令 ([#8095](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8095)) ([c1b61f7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c1b61f720199ebfba0f48834b2ceaf93fed148d1))
- **slider:** `nzTipFormatter` 支持 Template 类型 ([#7505](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7505)) ([7c79ab3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c79ab37a8c0b4bc47bf1873c167417f316c94a9))
- **table:** 添加 `nzLabel` 以在复选框中包含 `aria-label` ([#7903](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7903)) ([5834e46](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5834e469291ee2a6975e4b74015468d7c1d739d2))
- **table:** 支持自定义展开图标 ([#7886](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7886)) ([1507ed0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1507ed0e2c1e869bd45925f2335ff1c4a3570430))
- **tooltip,popover,popconfirm:** 暴露 `cdkConnectedOverlayPush` 配置 ([#8166](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8166)) ([a821c62](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a821c62c5a438ff24282230376b18cd0bfdbfc19))

## 16.2.2

`2023-10-23`

### Bug Fixes

- 内置 `cdk-overlay` 样式 ([#8132](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8132)) ([3209d74](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3209d744187133e518f564bfe5a2f56ac371fc22))
- **cascader:** 兼容 rxjs v6 ([#8133](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8133)) ([54a5c76](https://github.com/NG-ZORRO/ng-zorro-antd/commit/54a5c769a061bc07e342c1f462bf27c422df44a3))
- **drawer:** `drawer` 不能打开 ([#8120](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8120)) ([24d0664](https://github.com/NG-ZORRO/ng-zorro-antd/commit/24d06640a623f3ea2fd9fa459c729a103938d7fc))

## 16.2.1

`2023-10-19`

### Bug Fixes

- `@angular/cdk/overlay-prebuilt.css` 样式报错 ([#8122](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8122)) ([42da190](https://github.com/NG-ZORRO/ng-zorro-antd/commit/42da1905a74b5a2049c045cef90d3c5cd595b8a3))
- **color-picker:** 优化 `demo` 展示 ([#8088](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8088)) ([6d03099](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d03099e40364b85276db4c0163bae32c62bad73))
- **menu:** menu title 溢出省略 ([#8055](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8055)) ([0674f78](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0674f785213ad914ad58fddc42e3083ff750f102))
- **tree-select:** 修复节点为禁用状态时，back快捷键能删除bug ([#8105](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8105)) ([07a1f5e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07a1f5e41d82ac59c9de744a3528c23e2b871624))

### Features

- **select:** 支持自定义 `nz-option-item` 的 `attr.title` ([#8097](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8097)) ([2ee261a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2ee261ac24f7ea0501d07ad35fcdb435714ffe9b))

## 16.2.0

`2023-09-18`

### Bug Fixes

- **list:** 修复同步操作项不显示在项目中的问题 ([#7958](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7958)) ([3b6bdec](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3b6bdecef32ee4d9bb14491b617870733cfd9553))
- **tree:** 修复 `nzBeforeDrop` 拖拽样式不消失问题 ([#8015](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8015)) ([2d0b3f7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d0b3f71490e38f8512285f81fcf3baa8f6eb4db))
- **button:** 添加 `ant-btn-icon-only` class ([#7631](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7631)) ([#7678](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7678)) ([7470ed6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7470ed66e1651d753fa43e197a4ab0d548744885))
- **cascader:** 修复自定义已选项后会出现 title undefined 问题 ([#8011](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8011)) ([10003db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/10003db77b9bda21772733c41b3c503ee85d5c81)), closes [#8006](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8006)
- **core:** 修复 CSP 问题 ([#8059](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8059)) ([295b333](https://github.com/NG-ZORRO/ng-zorro-antd/commit/295b333774990a420c39ba67912598dafd2f1842))
- **cron-expression:** 清除 console 警告 ([#7926](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7926)) ([b358345](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b358345c14746501e47d7e73dffe41d32b9ab118))
- **date-picker:** 更新代码注释 ([#7991](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7991)) ([8b6b653](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8b6b653547d92a27079c27b3ef7e68df68a4f5fd))
- **i18n:** 更新国际化文案 ([#7901](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7901)) ([9bfce45](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9bfce45a37a9c50aafbcaf96a8db9450bc2c5bf1))
- **message:** 关闭后清理 DOM ([#7965](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7965)) ([71ead99](https://github.com/NG-ZORRO/ng-zorro-antd/commit/71ead99aa781e50f3c896107f5b668b9a2cea767)), closes [#7772](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7772)
- **message:** 修复 `overlay` 的 `z-index` ([#8081](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8081)) ([b1d2095](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b1d20953eda23c9dcb4f74530621cf9cf1a33e45))
- **notification:** 更新操作不创建新的 `messageId` ([#8000](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8000)) ([e240264](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e240264796dfd3a8692efcb92178688b78d0b69f))
- **qrcode:** 优化 demo 样式 ([#8020](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8020)) ([078aaf9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/078aaf91335d2d9fa085d06a792ddd49c17948e0))
- **table:** 自定义列移除空格 ([#8022](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8022)) ([15e244c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15e244cc954cab1186d33006c7915f34d92e4d6d))
- **time-picker:** 修复 `modelChange` 触发两次问题 ([#7902](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7902)) ([74c13a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/74c13a49f92a263a05a34af63f6a2b71a554078e))
- **tree-view:** 修复重复渲染问题 ([#8035](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8035)) ([68cb4b2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/68cb4b2d25d3bc149e4f8e80c030a16db75959c2))
- **tree:** 移除 console ([#8019](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8019)) ([fa0312a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa0312a4c68b26902ca28ed974754599b17b2d8a))
- **watermark:** 修复重绘问题 ([#8012](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8012)) ([030318e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/030318e82725d7650c98bf0ec06d2b23df16d9f0))
- **showcase:** 修复 `rtl` 模式的样式问题 ([#8063](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8063)) ([d57b7da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d57b7dac5817cb1de9de9edda2343a6089854fff))

### Features

- **core:** 支持 `provide` 使用方式 ([#7952](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7952)) ([150c6ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/150c6cab4636fa9daa1e892d27b894c6b7381b35))
- **cascader:** 支持 `observable` 加载数据 ([#8048](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8048)) ([1436f21](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1436f212130041bec03d6f2d2d7f5591dff04b7a))
- **color-picker:** 支持颜色选择器组件 ([#8013](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8013)) ([8439704](https://github.com/NG-ZORRO/ng-zorro-antd/commit/843970459fdb18dfa0ddc861d02e6c21e87c12b4))
- **cron-expression:** 新增单元测试 ([#7993](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7993)) ([605e969](https://github.com/NG-ZORRO/ng-zorro-antd/commit/605e969013cf48a29f4786765cf6c6da9f10643a))
- **cron-expression:** 支持 `nzDisabled` && `nzBorderless` 属性 ([#7992](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7992)) ([6d31bde](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d31bde3ef1f43cc145d2009afcf90931e96a731))
- **dropdown:** close context menu on escape ([#7915](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7915)) ([6d0032e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d0032ededc140a017c01158ae76402a86c7b334))
- **dropdown:** 优化 `NzContextMenuService#create()` ([#7768](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7768)) ([9b3e6cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b3e6cba852d4a782d15311c910b747a3bbc4d02))
- **form:** 支持 `label wrap` ([#7892](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7892)) ([37391de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37391de29afdd3126dbbdcae6ca3ba2e637fd596))
- **input:** `number` 类型支持隐藏步骤 ([#8003](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8003)) ([0f3aed5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0f3aed599874e0d1c2786f2d14fec52128afbec8))
- **modal:** 移除 `nzComponentParams` 过期属性 ([#7930](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7930)) ([baab16c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/baab16c497902f0cbf2668fb061ac8d40ffd18b2))
- **qrcode:** 支持新特性 ([#8001](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8001)) ([718ba29](https://github.com/NG-ZORRO/ng-zorro-antd/commit/718ba2943c7c7e12c8526e52e8806955d3fb0504))
- **resizable:** `NzResizeEvent` 暴露 `direction` ([#7987](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7987)) ([4143473](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41434734ffe839f3ed71bd19486a5f76adc20463))
- **resizable:** 支持更多鼠标类型 ([#8042](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8042)) ([e564714](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e56471423142d71ce9117707f7240c83f6fe44e5))
- **table:** 支持自定义展示列 ([#7966](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7966)) ([d26870f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d26870f9ffd3f5122e95246a24587c739b04fd8a))

### Performance Improvements

- **select:** 支持传递 `nzKey` ([#8033](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8033)) ([e94da4e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e94da4eddd663a1e7a5e9e6e0781f1a6da59f1c7))
- **select:** 移除不必要的类型 ([#7850](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7850)) ([71c2138](https://github.com/NG-ZORRO/ng-zorro-antd/commit/71c2138ce28e07539784d8fb228adf122ed13a33))
- **tabs:** 添加 `.ant-tabs-tab` 样式以减少 css 计算消耗 ([#7935](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7935)) ([#7936](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7936)) ([198644a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/198644a09ac828c4e9b208799c8be1a57cd8ce86))

## 16.1.0

`2023-07-16`

### Bug Fixes

- **list:** 修复异步节点未正确展示问题 ([#7958](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7958)) ([3b6bdec](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3b6bdecef32ee4d9bb14491b617870733cfd9553))
- **tree:** 修复拖拽节点样式未正确取消问题 ([#8015](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8015)) ([2d0b3f7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d0b3f71490e38f8512285f81fcf3baa8f6eb4db))
- **cascader:** 修复自定义项导致 title undefined 问题 ([#8011](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8011)) ([10003db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/10003db77b9bda21772733c41b3c503ee85d5c81)), closes [#8006](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8006)
- **date-picker:** 更新代码注释 ([#7991](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7991)) ([8b6b653](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8b6b653547d92a27079c27b3ef7e68df68a4f5fd))
- **i18n:** 更新繁体文案 ([#7901](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7901)) ([9bfce45](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9bfce45a37a9c50aafbcaf96a8db9450bc2c5bf1))
- **notification:** 更新组件不创建新的 messageId ([#8000](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8000)) ([e240264](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e240264796dfd3a8692efcb92178688b78d0b69f))
- **time-picker:** 修复 modelChange 触发多次问题 ([#7902](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7902)) ([74c13a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/74c13a49f92a263a05a34af63f6a2b71a554078e))
- **watermark:** 修复水印组件重绘问题 ([#8012](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8012)) ([030318e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/030318e82725d7650c98bf0ec06d2b23df16d9f0))

### Features

- **cron-expression:** 新增单元测试 ([#7993](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7993)) ([605e969](https://github.com/NG-ZORRO/ng-zorro-antd/commit/605e969013cf48a29f4786765cf6c6da9f10643a))
- **cron-expression:** 支持 `nzDisabled` && `nzBorderless` 属性 ([#7992](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7992)) ([6d31bde](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d31bde3ef1f43cc145d2009afcf90931e96a731))
- **dropdown:** 支持 ESC 退出 ([#7915](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7915)) ([6d0032e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d0032ededc140a017c01158ae76402a86c7b334))
- **dropdown:** create 返回 `EmbeddedViewRef` 对象 ([#7768](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7768)) ([9b3e6cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b3e6cba852d4a782d15311c910b747a3bbc4d02))
- **form:** 支持 `nzLabelWrap` 属性控制换行 ([#7892](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7892)) ([37391de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37391de29afdd3126dbbdcae6ca3ba2e637fd596))
- **modal:** 移除废弃属性 `nzComponentParams` ([#7930](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7930)) ([baab16c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/baab16c497902f0cbf2668fb061ac8d40ffd18b2))
- **qrcode:** 支持 `nzBgColor` & `nzPadding` 优化另存为图片效果 ([#8001](https://github.com/NG-ZORRO/ng-zorro-antd/issues/8001)) ([718ba29](https://github.com/NG-ZORRO/ng-zorro-antd/commit/718ba2943c7c7e12c8526e52e8806955d3fb0504))
- **resizable:** `NzResizeEvent` 支持 `NzResizeDirection` 属性 ([#7987](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7987)) ([4143473](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41434734ffe839f3ed71bd19486a5f76adc20463))
- **table:** 支持自定义展示列 ([#7966](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7966)) ([d26870f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d26870f9ffd3f5122e95246a24587c739b04fd8a))

### Performance Improvements

- **select:** 移除多余的方法参数类型 ([#7850](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7850)) ([71c2138](https://github.com/NG-ZORRO/ng-zorro-antd/commit/71c2138ce28e07539784d8fb228adf122ed13a33))
- **tabs:** 优化 css 渲染性能 ([#7935](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7935)) ([#7936](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7936)) ([198644a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/198644a09ac828c4e9b208799c8be1a57cd8ce86))

## 16.0.0

`2023-05-31`

### 安装 ng-zorro-antd

> 对于 `standalone` 模式请手动参考文档添加

```bash
$ cd PROJECT-NAME
$ ng add ng-zorro-antd@16.0.0
```

### Bug Fixes

- **date-picker:** 修复 `ng-untouched` 问题 ([#7922](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7922)) ([9ebcf72](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9ebcf72bde75b735c0798bc66bb62226b7f29536))
- **date-picker:** 修复跨年选择周期显示不正确问题 ([#7923](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7923)) ([e7f9538](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e7f953822133ce31d2523a48766dfe6572f95430))
- **datepicker:** 修复 `ngModel` 未更新问题 ([#7948](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7948)) ([100796c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/100796c74cd75de9cebbf89cb58f4bf3cc58b746))
- **slider:** 修复首个禁用失效问题 ([#7947](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7947)) ([ad2faf4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad2faf4c67cb6e7bc1b12646d0ceb9153a59d75c)), closes [#7943](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7943)

## 15.1.0

`2023-04-02`

### Bug Fixes

- **docs:** 更新升级文档描述 ([#7890](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7890)) ([78541e1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/78541e104184998551d198ce6a4d980895d1688a))
- **datepicker:** 更新相同值触发 `OnChange` 事件 ([#7815](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7815)) ([3602abc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3602abc4b36232076734d63cde125553926119a9))
- **radio:** 触发 `focus` 和 `blur` 时间时更新 `touch` 状态 ([#7885](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7885)) ([39f0cea](https://github.com/NG-ZORRO/ng-zorro-antd/commit/39f0cea785cf124abc7ddd2ccd4dd46bd9f6c30b)), closes [#7877](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7877)
- **time-picker:** 修复 AM/PM 选择器隐藏问题 ([#7701](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7701)) ([129e944](https://github.com/NG-ZORRO/ng-zorro-antd/commit/129e9446c3937dea954c7e98c25c5222a4879468))
- **tooltip:** 修复测试代码报错问题 ([#7893](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7893)) ([3dfa655](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3dfa655127480bca2df46fc98cd946967ee05797))

### Features

- **form:** 支持 `label` 设置对齐方式 ([#7870](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7870)) ([d54b3b4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d54b3b4cc44b6e9404a2de1e75ece5c3928ec453))
- **modal:** 支持 `nzData` 传值 ([#7849](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7849)) ([ea9969d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ea9969d840855a2ba1385f2fd3b51889a6b15258))
- **qrcode:** 新增二维码组件 ([#7803](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7803)) ([ff36981](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ff36981aa5289eb4d9e267d6a9a3b01770bba456))
- **watermark:** 新增水印组件 ([#7857](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7857)) ([11b85a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/11b85a4e0321fea3dd8581bb191ba2ca907ef29b))

### Performance Improvements

- **avatar:** 减少触发不必要的脏值检测 ([#7862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7862)) ([1c48745](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1c4874592b402f526518be03e831634e1c9e9341))
- **date-picker:** 减少触发不必要的脏值检测 ([#7860](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7860)) ([1171460](https://github.com/NG-ZORRO/ng-zorro-antd/commit/11714605466f910b24d450f6b7e1e4b7459bbca7))

## 15.0.3

`2023-01-17`

### Bug Fixes

- **radio:** 修复禁用失效问题 ([#7812](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7812)) ([2b4df9a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2b4df9a833849c481346194c817196bc2697a1ff))

## 15.0.2

`2023-01-15`

### Bug Fixes

- **checkbox:** 修复禁用失效问题 ([#7806](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7806)) ([eb2cb04](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb2cb046e122eab654a2e721b51f397d2790019e))

## 15.0.1

`2023-01-09`

### Bug Fixes

- **components:** 修复部分组件禁用属性未生效情况 ([#7786](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7786)) ([bc673e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc673e7deef219de82e5dc23e1318f76a1ef98f6))

## 15.0.0

`2022-12-21`

### 安装 ng-zorro-antd

```bash
$ cd PROJECT-NAME
$ ng add ng-zorro-antd@15.0.0
```

### Bug Fixes

- **drawer:** 修复 `nzContentParams` 定义问题 ([#7668](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7668)) ([0074013](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0074013f585ba23ed7b9156e379b7c81be445bf1)), closes [#7620](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7620)

### Performance Improvements

- **date-picker:** 移除未生效的代码 ([#7767](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7767)) ([1572da5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1572da58cdd9629e1aeab3d4c0262dcc91bd597c))
- **form:** 移除未生效的代码 ([#7766](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7766)) ([162d290](https://github.com/NG-ZORRO/ng-zorro-antd/commit/162d290305a0bee6678c066eddc74e5e919f280c))

## 14.3.0

`2022-12-11`

### Bug Fixes

- **tree:** 修复自定义节点时拖拽目标样式未显示问题 ([#7579](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7579)) ([5996019](https://github.com/NG-ZORRO/ng-zorro-antd/commit/59960194773a0c1036c2142e199b9b7633383fea))
- **input:** 修复 `nzHasFeedback` 样式问题 ([#7709](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7709)) ([ddd44d2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ddd44d2478621370493b154ca39411552b934290)), closes [#7574](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7574)
- **list:** 指定 context 上下文类型 ([#7756](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7756)) ([4eb32fd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4eb32fdb3411f1ebd98d2120f4ea585816263bac))
- **select:** 修复禁用选项被 `Enterd` 键选择问题 ([#7686](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7686)) ([5bdf244](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5bdf2440bc48547bc76a6646cce49fd8b036beb3))
- **tree:** 修复组件搜索性能问题 ([#7385](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7385)) ([21208f0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/21208f0c990db36864138a228fb5f065c4fcdb92))

### Features

- **cron-expression:** 支持自定义渲染时间能力 ([#7750](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7750)) ([1820da5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1820da520178e6d8ba7cecd2b039e1836f500969))
- **date-picker:** `nzSeparator` 属性支持 `template` 方式使用 ([#7721](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7721)) ([3771512](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37715122bc103d9a74395fc746d39f26ffa82bd8))
- **select:** 支持 `Tab` 键 ([#7728](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7728)) ([d9f9092](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d9f9092dd50beea81b48d775c5de6df507a44b90))
- **tree-select:** 支持设置下拉展开位置 ([#7551](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7551)) ([325971e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/325971e83710271470bbd085d252b8e1eb2d838c))

## 14.2.1

`2022-11-27`

### Bug Fixes

- **animation:** 修复部分组件动画失效问题 ([#7739](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7739)) ([2df4860](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2df48601854ee8a383d3a02044f8a3bcbf7f18db))
- **i18n:** 添加缺失的匈牙利语 ([#7733](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7733)) ([de71300](https://github.com/NG-ZORRO/ng-zorro-antd/commit/de71300188e154a43f9abe928153f19aa8e2862f))
- **select:** 修复滚动加载情况下选中值行为 ([#7725](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7725)) ([9e08be9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9e08be9e2c0eb15e76da44df7e17d153b3b1339d))

## 14.2.0

`2022-11-21`

### Bug Fixes

- **cron-expression:** 优化组件样式 ([#7715](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7715)) ([726ded3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/726ded31a8a8d9ad46a5095ece21e31c321cd10c))
- **date-picker:** 修复 `RTL` 模式下箭头位置错误问题 ([#7690](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7690)) ([41b56e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41b56e4072b6d5832c1f9e31196dcce4fe8632aa))
- **date-picker:** 修复重复组件问题 ([#7680](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7680)) ([ee4872e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee4872e1c93f3439bbafe56f430aca4e0eca085c)), closes [#7450](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7450)
- **descriptions:** 修复 `nzStringTemplateOutlet` 标题样式问题 ([#7704](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7704)) ([bec3b42](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bec3b42bdbdad31dcb66000376e40b9528f68ba5)), closes [#7698](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7698)
- **icon:** 修复部分情况下未及时更新情况 ([#7719](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7719)) ([754ded6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/754ded61fe41d523c2bf216a7ea49cc2a5a6fa61))
- **image:** 修复预览本地图片错误问题 ([#7615](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7615)) ([616f59f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/616f59ffe80b2f5a6d6e41787eec29de240901d4))

### Features

- **alert:** 支持自定义图标 ([#7691](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7691)) ([cc014a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc014a12099c09ae016a400c4f0a5bb3208d2503))
- **carousel:** `nzLoop` 属性支持手动指定是否循环 ([#7693](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7693)) ([e3103f0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e3103f07860b6d57ebf32155fd3ae416afd3e386))
- **cron-expression:** 新增 `cron` 表达式组件 ([#7677](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7677)) ([3a638af](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3a638af6f67e93cc6a029e4d96033ad9dabf555b))
- **popconfirm:** 支持 `nzOkDanger` 类型自转换 ([#7720](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7720)) ([f6a8044](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f6a804408e21f0ae7dc7385da202acd54e76cdd7))

## 14.1.1

`2022-10-15`

### Bug Fixes

- **code-editor:** 修复 `Window` 定义与 `monaco-editor` 最新版本不匹配问题 ([#7676](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7676)) ([bdf6507](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bdf65077f174512efa2ed2dcf65c87734cfe4255))
- **date-picker:** 修复清除按钮无效问题 ([#7671](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7671)) ([ba90876](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ba90876690e462e18da0126d8e90d682b62ebb70)), closes [#7534](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7534)

## 14.1.0

`2022-10-09`

### Bug Fixes

- **cascader:** 修复文档格式 ([#7604](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7604)) ([8b92c63](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8b92c6362e9702a79ff23f3605d8a3ab84c4b9ca))
- **i18n:** 更新国际化文案 ([#7646](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7646)) ([aecb788](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aecb78846138249e50dce48de9cfed29d777d6ac))
- **pagination:** dom 结构添加 `ul` 标签以同步 `antd` 结构 ([#7500](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7500)) ([becdd68](https://github.com/NG-ZORRO/ng-zorro-antd/commit/becdd682514e36b188be93667a03ac74f224dcf7))
- **segmented:** 修复 `index.less` 文件未导入问题 ([#7624](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7624)) ([1d6a646](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1d6a6464e5d0fccc6f78e16af3c32d48efe95fc7))
- **select:** 修复虚拟滚动出现空白区域问题 ([#7642](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7642)) ([1f10a9c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f10a9cfa9e16d64737325b57cc29f3c8e8a84c9))
- **select:** 修复 `select` 组件内输入框 `input` 元素宽度不占满问题 ([#7626](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7626)) ([82159e3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/82159e34e53c95eeff4886c03f70b2978110cc00))
- **statistic:** 移除顶层多余的 `div` 元素 ([#7659](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7659)) ([07df410](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07df41046e595078d37cef3f3419db12d48b33d8))
- **steps:** 移除顶层多余的 `div` 元素 ([#7582](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7582)) ([60beabc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/60beabccd2459adcb973133fc139008b31abfca0))
- **typography:** 修复部分场景下聚焦元素不生效问题 ([#7320](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7320)) ([2d2fe33](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d2fe33b135168a515abe3d41a86a0f2ba9ddfcf))

### Features

- **popconfirm:** 支持异步关闭 ([#7533](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7533)) ([797b261](https://github.com/NG-ZORRO/ng-zorro-antd/commit/797b2617f08394b56fe0a7903dc69e2d75984219))
- **select:** 支持指定弹出位置 ([#7537](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7537)) ([dda0e6d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dda0e6d6b8e0abba46946a6ba04142500ba38328))
- **date-picker:** 新增 `nzShowWeekNumber` 属性显示周数 ([#7621](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7621)) ([2cb80fc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2cb80fc1253322e5b02aba38f50b2f37784d0aa7))
- **menu:** 支持指定弹出位置 ([#7420](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7420)) ([b1223bd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b1223bdda6cfd4870adbaa2fbd800e3c3aa4a0d4)), closes [#4743](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4743)
- **select:** `nzDropdownClassName` 属性支持 `string` 数组 ([#7643](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7643)) ([966dc8f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/966dc8f2b39b9cc7f46e4a1c5fba157c78173a52))
- **time-picker:** 新增 `nzInputReadOnly` 属性支持 `input` 标签设置为只读 ([#7660](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7660)) ([2dcefe2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2dcefe2c197e6438736f326206229b0287400cc3))

## 14.0.0

`2022-08-25`

### 安装 ng-zorro-antd

```bash
$ cd PROJECT-NAME
$ ng add ng-zorro-antd@14.0.0
```

### Bug Fixes

- **steps:** 移除顶层多余的 `div` 元素 ([#7582](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7582)) ([60beabc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/60beabccd2459adcb973133fc139008b31abfca0))

### Features

- **icon:** `nz-icon` 使用方式从 `i` 元素变更为 `span` 元素 ([#7586](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7586)) ([7242111](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7242111c8bc2523df9d13e19521473502a4f6cf1))
- **popconfirm:** 支持基于 `Promise` 的异步关闭 ([#7533](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7533)) ([797b261](https://github.com/NG-ZORRO/ng-zorro-antd/commit/797b2617f08394b56fe0a7903dc69e2d75984219))

```diff
- <i nz-icon nzType="search" nzTheme="outline"></i>
+ <span nz-icon nzType="search" nzTheme="outline"></span>
```

## BREAKING CHANGES

- **pagination:** `dom` 结构中添加 `ul` 标签 ([#7500](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7500)) ([becdd68](https://github.com/NG-ZORRO/ng-zorro-antd/commit/becdd682514e36b188be93667a03ac74f224dcf7))

## 13.4.0

`2022-07-25`

### Bug Fixes

- **datepicker:** 修复手动打开组件未正确聚焦输入框问题 ([#7512](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7512)) ([b3a27d8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b3a27d82900b455c32226100a7dbad87f20fd18a))
- **transfer:** 修复选择/反选操作未正确显示问题 ([#7419](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7419)) ([1e9c11e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e9c11e2b60dafd4320da1a3d852c17fcce1dafa))

### Features

- **notification:** 支持指定位置弹出 ([#7540](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7540)) ([d8b26dd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d8b26dd6377d9546121122bd1c0498be7eaf4aa8))
- **anchor:** 支持设置滚动偏移量等功能 ([#7494](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7494)) ([254b429](https://github.com/NG-ZORRO/ng-zorro-antd/commit/254b4294473fdcb495ea5e7a81a81e4331e50fc2))
- **badge:** 支持设置 `nzSize` 属性 ([#7405](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7405)) ([f40dd38](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f40dd38702bec197742b38afc075af8ec4bc6170))
- **date-picker:** 支持指定弹出位置 ([#7527](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7527)) ([a652470](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a65247012bce98a891e6f46242e95cecfbbc0641))
- **input-number:** 支持无边框模式 ([#7539](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7539)) ([ea1138b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ea1138b9a47a9c3678ce60babea5cd59b2278002))
- **switch:** 添加 `nzId` 属性指定内部元素 id ([#6815](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6815)) ([4c71bdb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c71bdb6a46d4e590ab6cc1f3eb9dd3d05b49eee))
- **time-picker:** 支持无边框模式 ([#7547](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7547)) ([a8c3f95](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a8c3f957cb66315350d50b4b8d164c8e6de19d76))

### Performance Improvements

- **transfer:** 增加 `trackBy` 方法减少渲染消耗 ([#7424](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7424)) ([0587236](https://github.com/NG-ZORRO/ng-zorro-antd/commit/058723643e7b52b0a470cbbc42de91be3b2275e6))

## 13.3.2

`2022-06-26`

### Bug Fixes

- **input-number:** 修复引入 input number 模块报错问题 ([#7531](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7531)) ([800e6f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/800e6f4f1495d63edcb0f992836a75a40e3ca5b6))

## 13.3.1

`2022-06-20`

### Bug Fixes

- **input, input-number, steps:** 修复组件部分场景下的样式问题 ([#7522](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7522)) ([222b225](https://github.com/NG-ZORRO/ng-zorro-antd/commit/222b225ed4d4e56de049b08d7e6e8a77d476d481))

## 13.3.0

`2022-06-15`

### Bug Fixes

- **icon:** 修复 deleteOutline 图标缺失问题 ([#7499](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7499)) ([ba6bade](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ba6badee1fff04eeb811ef50ac03cf9ccfeaebf7))
- **tooltip:** 修复首次显示时位置不正确问题 ([#7457](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7457)) ([23a2fd5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/23a2fd567af598625267187dea2db487e570b9b7)), closes [#7453](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7453)
- **transfer:** 修复在表单内部使用时错误触发 `submit` 问题 ([#7413](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7413)) ([0cfebca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0cfebca5ebe4f7239212f99753cbbfd1d2790f63)), closes [#7410](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7410)

### Features

- **cascader:** 支持设置校验状态 ([#7452](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7452)) ([e10908e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e10908e505b93f2e2d76f24c3f0dc7972fda266c))
- **date-picker:** 支持设置校验状态 ([#7479](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7479)) ([c3d0874](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c3d08742247a2f2e12d070e352aa7932f9a0d326))
- **form:** 支持根据表单状态设置子组件校验状态 ([#7489](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7489)) ([98ac620](https://github.com/NG-ZORRO/ng-zorro-antd/commit/98ac620a1eac4e307505450fbf7890f5b3da20ff))
- **input-number:** 支持数字输入框前缀后缀组合 ([#7488](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7488)) ([b038fa2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b038fa26703ab010dab1b03946986e6f5c6ee66c))
- **input-number:** 支持设置校验状态 ([#7462](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7462)) ([0c9287a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0c9287a2005149f2ecd1b6b3ad58d7374013bb6b))
- **input:** 支持设置校验状态 ([#7472](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7472)) ([999215e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/999215e6ba45f1e3e32f561052ce8a902af895d7))
- **mentions:** 支持设置校验状态 ([#7467](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7467)) ([ac38b2d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ac38b2d64697f307e79720a691fbdf60c32fb8d0))
- **segmented:** 新增分段控制器组件 ([#7404](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7404)) ([95a31da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/95a31dab42dce3895d012bd2458ef51ec90ef33f))
- **select:** 支持设置校验状态 ([#7478](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7478)) ([44b7fe0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/44b7fe0e1f8892a2da9e9950da40081bab767d4d))
- **time-picker:** 支持设置校验状态 ([#7473](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7473)) ([0d8249b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0d8249b31e70c28ea47f37b818ff1c5fe0ac8239))
- **transfer:** 支持设置校验状态 ([#7475](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7475)) ([9b98fe1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b98fe11f4832c774067b10e50f6b981b9147dbe))
- **tree-select:** 支持设置校验状态 ([#7477](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7477)) ([40815ad](https://github.com/NG-ZORRO/ng-zorro-antd/commit/40815ad90d4160be4a6a9dd29ee7b072ecde5f75))

## 13.2.2

`2022-05-12`

### Bug Fixes

- **tree-view:** 修复虚拟滚动模式下动态添加数据未正确更新问题 ([#7426](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7426)) ([a702674](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a702674d76974bcc8fa854394bd6681d8dfe8347))

## 13.2.1

`2022-04-27`

### Bug Fixes

- **code-editor:** 移除 `NZ_CONFIG` monaco-editor 强依赖 ([#7392](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7392)) ([929084d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/929084d5ba65c4e9661ccaea300c58e85e39bed6))

## 13.2.0

`2022-04-26`

### Bug Fixes

- **carousel:** 修复 `nzAfterChange` 回调未正确触发问题 ([#7326](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7326)) ([b517bd4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b517bd442fa36f4cfc5e4a37d587b4f26cfb940c)), closes [#7323](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7323)
- **cascader:** 修复 `hover` 模式选项框无法错误隐藏问题 ([#7381](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7381)) ([3d41ce0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3d41ce08769bcbf337590169ded3559b092bc5cd))
- **cascader:** 修复选项框超出区域被遮挡问题 ([#7306](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7306)) ([4c669a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c669a58f0bf02bc835e2d68402b5ea0c98511c5))
- **i18n:** 修复部分翻译缺失问题 ([#7364](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7364)) ([64e1c7c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/64e1c7cf2bd3b094a0124ed8ddb51edab284b927))
- **list:** 修复 `NgZone.onStable` 事件后未正确触发脏值检测问题 ([#7314](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7314)) ([425f8df](https://github.com/NG-ZORRO/ng-zorro-antd/commit/425f8dff39f29ba620cdeb6f4a6f45471845b819))
- **modal:** 关闭弹窗过程中忽略点击确认取消按钮行为 ([#7336](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7336)) ([d169452](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d16945249a28338ba480af46ff037d69b67b4af4))
- **popconfirm:** 修复 `nzPopconfirmVisibleChange` 未触发问题 ([#7338](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7338)) ([561041c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/561041c3e7ce643cc57cfd2c18c22dd36da389c8))
- **upload:** 修复在 Firefox 91/92 版本中拖拽文件会打开新页面问题 ([#7190](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7190)) ([9b51874](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b518742e3be8c85c0b2e2e66d4ffe108e43a2d0))

### Features

- **code-editor:** 支持设置自定义配置以支持 monaco editor 配置 ([#7121](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7121)) ([21ec517](https://github.com/NG-ZORRO/ng-zorro-antd/commit/21ec517ba55cd20aa78298cd1050069308a9f98b))
- **code-editor:** 支持在 `NZ_CONFIG` 定义 `window.MonacoEnvironment` ([#7359](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7359)) ([4dfd9cd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4dfd9cd21507fcf4382d5f28f03fd969d8fc425c)), closes [#6502](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6502)
- **image:** 支持点击键盘左右方向键切换图片 ([#7321](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7321)) ([b5f82b5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b5f82b51eed45f9bc7f7418c90185693887b202a))
- **input-number:** 增加 `nzReadOnly` 属性支持只读方式 ([#7372](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7372)) ([0da7496](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0da7496ba4dcc03be2827b6783a977382e487da1)), closes [#7369](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7369)

### Performance Improvements

- **anchor:** 使用 `passive` 改善的滚屏性能 ([#7330](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7330)) ([aab060f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aab060ffcebae479954355bf02804882935ef8d2))
- **back-top:** 使用 `passive` 改善的滚屏性能 ([#7329](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7329)) ([7f3c4e1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7f3c4e1c5e8330597b5b0024c7b9075bccf93f44))
- **cascader:** 减少触发不必要的脏值检测 ([#7312](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7312)) ([cb803f9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb803f9a8c040157d83e095ce9ab0bd28a161b64))
- **image:** 减少触发不必要的脏值检测 ([#7309](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7309)) ([752a5b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/752a5b6f3e76d467a839a39aa587deaed953ed72))
- **input-number:** 减少触发不必要的脏值检测 ([#7313](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7313)) ([54386ef](https://github.com/NG-ZORRO/ng-zorro-antd/commit/54386efaac97982675c8c1e1b3504cfed9671248))
- **modal:** 优化在不同设备上渲染帧率效果 ([#7293](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7293)) ([106d346](https://github.com/NG-ZORRO/ng-zorro-antd/commit/106d346d72568f8256a942478d808d002f5421c7))
- **resizable:** 使用 `passive` 改善性能 ([#7331](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7331)) ([518997b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/518997bcf193a59510a0dfc1db4ef306475eb990))
- **tree-view:** 减少触发不必要的脏值检测 ([#7307](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7307)) ([1e0872b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e0872b30873644032917f6242f585ba9bd1db30))

## 13.1.1

`2022-03-03`

### Bug Fixes

- **collapse:** 修复点击无法正常展开收起问题 ([#7284](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7284)) ([b7433a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b7433a9d22e82a21d1557c026ba78e07b9541bec))
- **icon:** 修复 SSR 构建加载 svg icon 抛错问题 ([#7290](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7290)) ([fe0484f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fe0484f348c73fc85bf721167f6d4e6f278b98f1)), closes [#7240](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7240)
- **select:** 修复搜索未正确匹配下拉选择项问题 ([#6816](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6816)) ([48d2a25](https://github.com/NG-ZORRO/ng-zorro-antd/commit/48d2a2538c9ddef5f77804cbecbf4c157f4e9f22)), closes [#6812](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6812)
- **upload:** 修复 `nzTransformFile` 转换上传的文件功能未正确转换文件问题 ([#7206](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7206)) ([b82d2f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b82d2f3a3f74c3f915f17a650dd86b51f22ae922))

## 13.1.0

`2022-02-25`

### Bug Fixes

- **button:** 修复 nzLoading 为 true 情况下仍可点击问题 ([#7267](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7267)) ([2306e0d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2306e0d61a232e79249e31357f3cbdc769312f2c))
- **date-picker:** 内联模式下修改 `z-index` 为 `auto` ([#7172](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7172)) ([26006f6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/26006f60f9b9bdf860adef8dbfc98a5f6922899d))
- **date-picker:** 修复日期变化时禁用时间段未同步问题 ([#7236](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7236)) ([ae67952](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ae6795238146833d7813e3882bb2593df155ea1b))
- **i18n:** 修复 fa-IR.ts 翻译缺失内容 ([#7249](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7249)) ([a7a0b41](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a7a0b413c9539cb801058c1956242f50a3923972))
- **i18n:** 修复 pt_BR.ts 翻译缺失内容 ([#7218](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7218)) ([95c7816](https://github.com/NG-ZORRO/ng-zorro-antd/commit/95c7816b369ed8efbd89b5bb3ba67d133b1ad71d))
- **input:** 删除 box-sizing 设置 ([#7214](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7214)) ([035dc94](https://github.com/NG-ZORRO/ng-zorro-antd/commit/035dc94b58766e8565e8f4d400b9dc67c3673a08)), closes [#7203](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7203)
- **input:** 修复 disabled 状态下样式不正确问题 ([#7250](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7250)) ([7acb8db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7acb8db6ff858a4daec20173fde3535b024f6d89))
- **radio:** 修复 radio 确保取消选中状态返回 `false` ([#7270](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7270)) ([2704237](https://github.com/NG-ZORRO/ng-zorro-antd/commit/270423707363514112bd75ed0384c5e70d7d3755))
- **select:** 修复下拉选项值为空时键盘事件报错问题 ([#7222](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7222)) ([4bd86ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4bd86ca0a72baf653fdb93d311159d97f3d36b84)), closes [#7242](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7242)
- **slider:** 修复 `keydown` 事件未触发 nzOnAfterChange 问题 ([#7252](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7252)) ([f419c07](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f419c07644f6fe0148a4a9990ad3f85aec590359)), closes [#7251](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7251)

### Features

- **alert:** 支持 `nzAction` 自定义操作项 ([#7246](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7246)) ([eb3b1ba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb3b1bafaedaff09d8f547a1cb7ecd4eb9aea67f))
- **drawer:** 支持 `nzSize` 属性与 `nzExtra` 自定义操作项 ([#7227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7227)) ([d2e5b76](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d2e5b76d176c9574dfe4a79c285e9d09e6edcc28))
- **i18n:** 添加 `kk_KZ` 哈萨克语国际化 ([#7261](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7261)) ([3580fb0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3580fb038c5d4c88bf2efe845b8b86fb47df7ee3))
- **i18n:** 添加 `km_KH` 高棉国际化 ([#7220](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7220)) ([f972391](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f9723918ea7a4646cb282a4254054bc3b3fd5564))

### Performance Improvements

- **auto-complete:** 减少触发不必要的脏值检测 ([#7138](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7138)) ([e95d941](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e95d941c17c31504438fef770ff5dd9f7e157534))
- **back-top:** 减少触发不必要的脏值检测 ([#7179](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7179)) ([7d091bb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7d091bba409ee9321215696568928d5684032ccf))
- **carousel:** 减少触发不必要的脏值检测 ([#7136](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7136)) ([fc991d1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fc991d180c1c8f006b294b3ab18950ed06e181e8))
- **collapse:** 减少触发不必要的脏值检测 ([#7181](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7181)) ([3c3eac9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c3eac9875556134118c60c3bcdf10dc7136beea))
- **dropdown:** 减少触发不必要的脏值检测 ([#7135](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7135)) ([4679592](https://github.com/NG-ZORRO/ng-zorro-antd/commit/467959298f57c81574ac7b25f3714e734026ac12))
- **image:** 减少触发不必要的脏值检测 ([#7147](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7147)) ([f0f52a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f0f52a4765da8ae26fd2fe36fe9024b8f574d204))
- **mention:** 减少触发不必要的脏值检测 ([#7146](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7146)) ([b72bd27](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b72bd2735da5d07713b6895db2842d132f62e131))
- **mention:** 减少触发不必要的脏值检测 ([#7130](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7130)) ([73af728](https://github.com/NG-ZORRO/ng-zorro-antd/commit/73af728527bb38ced9941e5ce29760bbae5b4a68))
- **resizable:** 减少触发不必要的脏值检测 ([#7170](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7170)) ([9a8d794](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9a8d79476be545be181e11a92d849e7e543d38c6))
- **select:** 减少触发不必要的脏值检测 ([#7133](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7133)) ([a1bbdab](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a1bbdabca53bd61423564448298892c54260d48e))
- **select:** 减少触发不必要的脏值检测 ([#7175](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7175)) ([fd63d22](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fd63d225e5ebdd800eae0be80685537746bfeb61))
- **table:** 减少触发不必要的脏值检测 ([#7174](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7174)) ([e541761](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5417611976bdcdde43f202bacd8b031bd8d0fab))
- **table:** 减少触发不必要的脏值检测 ([#7142](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7142)) ([5a5df13](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5a5df13bbdfe8575ef6b1fdd6df73d6100b82407))
- **table:** 减少触发不必要的脏值检测 ([#7140](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7140)) ([ec248c9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ec248c95162bdb7c23dda1926d156ae9cb7c7ace))
- **tabs:** 减少触发不必要的脏值检测 ([#7144](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7144)) ([148f84d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/148f84d11b6bf234544cfe06d1506519496e0628))
- **time-picker:** 减少触发不必要的脏值检测 ([#7143](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7143)) ([72da774](https://github.com/NG-ZORRO/ng-zorro-antd/commit/72da774dfd0927699c9c5f8613086a1e5d0e53c0))
- **tree-view:** 减少触发不必要的脏值检测 ([#7178](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7178)) ([0054f59](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0054f59a383f937f6e0f71435da41c74264be6ae))
- **typography:** 减少触发不必要的脏值检测 ([#7185](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7185)) ([ad547fb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad547fb7193999735396d12c07124c70d9941daa))

## 13.0.1

`2022-01-18`

### Bug Fixes

- **back-top:** 修复 scrolling listener 问题 ([#7208](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7208)) ([3bcd343](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3bcd343e38aefc35af1c2386a539d19a1d0ca279)), closes [#7199](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7199)
- **drawer:** 修复 `nzTitle` 为空时关闭图标的位置错误问题 ([#7176](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7176)) ([a6195b9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6195b991a531e914faef2237dadf7226b8d6390)), closes [#7164](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7164)
- **icon:** 修复切换图标未正确替换问题 ([#7188](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7188)) ([67ac573](https://github.com/NG-ZORRO/ng-zorro-antd/commit/67ac573d2e0a9b19263c600f020842532844566a)), closes [#7186](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7186)
- **statistic:** `nzCountdownFinish` 事件触发后应重新进入 ngZone ([#7137](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7137)) ([6835544](https://github.com/NG-ZORRO/ng-zorro-antd/commit/68355448198b31d9a064710cfc4d790739909616))
- **tree-view:** 修复 trackBy 方法在虚拟滚动场景下节点异常问题 ([#7150](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7150)) ([4484674](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4484674e212f67dea3aad8b56f27e9de61e6d21e)), closes [#7118](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7118)

### Performance Improvements

- **auto-complete:** 修复内存泄漏问题 ([#7112](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7112)) ([3806250](https://github.com/NG-ZORRO/ng-zorro-antd/commit/38062508fb7e0df13e528e1c9d5bf3720bd76200))
- **cdk:** 修复内存泄漏问题 ([#7139](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7139)) ([2a93d05](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2a93d05c48ebba1a1f6a3add74b71f4049907337))
- **checkbox:** 减少触发脏值检测 ([#7127](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7127)) ([15abe33](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15abe33053ee888e31c1ad629fd5a5ecae79db43))
- **code-editor:** 在 ngZone 外初始化提升性能 ([#7151](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7151)) ([f73be80](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f73be80ca8e55604a683827f0693455c20978214))
- **core:** 应用销毁时停止 `resize` 事件监听 ([#7125](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7125)) ([8437111](https://github.com/NG-ZORRO/ng-zorro-antd/commit/843711117a8bd7b6feb6410b4b824bd9741147a7))
- **image:** unsubscribe 过期的 src 源 ([#7102](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7102)) ([87a3e27](https://github.com/NG-ZORRO/ng-zorro-antd/commit/87a3e276fc1f1a50ecc6da9edc28dd4f77ac8482))
- **input-number:** 减少触发脏值检测 ([#7129](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7129)) ([9971faa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9971faa7d9c54db40c19fa6333dce8a65d38ccd4))
- **modal:** 鼠标事件无需触发脏值检测 ([#7169](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7169)) ([c20bb80](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c20bb8076b9d0e5e63880921cdfc738de12fc5a0))
- **modal:** 修复内存泄漏问题 ([#7123](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7123)) ([3664efe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3664efe1d6e9f5a93ed85e958652f8a898c0b987))
- **graph:** 动画执行无需触发脏值检测 ([#7132](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7132)) ([1ceaf70](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ceaf70e215ab854a94897aebbf6acb4bd5c2006))
- **rate:** `focus` 与 `blur` 事件在无监听情况下无需触发脏值检测 ([#7182](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7182)) ([3e9e035](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3e9e035d0273427f47eb4c0200930e549711d5d4))
- **steps:** 未监听 `nzIndexChange` 事件时无需触发脏值检测 ([#7183](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7183)) ([cbfc558](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cbfc558c255e7f70e2b931f751c800501474a791))
- **transfer:** checkbox 被点击无需重复触发脏值检测 ([#7124](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7124)) ([b12f43a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b12f43afe78d03687000471f164ff1f5d2631d3b))

## 13.0.0

`2021-12-29`

### 停止对 View Engine 的支持

`ng-zorro-antd@13` 不再支持 View Engine 并使用 Ivy 包进行分发，你将获得更快的打包速度和更小的包体积。

获取更多帮助请前往 [Angular Ivy](https://angular.io/guide/ivy) 查看。

### 停止对 IE11 的支持

- Angular 可以通过原生的 Web API 使用现代浏览器功能，如 CSS 变量 和 Web 动画等特性
- 移除 IE 相关的 polyfills 和代码使得应用程序更小、加载速度更快

获取更多帮助请前往 [Issue #41840](https://github.com/angular/angular/issues/41840) 查看。

### 性能增强

修复了多处可能造成内存泄漏的问题。

### BREAKING CHANGES

**dropdown**

- `[nzHasBackdrop]` 已被移除，请使用 `[nzBackdrop]` 代替。

## 历史版本

历史版本的更新记录可以在 [Github](https://github.com/NG-ZORRO/ng-zorro-antd/releases) 查看。
