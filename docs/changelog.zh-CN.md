---
order: 12
title: 更新日志
toc: false
timeline: true
---
`ng-zorro-antd` 严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

* 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
* 次版本号：每月发布一个带有新特性的向下兼容的版本。
* 主版本号：含有破坏性更新和新特性，不在发布周期内。

---


## 9.0.0-beta.4
`2020-04-14`

### Bug Fixes

* **slider:** 修复垂直模式下拖拽句柄样式问题 ([#4939](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4939)) ([6fba78d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6fba78d))
* **badge:** 允许将 `nzTitle` 设置为 `null` ([#4965](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4965)) ([a35fb5e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a35fb5e)), closes [#4776](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4776)
* **date-picker:** 修复点击日期切换面板时 年/月 选择器不同步切换的问题 ([#4876](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4876)) ([3aebe7c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3aebe7c)), closes [#3499](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3499)
* **list:** 修复头像部分的兼容 API ([#4952](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4952)) ([d8a2594](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d8a2594)), closes [#4912](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4912)
* **modal:** 修复在初始化为打开状态时 `nzModalFooter` 指令不生效的问题 ([#4954](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4954)) ([2f400e8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2f400e8)), closes [#4948](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4948)
* **modal:** 修复关闭按钮样式 ([#5014](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5014)) ([174099e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/174099e))
* **page-header:** 修复 `location` 注入问题 ([#5013](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5013)) ([9073fa5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9073fa5)), closes [#4945](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4945)
* **table:** 修复 `antd@4.1.0` 样式问题  ([#4953](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4953)) ([44f606c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/44f606c))
* **table:** 修复无数据时的问题 ([#4947](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4947)) ([7f7989e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7f7989e))
* **time-picker:** 修复输入ISO字符串的问题 ([#4949](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4949)) ([3b45a22](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3b45a22)), closes [#4775](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4775) [#4777](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4777) [#4871](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4871) [#1679](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1679)
* **time-picker:** 修复 `ngModelChange` 失效的问题 ([#4944](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4944)) ([a6ecdb9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6ecdb9))
* **time-picker:** 修复在 `datepicker` 滚动错误的问题 ([#4961](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4961)) ([cdf387f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cdf387f))
* **tree:** 修复输入区分大小写的问题 ([#4766](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4766)) ([828b13e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/828b13e)), closes [#1996](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1996) [#4765](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4765)
* **tree:** 修复动画 ([#4973](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4973)) ([70b2fc3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70b2fc3))


### Features

* **code-editor:** 更新到 `monaco@0.20.0` 的类型 ([#4984](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4984)) ([3963ad1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3963ad1))
* **notification:** 添加 `onClick` 可观察对象 ([#4989](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4989)) ([9224240](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9224240)), closes [#4986](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4986)
* **space:** 添加新组件 ([#4928](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4928)) ([df01bd1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/df01bd1)), closes [#4913](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4913)
* **table:** 支持 `nzQueryParams` ([#4970](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4970)) ([79ea999](https://github.com/NG-ZORRO/ng-zorro-antd/commit/79ea999))
* **tooltip,etc:** 支持自定义源元素 ([#4849](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4849)) ([863fd4b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/863fd4b))
* **tree:** 支持虚拟滚动 ([#4979](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4979)) ([6803a92](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6803a92)), closes [#4426](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4426) [#3808](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3808) [#3436](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3436) [#2680](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2680) [#1771](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1771)
* 支持紧凑主题 ([#4972](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4972)) ([2cf34d0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2cf34d0))


### BREAKING CHANGES

* **notification:**
  - 用 `NzMessageRef` 替换 `NzMessageDataFilled`
  - 用 `NzNotificationRef` 替换 `NzNotificationDataFilled`

## 9.0.0-beta.3
`2020-03-24`

### Bug Fixes

* **empty:** 修复 Empty 在 dark 模式下的显示问题 ([#4924](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4924)) ([bae59d7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bae59d7)), closes [#4921](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4921)
* **table:** 修复 nzTotal 在非前端分页时的问题 ([#4922](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4922)) ([9ddc060](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9ddc060)), closes [#4919](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4919)


### Features

* **pagination:** 支持响应式 size ([#4863](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4863)) ([1bb01b5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1bb01b5))



## 9.0.0-beta.2
`2020-03-20`

### Bug Fixes

* **grid:** 修复响应式的问题 ([#4906](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4906)) ([d6828ed](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d6828ed))
* **select:** 修复空状态的问题 ([#4907](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4907)) ([f295c10](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f295c10))


## 9.0.0-beta.1

`2020-03-15`

### 版本介绍

请注意，目前版本仍然是 beta 版本，不建议在生产环境中使用，如果使用中碰到任何问题，欢迎给我们提 issue。

欢迎来到 `ng-zorro-antd` 的 `9.0.0-beta.1` 版本，升级到最新版本之后，开发者不仅可以享受到最新版本 Angular 的支持，还可以获得最新特性和更好的性能。

ng-zorro-antd 的部分 API 在 8.x 版本进入弃用状态，并且在开发环境中给出了警告提醒，所有之前弃用 API 在 9.0.0 不再支持，如果你之前已经根据告警信息修改了对应组件的使用方式，那么 9.0.0 版本升级不会有任何障碍，请按照以下步骤进行。

1. 升级 Angular 主版本号至 9.0.0 版本，可以参考 https://update.angular.io/
2. 手动升级 ng-zorro-antd 至 最新版本，我们将会在 9.0.0 正式版中提供官方自动 ng update 工具。
3. 在 9.0.0 之后 ng-zorro-antd 使用了 date-fns 的 2.x 版本，我们提供了组件内部的输入格式兼容工具。

#### date-fns 升级

当你切换至 `date-fns` 时，一些日期格式会有 breaking change。比如：

```html
<!-- datefns v1 -->
<nz-date-picker nzFormat="YYYY-MM-DD"></nz-date-picker>

<!-- datefns v2 -->
<nz-date-picker nzFormat="yyyy-MM-dd"></nz-date-picker>
```

**我们推荐使用 `date-fns` v2 的日期格式**。如果你不想使用新日期格式，你可以用 `NZ_DATE_FNS_COMPATIBLE` ，当设置为 `true` 时，`ng-zorro-antd` 会把 v1 的格式转为 v2，新旧格式的对比看[这里](https://github.com/date-fns/date-fns/blob/master/CHANGELOG.md#200---2019-08-20)。

```js
providers: [
  { provide: NZ_DATE_FNS_COMPATIBLE, useValue: true }
]
```

**但 `NZ_DATE_FNS_COMPATIBLE` 不会保留太久，到 `ng-zorro-antd` v10 将会移除对 `date-fns` v1 日期格式的支持**，希望你能及时更新 `date-fns` 日期格式。关于 `date-fns` 升级指南看[这里](https://github.com/date-fns/date-fns)，如果业务中使用了 date-fns，可以参考 date-fns [官方兼容工具](https://github.com/date-fns/date-fns-upgrade) 查看。


### Bug Fixes

* **auto-complete:** 修复滚动条拖拽时自动关闭问题 ([#4551](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4551)) ([387ebc1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/387ebc1)), closes [#4333](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4333)
* **auto-complete:** 修复默认值显示问题 ([#4366](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4366)) ([09f1ec6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/09f1ec6)), closes [#4362](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4362)
* **breadcrumb:** 修复面包屑显示问题 ([#4880](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4880)) ([2553328](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2553328))
* **button:** 修复 transition 显示问题 ([9e0df2a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9e0df2a)), closes [#2697](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2697)
* **cascader:** 修复无选项时的显示问题 ([#4565](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4565)) ([9d8d7e6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9d8d7e6)), closes [#4562](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4562)
* **code-editor:** 修复配置选项 ([#4436](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4436)) ([5283a32](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5283a32))
* **date-picker:** 修复 nzDefaultOpenValue 无效问题 ([#4357](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4357)) ([dfa3d39](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dfa3d39)), closes [#4331](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4331)
* **date-picker:** 修复展开动画效果 ([#4315](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4315)) ([931fd48](https://github.com/NG-ZORRO/ng-zorro-antd/commit/931fd48))
* **drawer:** 修复 overflow 样式问题 ([#4423](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4423)) ([9451de5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9451de5)), closes [#4354](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4354)
* **drawer:** 修复位置变化时的动画问题 ([#4609](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4609)) ([e539096](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e539096)), closes [#4224](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4224)
* **drawer:** 修复 header 结构样式问题 ([#4311](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4311)) ([5cdd5db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5cdd5db)), closes [#4304](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4304)
* **dropdown:** 修复 contextmenu 多重打开问题 ([39487f1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/39487f1)), closes [#3971](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3971) [#4684](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4684)
* **dropdown:** 修复 menu group 在 dropdown 样式问题你 ([d928a8c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d928a8c)), closes [#4505](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4505)
* **layout:** 修复 layout 高度问题 ([bed60ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bed60ff)), closes [#4676](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4676)
* **layout:** 修复 responsive 无效问题 ([9f951f8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9f951f8))
* **mention:** 修复移动端选择问题 ([#4309](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4309)) ([1be6d51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1be6d51)), closes [#4281](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4281)
* **menu:** 修复在屏幕越界时的显示问题 ([4c8032b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c8032b)), closes [#3412](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3412) [#4227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4227) [#3687](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3687)
* **message:** 修复 prod 下 message 与 notification 的问题 ([#4884](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4884)) ([3e2f85d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3e2f85d))
* **modal:** 修复 `nzMaskClosable` 在 confirm 模式下不工作的问题  ([#4347](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4347)) ([475bbc4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/475bbc4)), closes [#4344](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4344)
* **pagination:** 修复半角字符问题 ([#4371](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4371)) ([cc3868e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc3868e))
* **select:** 修复 hidden 的选项可以被选中的问题 ([#4382](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4382)) ([cf22133](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cf22133)), closes [#4377](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4377) [#4377](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4377)
* **table:** 修复 `nzFilters` 为 null 时的报错  ([#4595](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4595)) ([2c26e9f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2c26e9f))
* **table:** 修复 Table 导出的 data 数据类型问题 ([#4608](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4608)) ([70b1440](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70b1440)), closes [#4593](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4593)
* **table:** 修复 Table nzWidth 的问题 ([#4329](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4329)) ([c6bdf15](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c6bdf15)), closes [#4312](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4312)
* **timeline:** 修复 reverse 下的展示问题 ([#4690](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4690)) ([09bf8f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/09bf8f4)), closes [#4509](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4509)
* **transfer:** 修复 nzTargetKeys 无效问题 ([#4670](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4670)) ([31089a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/31089a1)), closes [#4641](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4641) [#4360](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4360) [#4210](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4210)
* **tooltip:** 修复 hover popover 时时隐藏的问题 ([#4418](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4418)) ([a6b5901](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6b5901)), closes [#4417](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4417)
* **tooltip:** 修复 undefined 不生效的问题 ([#4392](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4392)) ([2a71c43](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2a71c43))
* **tooltip:** 修复 tooltip 销毁时报错的问题 ([#4387](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4387)) ([8e9e6a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8e9e6a9)), closes [#3875](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3875) [#4317](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4317) [#4386](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4386)
* **tree-select:** 修复点击 label 在 strict 模式下的问题 ([#4424](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4424)) ([7a11124](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7a11124)), closes [#4422](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4422)
* **tree-select:** 修复 tags 在 strict 模式下的问题 ([#4368](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4368)) ([a6547a0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6547a0)), closes [#4364](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4364)
* **code-editor:** 修复 diff 模式下的问题 ([#4485](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4485)) ([#4532](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4532)) ([021cf22](https://github.com/NG-ZORRO/ng-zorro-antd/commit/021cf22))

### Features

* **breadcrumb:** 支持独立 separator ([#4713](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4713)) ([1f490e9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f490e9))
* **collapse:** 支持 nzExpandIconPosition ([#4781](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4781)) ([760512a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/760512a))
* **date-picker:** 支持更多的 inputs ([#4843](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4843)) ([af4051e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af4051e))
* **date-picker:** 支持对 input 数据的解析 ([#4833](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4833)) ([6a523ba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6a523ba)), closes [#4028](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4028) [#3976](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3976) [#2492](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2492) [#4101](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4101)
* **grid:** 支持 nzFlex 与 nzGutter 数组输入 ([c4d2694](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c4d2694))
* **i18n:** 支持 Armenian 语言 ([#4611](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4611)) ([038691f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/038691f))
* **i18n:** 支持 Georgian 语言 ([#4491](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4491)) ([d96ebe0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d96ebe0))
* **icon:** 支持在 feature module 中导入 icons ([#4711](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4711)) ([0bcd2a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0bcd2a9))
* **input:** 支持 textarea 带 clear 图标的效果 ([0af9242](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0af9242)), closes [#4623](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4623)
* **input-number:** 支持 nzPrecisionMode 模式 ([#4185](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4185)) ([bfe089f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bfe089f)), closes [#4173](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4173)
* **input-number:** 支持 ngModelChange 在输入时立即触发 ([#4769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4769)) ([299ba6d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/299ba6d)), closes [#3039](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3039) [#3773](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3773)
* **menu:** 当 sider 收起时，自动触发 nzInlineCollapsed模式 ([51fbf5e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/51fbf5e)), closes [#4680](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4680)
* **menu:** 支持 nzMatchRouter 与 CanDeactivate 配合工作 ([7560563](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7560563)), closes [#4407](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4407)
* **code-editor:** 支持静态导入 ([#4341](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4341)) ([29f732b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/29f732b))
* **notification:** 支持 close icon 选项 ([#4495](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4495)) ([80a0b26](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80a0b26)), closes [#4494](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4494)
* **page-header:** 增加 `nzGhost` 选项 ([#4306](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4306)) ([4c78cca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c78cca)), closes [#4303](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4303)
* **pagination:** nzItemRender 支持 prev_5 与 next_5 图标定制 ([#4754](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4754)) ([41c4860](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41c4860))
* **progress:** 支持 steps 模式 ([#4637](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4637)) ([fe8b469](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fe8b469)), closes [#4635](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4635)
* **progress:** 支持 nzFormat 传入 TemplateRef ([#4598](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4598)) ([edf0e9c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/edf0e9c)), closes [#4596](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4596)
* **select:** select 支持 virutal scroll 模式 ([40daee9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/40daee9)), closes [#4585](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4585) [#3497](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3497)
* **skeleton:** 增加 nz-skeleton-element ([#4859](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4859)) ([8dc2ff3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8dc2ff3))
* **tabs:** 增加了 nzCanDeactivate 钩子 ([#4476](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4476)) ([a533980](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a533980)), closes [#4432](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4432)
* **tag:** 增加 status colors 选项 ([#4628](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4628)) ([aa22c0f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aa22c0f)), closes [#4622](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4622) [#4413](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4413)
* **tooltip:** 支持改变 trigger 位置 ([#4397](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4397)) ([48d7122](https://github.com/NG-ZORRO/ng-zorro-antd/commit/48d7122)), closes [#4365](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4365)
* **tree-select:** 支持 `nzDropdownClassName` 选项 ([#4552](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4552)) ([df8c125](https://github.com/NG-ZORRO/ng-zorro-antd/commit/df8c125)), closes [#4508](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4508)
* **typography:** 支持 `nzSuffix` 选项 ([#4629](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4629)) ([ca02a07](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca02a07)), closes [#4620](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4620)

### Performance Improvements

* **checkbox:** 使用 css empty selector 代替了 observeContent ([#4761](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4761)) ([da8821a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/da8821a))
* **input:** 提升 input 性能 ([7af643b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7af643b)), closes [#3950](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3950)
* **radio:** 重构了数据流 ([#4770](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4770)) ([423a382](https://github.com/NG-ZORRO/ng-zorro-antd/commit/423a382))


### BREAKING CHANGES

注意： 所有不兼容改动均在 8.x 最新版本中给出了 warning，如果你在 8.x 最新版本中修复了所有 warning，9.x 可以直接升级的，`ng update` 工具在 9.0 正式版会提供。

* **form:**
  - `nz-form-extra` 被移除，请使用 `nzExtra` 中的 `nz-form-control` 代替。
  - `nz-form-explain` 被移除，请使用 `nzSuccessTip | nzWarningTip | nzErrorTip | nzValidatingTip` 中的 `nz-form-control` 代替。
* **input-number:**
  - ngModelChange 会在用户输入时立刻触发
* **pagination:**
  - 当定制 nzItemRender 时，需要考虑 prev_5 and next_5
  - 'pre' 被修改为 'prev'
* **tree, tree-select:** * tree
  - 移除了 `[nzDefaultExpandAll]` 请使用 `[nzExpandAll]` 代替。
  - 移除了 `[nzDefaultExpandedKeys]` 请使用 `[nzExpandedKeys]` 代替。
  - 移除了 `[nzDefaultSelectedKeys]` 请使用 `[nzSelectedKeys]` 代替。
  - 移除了 `[nzDefaultCheckedKeys]` 请使用 `[nzCheckedKeys]` 代替。
  - 移除了 `(nzOnSearchNode)` 请使用 `(nzSearchValueChange)` 代替。
* **tree-select**
  - 移除了 `[nzDefaultExpandedKeys]` 请使用 `[nzExpandedKeys]` 代替。
* **message,notification:**
  - `NZ_MESSAGE_CONFIG` 被移除，请使用 `NzGlobalConfigService` 代替。
  - `NZ_NOTIFICATION_CONFIG` 被移除，请使用 `NzGlobalConfigService` 代替。
  - `config` method of `NzMessageService` and `NzNotificationService` 被移除，请使用 `set` method of `NzGlobalConfigService` 代替。
* **empty:**
  - `NZ_DEFAULT_EMPTY_CONTENT` 被移除，请使用 `NzConfigService` 代替。
* **carousel:** Carousel
  - `nzVertical` 被移除，请使用 'nzDotPosition' 代替。
* **icon:**
  - `i[nz-icon]`:  `twoToneColor` `theme` `spin` `iconfont` `type` 输入被移除, 请使用 `nzTwoToneColor` `nzTheme` `nzSpin` `nzIconfont` `nzType` 代替。
  - `i.anticon` 被移除, 请使用 `i[nz-icon]` 代替。
  - `NZ_ICON_DEFAULT_TWOTONE_COLOR` 被移除， 请使用 `NzGlobalConfigService`。
* **calendar:**
  - `<nz-calendar>` `nzCard` 被移除了, 请使用 `nzFullscreen` 代替。
* **tooltip,popover,popconfirm:**
  -`<nz-tooltip>` `<nz-popover>` `<nz-popconfirm>` 组件被移除, 请使用对应的 directives 代替。
* 移除了无用的 API `NgZorroAntdModule.forRoot()`

---

## 9.0.0 之前版本

9.0.0 之前版本的更新记录可以在 [Github](https://github.com/NG-ZORRO/ng-zorro-antd/releases) 查看。
