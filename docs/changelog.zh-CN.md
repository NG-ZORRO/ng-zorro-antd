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

## 9.2.1

`2020-06-17`

### Bug Fixes

* **i18n:** 修复 interface 不匹配的问题 ([#5445](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5445)) ([e9ef9f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e9ef9f3))


## 9.2.0

`2020-06-16`

### Bug Fixes

* **affix,anchor:** 修复当初始值非 `number` 导致错误值的问题 ([#5277](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5277)) ([1c72939](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1c72939))
* **tree:** 修复 `nzCheckStrictly` 和 `nzSelectedKeys` 的问题 ([#5431](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5431)) ([67d9dd0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/67d9dd0)), closes [#5385](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5385) [#5195](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5195) [#5068](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5068)
* **badge:** 修复父组件非 `onPush` 时 nzCount 不显示的问题 ([#5275](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5275)) ([d1f0321](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d1f0321))
* **button:** 修复初始 loading 状态的问题 ([#5404](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5404)) ([c764c67](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c764c67)), closes [#5392](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5392)
* **date-picker:** 修复在 modal 中箭头样式的问题 ([#5357](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5357)) ([39a6c28](https://github.com/NG-ZORRO/ng-zorro-antd/commit/39a6c28))
* **drawer:** 修复 nzMask 为 false 时阻止事件的问题 ([#5438](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5438)) ([abe9e53](https://github.com/NG-ZORRO/ng-zorro-antd/commit/abe9e53)), closes [#5350](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5350)
* **dropdown:** 修复按钮 disabled 的问题 ([#5429](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5429)) ([797c65d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/797c65d)), closes [#5258](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5258)
* **grid:** 修复 gutter 为0时的问题 ([#5436](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5436)) ([80a4709](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80a4709)), closes [#5435](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5435)
* **input:** 修复 disabled 属性丢失的问题 ([#5315](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5315)) ([2b17df2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2b17df2))
* **input:** 修复响应式表单 input-group 样式问题 ([#5428](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5428)) ([6d403e3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d403e3)), closes [#5137](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5137)
* **input:** 修复响应式表单 disabled 的问题 ([#5316](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5316)) ([8270009](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8270009))
* **menu:** 修复 ng-template 报错的问题 ([#5409](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5409)) ([d0c36d6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d0c36d6)), closes [#5363](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5363)
* **message:** 修复样式没有随属性改变的问题 ([#5323](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5323)) ([896f283](https://github.com/NG-ZORRO/ng-zorro-antd/commit/896f283)), closes [#5301](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5301)
* **modal:** 修复点击滑动条模态框关闭的问题 ([#5377](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5377)) ([e95d404](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e95d404)), closes [#5376](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5376)
* **modal:** 修复 `nzAutofocus` 的问题 ([#5313](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5313)) ([7ad64b8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7ad64b8))
* **modal:** 修复部分情况下没有检测到变化的问题 ([#5332](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5332)) ([ade6198](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ade6198)), closes [#5328](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5328) [#5287](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5287) [#5259](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5259) [#3743](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3743)
* **notification:** 修复通知模板没有更新的问题 ([#5382](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5382)) ([7217097](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7217097)), closes [#4787](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4787)
* **page-header:** 修复 compact 样式问题 ([#5241](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5241)) ([74fa3d6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/74fa3d6))
* **radio:** 修复 focus 的问题 ([#5424](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5424)) ([6e0f47b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6e0f47b)), closes [#5285](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5285)
* **select:** 修复 group 标签搜索的问题 ([#5407](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5407)) ([7e1b5a7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e1b5a7)), closes [#5276](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5276)
* **select:** 修复自动聚焦的行为 ([#5420](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5420)) ([8617e58](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8617e58)), closes [#5381](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5381)
* **select:** 修复 `nzCustomContent` 渲染的问题 ([#5425](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5425)) ([f99d7ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f99d7ff)), closes [#5178](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5178)
* **select:** 修复标签模式值错误的问题 ([#5432](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5432)) ([fe5419b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fe5419b)), closes [#5220](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5220)
* **table:** 修复 `nzRight` `nzLeft` 报 `ExpressionChangedAfterError` 错误的问题 ([#5240](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5240)) ([dc8c7e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dc8c7e7)), closes [#5238](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5238)
* **table:** 修复 colspan 以及空值的样式问题 ([#5417](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5417)) ([2eda6d3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2eda6d3)), closes [#5410](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5410)
* **table:** 修复表格滚动时 `nzWidth` 不生效的问题 ([#5437](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5437)) ([c1e7e9f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c1e7e9f)), closes [#5370](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5370) [#5324](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5324) [#5318](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5318) [#5309](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5309) [#5167](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5167) [#5160](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5160)
* **table:** 修复排序的问题 ([#5433](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5433)) ([26469c8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/26469c8)), closes [#5262](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5262)
* **table:** 修复 `nzChecked` `nzShowCheckbox` 冲突的问题 ([#5419](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5419)) ([6f5b935](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6f5b935)), closes [#5388](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5388)


### Features

* **calendar:** 支持 `nzDisabledDate` ([#5295](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5295)) ([aabd17e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aabd17e))
* **input-number:** support inputmode ([#5423](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5423)) ([cdca7bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cdca7bc)), closes [#5341](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5341)
* **select:** 支持 `nzBorderless` 全局配置 ([#5434](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5434)) ([459bdb0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/459bdb0)), closes [#5224](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5224)
* **slider:** 支持 `nzReverse` ([#5268](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5268)) ([67275d2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/67275d2)), closes [#4937](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4937)
* **table:** 支持数据泛型 ([#5369](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5369)) ([182e790](https://github.com/NG-ZORRO/ng-zorro-antd/commit/182e790))
* **typography:** 支持 `nzOnEllipsis` ([#5297](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5297)) ([2200063](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2200063))
* **upload:** 支持 `nzFileListRender` ([#5204](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5204)) ([ce5574a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ce5574a)), closes [#4875](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4875)


## 9.1.2

`2020-05-13`

### Bug Fixes

* **all:** 修复 strictTemplates 模式下类型错误的问题 ([#5265](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5265)) ([2982766](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2982766)), closes [#5171](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5171)
* **list:** 修复空内容渲染的问题 ([#5266](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5266)) ([ca7314c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca7314c)), closes [#5260](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5260)
* **select:** 修复 tags 模式下选中 `0` 值的样式问题 ([#5264](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5264)) ([1c4d7d8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1c4d7d8))


## 9.1.1

`2020-05-11`

### Bug Fixes

* **auto-complete,drawer:**  修复在复用快照路由策略下无法重新打开的问题 ([#5165](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5165)) ([7101782](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7101782)), closes [#5142](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5142)
* **alert:** 修复 `nzNoAnimation` 无效的问题 ([#5211](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5211)) ([de9ef6b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/de9ef6b))
* **breadcrumb:** 修复路由 `path=''` 情况下的问题 ([#4966](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4966)) ([5ffa45c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5ffa45c))
* **button:** 修复锚点标签 `disabled` 的问题 ([#5233](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5233)) ([36ab993](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36ab993)), closes [#5226](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5226)
* **dropdown:** 修复无法服务器渲染的问题 ([#5244](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5244)) ([016cca1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/016cca1)), closes [#5186](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5186)
* **modal:** 修复服务模式下全剧配置不生效的问题 ([#5228](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5228)) ([95aab9a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/95aab9a)), closes [#5223](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5223)
* **modal:** 修复宿主视图销毁后无法关闭的问题 ([#5161](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5161)) ([5cb618e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5cb618e)), closes [#5128](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5128)
* **modal:** 修复 confirm 模式下无法使用组件作为 content 的问题 ([#5177](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5177)) ([5fa4c1e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5fa4c1e)), closes [#5172](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5172)
* **schematics:** 修复当包存在时 `ng add` 会添加无效的版本号的问题 ([#5210](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5210)) ([f406803](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f406803)), closes [#5209](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5209)
* **table:** 修复多表头下展开的问题 ([#5246](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5246)) ([cbaeb38](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cbaeb38)), closes [#5207](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5207)
* **timeline:** 修复脏值检查的问题 ([#5245](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5245)) ([ee2859f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee2859f)), closes [#5230](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5230)
* **typography:** 修复省略行计算错误的问题 ([#5175](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5175)) ([93676c9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/93676c9))
* **upload:** 修复无法正确显示预览图的问题 ([#5205](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5205)) ([cbe8225](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cbe8225)), closes [#5201](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5201)

## 9.1.0

`2020-04-26`


### Features

* **date-picker, time-picker:** 支持自定义后缀图标 ([#5072](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5072)) ([8b660bd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8b660bd))
* **autocomplete:** 支持对象类型数据 ([#4996](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4996)) ([4bfbbf7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4bfbbf7)), closes [#4981](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4981)
* **select:** 支持全局配置 nzSuffixIcon ([#5092](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5092)) ([ad847e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad847e7))
* **select:** 支持将 nzOptions 作为输入项传入 ([#5109](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5109)) ([251a064](https://github.com/NG-ZORRO/ng-zorro-antd/commit/251a064)), closes [#5106](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5106)
* **select:** 支持 option 高度及滚动设置 ([#5133](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5133)) ([7b3937e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7b3937e)), closes [#5112](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5112)


### Bug Fixes

* **auto-complete:** 修复 input-group 中的位置 ([#5157](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5157)) ([5b26479](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5b26479))
* **cascader:** 修复下拉位置边界检测问题 ([#5148](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5148)) ([7870e67](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7870e67)), closes [#5102](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5102)
* **date-picker:** 修复 form disabled 不生效问题 ([#5126](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5126)) ([b83e7b5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b83e7b5)), closes [#5118](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5118)
* **date-picker,time-picker:** 修复点击展开下拉问题 ([#5105](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5105)) ([7c938b4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c938b4)), closes [#5073](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5073)
* **description:** 修复 nzTitle 不接收 TemplateRef ([#5139](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5139)) ([90d2ec5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/90d2ec5)), closes [#5127](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5127)
* **form:** 修复 tips 改变时数据未更新问题 ([#5144](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5144)) ([a08d4da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a08d4da)), closes [#5129](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5129)
* **menu:** 修复 nzMatchRouter 不生效问题 ([#5095](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5095)) ([2724b9b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2724b9b))
* **menu:** 修复 submenu 滚动问题 ([#5155](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5155)) ([fb52f21](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb52f21)), closes [#4837](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4837)
* **message:** 修复 remove 调用边界情况 ([#5123](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5123)) ([1eca795](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1eca795)), closes [#5121](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5121)
* **modal:** 修复 `NoopAnimations` 在 modal 中的延时问题 ([#5103](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5103)) ([d7625db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d7625db)), closes [#5093](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5093)
* **notification:** 修复全局 nzPlacement 不生效 ([#5140](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5140)) ([1ce1634](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ce1634)), closes [#5135](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5135)
* **progress:** 修复 nzFormat 在 exception 不生效问题 ([#5136](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5136)) ([654411e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/654411e)), closes [#5130](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5130)
* **select:** 修复 ie11 下输入无效问题 ([#5117](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5117)) ([83cdc84](https://github.com/NG-ZORRO/ng-zorro-antd/commit/83cdc84)), closes [#5110](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5110)
* **select:** 修复悬浮在 option 时自动滚动问题 ([#5131](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5131)) ([d69415a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d69415a)), closes [#5120](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5120) [#5116](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5116)
* **space:** 修复配置名称 ([#5147](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5147)) ([64f772d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/64f772d))
* **table:** 移除 nzQueryParams debounceTime 时间 ([#5132](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5132)) ([07a9d34](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07a9d34)), closes [#5113](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5113)
* **time-picker:** 允许输入值为 undefined 或 null ([#5104](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5104)) ([d0b40ce](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d0b40ce)), closes [#5100](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5100)
* **tooltip:** 修复 nzTitle 在 null 之间切换未生效问题 ([#5097](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5097)) ([1123281](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1123281)), closes [#5087](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5087)
* 修复 ivy 关闭时的渲染问题 ([#5090](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5090)) ([b61a914](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b61a914)), closes [#5088](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5088)

## 9.0.2

`2020-04-20`

### Bug Fixes

* **all:** 修复 enableIvy:false 时的问题 ([#5081](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5081)) ([83b554e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/83b554e)), closes [#5070](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5070)
* **button:** 修复 button 类型定义问题 ([#5085](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5085)) ([62584de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/62584de)), closes [#5026](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5026)
* **form:** 修复 form 在特定情况下的数据流报错 ([#4524](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4524)) ([565b530](https://github.com/NG-ZORRO/ng-zorro-antd/commit/565b530)), closes [#4554](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4554)
* **input:** 修复 input group 在 focus disabled 时的样式 ([#5082](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5082)) ([5ff38be](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5ff38be)), closes [#5064](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5064)
* **popover:** 修复 popover 不能关闭的问题 ([#5053](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5053)) ([dbc2cd3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dbc2cd3))
* **select:** 修复 nzDropdownMatchSelectWidth 不生效的问题 ([#5066](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5066)) ([d210f4d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d210f4d)), closes [#5058](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5058)
* **select:** 修复 option 内容超长时的样式问题 ([#5057](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5057)) ([867dc87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/867dc87)), closes [#5047](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5047)
* **select:** 修复 group option 顺序不对问题 ([#5063](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5063)) ([af39d5f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af39d5f))
* **build:** 修复 ngcc 时报错问题 ([#5055](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5055)) ([7bc8279](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7bc8279)), closes [#5045](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5045)


## 9.0.0

`2020-04-15`

### 版本介绍

欢迎来到 `ng-zorro-antd` 的 `9.0.0` 版本，升级到最新版本之后，开发者不仅可以享受到最新版本 Angular 的支持，还可以获得最新特性和更好的性能。

ng-zorro-antd 的部分 API 在 8.x 版本进入弃用状态，并且在开发环境中给出了警告提醒，所有之前弃用 API 在 9.0.0 不再支持，如果你之前已经根据告警信息修改了对应组件的使用方式，那么 9.0.0 版本升级不会有任何障碍，请按照以下步骤进行。

#### 开始升级之前

1. 首先确保你 `Node.js` >= `10.13`
2. 创建新的分支，或者使用其他方式备份当前项目
3. 删除项目下 package-lock.json 文件

#### 升级相关依赖

- 升级 Angular 主版本号至 9.0.0 版本，可以参考 https://update.angular.io/
- 如果你有单独使用 `@angular/cdk` 请执行 `ng update @angular/cdk`
- 如果你有单独使用 `date-fns` 请先升级到 `2.x`，[升级指南](https://github.com/date-fns/date-fns-upgrade)
- 如果你有使用 `monaco-editor` 请先升级到 `0.2.x`, 使用 `monaco-editor-webpack-plugin` 时请将其升级到 `1.9.x`

#### 升级 NG-ZORRO

- 运行 `ng update ng-zorro-antd`
- 如果控制台出现警告消息请按提示修改对应代码

#### date-fns 升级指南

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

### 新版本特性

#### 支持 Angular Ivy

我们已经将 `@angular/*` 和 `@angular/cdk` 版本升级到 `v9`，现在你可以使用 Ivy 渲染引擎运行你的项目，并且开启 `strictTemplates` 选项使用更严格的的模版类型检查。

获取更多帮助请前往 [Angular Ivy](https://angular.io/guide/ivy) 和 [Template type](https://angular.io/guide/template-typecheck) 查看。

#### Ant Design 4 设计规范

我们已经同步了 Ant Design 4 设计规范，并且添加了暗黑(Dark)和紧凑(Compact) 主题支持。

#### 性能和易用性增强

- 在之前的版本中 Table 组件已经集成了虚拟滚动，现在 Select 和  Tree 也同样支持；
- Form 和 Table 简化了使用方式，现在可以编写更少的模版和配置；
- 允许在子模块中添加图标，以减少首屏加载时间；
- 现在当路由改变时弹出菜单将自动关闭，同时为 Modal 等组件添加了对应选项；

### Features

* **breadcrumb:** 支持独立 separator ([#4713](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4713)) ([1f490e9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f490e9))
* **collapse:** 支持 nzExpandIconPosition ([#4781](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4781)) ([760512a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/760* 512a))
* **grid:** 支持 nzFlex 与 nzGutter 数组输入 ([c4d2694](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c4d2694))*
* **icon:** 支持在 feature module 中导入 icons ([#4711](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4711)) ([* 0bcd2a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0bcd2a9))
* **input:** 支持 textarea 带 clear 图标的效果 ([0af9242](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0af9242)), closes [#4623](https://github.com/NG-ZORRO/ng-zorro-antd/issues/* 4623)
* **page-header:** 增加 `nzGhost` 选项 ([#4306](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4306)) ([4c78cca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c78cca)), closes [#43* 03](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4303)
* **select:** select 支持 virutal scroll 模式 ([40daee9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/40daee9)), closes [#4585](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4585) [#3497](https://github.com/NG-ZORRO/ng-zorro-antd/issues/* 3497)
* **skeleton:** 增加 nz-skeleton-element ([#4859](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4859)) ([8dc2ff3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8dc2ff3))*
* **space:** 添加新组件 ([#4928](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4928)) ([df01bd1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/df01bd1)), closes [#4913](h* ttps://github.com/NG-ZORRO/ng-zorro-antd/issues/4913)
* **table:** 支持 `nzQueryParams` ([#4970](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4970)) ([79ea999](https://github.com/NG-ZORRO/ng-zorro-antd/commit/79ea999))*
* **tabs:** 增加了 nzCanDeactivate 钩子 ([#4476](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4476)) ([a533980](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a533* 980)), closes [#4432](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4432)
* **tag:** 增加 status colors 选项 ([#4628](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4628)) ([aa22c0f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aa22c0f)), closes [#4622](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4622) [#44* 13](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4413)
* **tree:** 支持虚拟滚动 ([#4979](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4979)) ([6803a92](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6803a92)), closes [#4426](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4426) [#3808](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3808) [#3436](ht* tps://github.com/NG-ZORRO/ng-zorro-antd/issues/3436) [#2680](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2680) [#1771](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1771)
* **tree-select:** 支持 `nzDropdownClassName` 选项 ([#4552](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4552)) ([df8c125](https://github.com/NG-ZORRO/ng-zorro-antd/commit/df8c125)), closes [#4508](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4508)*
* **typography:** 支持 `nzSuffix` 选项 ([#4629](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4629)) ([ca02a07](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca02a07)), closes [#4620](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4620)*
* **form:**
    - 支持自动错误提示 ([#4888](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4888)) ([0b85483](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0b85483)), closes [#4523](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4523)
    - 当 FormControl.status 为 `INVALID` 并且错误包含 `{warning：true}` 时，`nz-form-control` 显示警告状态。([#4891](https://github.com/NG-ZORRO/ng-zorro-antd/pull/4891))([b187* 3da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b1873da)) , close [#4525](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4525)
* **code-editor:**
    - 支持静态导入 ([#4341](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4341)) ([29f732b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/29f732b))
    - 更新到 `monaco@0.20.0` 的类型 ([#4984](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4984)) ([3963ad1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3963ad1))
* **date-picker:**
    - 支持更多的 inputs ([#4843](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4843)) ([af4051e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af4051e))
    - 支持对 input 数据的解析 ([#4833](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4833)) ([6a523ba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6a523ba)), closes [#4028](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4028) [#3976](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3976) [#2492](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2492) [#4101](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4101)
* **i18n:**
    - 支持 Armenian 语言 ([#4611](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4611)) ([038691f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/038691f))
    - 支持 Georgian 语言 ([#4491](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4491)) ([d96ebe0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d96ebe0))
* **input-number:**
    - 支持 nzPrecisionMode 模式 ([#4185](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4185)) ([bfe089f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bfe089f)), closes [#4173](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4173)
    - 支持 ngModelChange 在输入时立即触发 ([#4769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4769)) ([299ba6d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/299ba6d)), closes [#3039](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3039) [#3773](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3773)
* **menu:**
    - 当 sider 收起时，自动触发 nzInlineCollapsed模式 ([51fbf5e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/51fbf5e)), closes [#4680](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4680)
    - 支持 nzMatchRouter 与 CanDeactivate 配合工作 ([7560563](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7560563)), closes [#4407](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4407)
* **notification:**
    - 添加 `onClick` 可观察对象 ([#4989](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4989)) ([9224240](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9224240)), closes [#4986](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4986)
    - 支持 close icon 选项 ([#4495](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4495)) ([80a0b26](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80a0b26)), closes [#4494](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4494)
* **pagination:**
    - nzItemRender 支持 prev_5 与 next_5 图标定制 ([#4754](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4754)) ([41c4860](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41c4860))
    - 支持响应式 size ([#4863](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4863)) ([1bb01b5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1bb01b5))
* **progress:**
    - 支持 steps 模式 ([#4637](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4637)) ([fe8b469](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fe8b469)), closes [#4635](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4635)
    -  支持 nzFormat 传入 TemplateRef ([#4598](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4598)) ([edf0e9c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/edf0e9c)), closes [#4596](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4596)
* **tooltip:**
    - 支持改变 trigger 位置 ([#4397](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4397)) ([48d7122](https://github.com/NG-ZORRO/ng-zorro-antd/commit/48d7122)), closes [#4365](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4365)
    - tooltip,etc 支持自定义源元素 ([#4849](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4849)) ([863fd4b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/863fd4b))



### Bug Fixes

* **mention:**  修复移动端选择问题 ([#4309](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4309)) ([1be6d51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1be6d51)), closes [#4281](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4281)
* **menu:**  修复在屏幕越界时的显示问题 ([4c8032b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c8032b)), closes [#3412](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3412) [#4227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4227* ) [#3687](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3687)
* **message:**  修复 prod 下 message 与 notification 的问题 ([#4884](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4884)) ([3e2f85d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3e2f85d))*
* **page-header:**  修复 `location` 注入问题 ([#5013](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5013)) ([9073fa5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9073fa5)), closes [#4945* ](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4945)
* **pagination:**  修复半角字符问题 ([#4371](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4371)) ([cc3868e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc3868e))*
* **transfer:** 修复 nzTargetKeys 无效问题 ([#4670](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4670)) ([31089a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3* 1089a1)), closes [#4641](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4641) [#4360](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4360) [#4210](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4210)
* **empty:** 修复 Empty 在 dark 模式下的显示问题 ([#4924](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4924)) ([bae59d7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bae59d7)), closes [#4921](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4921)*
* **grid:**  修复响应式的问题 ([#4906](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4906)) ([d6828ed](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d6828ed))*
* **list:**  修复头像部分的兼容 API ([#4952](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4952)) ([d8a2594](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d8a* 2594)), closes [#4912](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4912)
* **badge:**  允许将 `nzTitle` 设置为 `null` ([#4965](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4965)) ([a35fb5e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a35fb5e)), closes [#4776](https://github.com/NG-ZORRO/ng-zorro-antd/is* sues/4776)
* **breadcrumb:**  修复面包屑显示问题 ([#4880](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4880)) ([2553328](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2553328))*
* **button:**  修复 transition 显示问题 ([9e0df2a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9e0df2a)), closes [#2697](https://github.com/NG-ZORRO/ng-zorro-antd/iss* ues/2697)
* **cascader:**  修复无选项时的显示问题 ([#4565](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4565)) ([9d8d7e6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9d8d7e6)), closes*  [#4562](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4562)
* **slider:**  修复垂直模式下拖拽句柄样式问题 ([#4939](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4939)) ([6fba78d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6fba78d))*
* **timeline:** 修复 reverse 下的展示问题 ([#4690](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4690)) ([09bf8f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/09bf8f4)),*  closes [#4509](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4509)
* **auto-complete:**
    - 修复滚动条拖拽时自动关闭问题 ([#4551](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4551)) ([387ebc1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/387ebc1)), closes [#4333](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4333)
    - 修复默认值显示问题 ([#4366](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4366)) ([09f1ec6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/09f1ec6)), closes [#4362](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4362)
* **code-editor:**
    - 修复配置选项 ([#4436](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4436)) ([5283a32](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5283a32))
    - 修复 diff 模式下的问题 ([#4485](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4485)) ([#4532](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4532)) ([021cf22](https://github.com/NG-ZORRO/ng-zorro-antd/commit/021cf22))
* **date-picker:**
    - 修复 nzDefaultOpenValue 无效问题 ([#4357](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4357)) ([dfa3d39](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dfa3d39)), closes [#4331](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4331)
    - 修复点击日期切换面板时 年/月 选择器不同步切换的问题 ([#4876](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4876)) ([3aebe7c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3aebe7c)), closes [#3499](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3499)
    - 修复展开动画效果 ([#4315](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4315)) ([931fd48](https://github.com/NG-ZORRO/ng-zorro-antd/commit/931fd48))
* **drawer:**
    - 修复 overflow 样式问题 ([#4423](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4423)) ([9451de5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9451de5)), closes [#4354](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4354)
    - 修复位置变化时的动画问题 ([#4609](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4609)) ([e539096](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e539096)), closes [#4224](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4224)
    - 修复 header 结构样式问题 ([#4311](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4311)) ([5cdd5db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5cdd5db)), closes [#4304](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4304)
* **dropdown:**
    - 修复 contextmenu 多重打开问题 ([39487f1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/39487f1)), closes [#3971](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3971) [#4684](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4684)
    - 修复 menu group 在 dropdown 样式问题你 ([d928a8c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d928a8c)), closes [#4505](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4505)
* **layout:**
    - 修复 layout 高度问题 ([bed60ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bed60ff)), closes [#4676](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4676)
    - 修复 responsive 无效问题 ([9f951f8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9f951f8))
* **modal:**
    - 修复在初始化为打开状态时 `nzModalFooter` 指令不生效的问题 ([#4954](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4954)) ([2f400e8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2f400e8)), closes [#4948](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4948)
    -  修复关闭按钮样式 ([#5014](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5014)) ([174099e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/174099e))
    -  修复 `nzMaskClosable` 在 confirm 模式下不工作的问题  ([#4347](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4347)) ([475bbc4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/475bbc4)), closes [#4344](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4344)
* **select:**
    - 修复 hidden 的选项可以被选中的问题 ([#4382](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4382)) ([cf22133](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cf22133)), closes [#4377](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4377) [#4377](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4377)
    - 修复空状态的问题 ([#4907](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4907)) ([f295c10](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f295c10))
* **table:**
    - 修复 `nzFilters` 为 null 时的报错  ([#4595](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4595)) ([2c26e9f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2c26e9f))
    - 修复 Table 导出的 data 数据类型问题 ([#4608](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4608)) ([70b1440](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70b1440)), closes [#4593](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4593)
    - 修复 Table nzWidth 的问题 ([#4329](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4329)) ([c6bdf15](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c6bdf15)), closes [#4312](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4312)
    - 修复 `antd@4.1.0` 样式问题  ([#4953](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4953)) ([44f606c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/44f606c))
    - 修复无数据时的问题 ([#4947](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4947)) ([7f7989e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7f7989e))
    - 修复 nzTotal 在非前端分页时的问题 ([#4922](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4922)) ([9ddc060](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9ddc060)), closes [#4919](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4919)
* **time-picker:**
    - 修复输入ISO字符串的问题 ([#4949](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4949)) ([3b45a22](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3b45a22)), closes [#4775](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4775) [#4777](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4777) [#4871](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4871) [#1679](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1679)
    - 修复 `ngModelChange` 失效的问题 ([#4944](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4944)) ([a6ecdb9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6ecdb9))
    - 修复在 `datepicker` 滚动错误的问题 ([#4961](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4961)) ([cdf387f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cdf387f))
* **tooltip:**
    - 修复 hover popover 时时隐藏的问题 ([#4418](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4418)) ([a6b5901](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6b5901)), closes [#4417](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4417)
    - 修复 undefined 不生效的问题 ([#4392](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4392)) ([2a71c43](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2a71c43))
    - 修复 tooltip 销毁时报错的问题 ([#4387](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4387)) ([8e9e6a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8e9e6a9)), closes [#3875](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3875) [#4317](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4317) [#4386](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4386)
* **tree:**
    - 修复输入区分大小写的问题 ([#4766](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4766)) ([828b13e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/828b13e)), closes [#1996](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1996) [#4765](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4765)
    - 修复动画 ([#4973](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4973)) ([70b2fc3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70b2fc3))
* **tree-select:**
    - 修复点击 label 在 strict 模式下的问题 ([#4424](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4424)) ([7a11124](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7a11124)), closes [#4422](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4422)
    - 修复 tags 在 strict 模式下的问题 ([#4368](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4368)) ([a6547a0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6547a0)), closes [#4364](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4364)

### Performance Improvements

* **checkbox:** 使用 css empty selector 代替了 observeContent ([#4761](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4761)) ([da8821a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/da8821a))
* **input:** 提升 input 性能 ([7af643b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7af643b)), closes [#3950](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3950)*
* **radio:** 重构了数据流 ([#4770](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4770)) ([423a382](https://github.com/NG-ZORRO/ng-zorro-antd/commit/423a382))*

## BREAKING CHANGES

注意： 所有不兼容改动均在 8.x 最新版本中给出了 warning，如果你在 8.x 最新版本中修复了所有 warning，9.x 可以直接升级的。

* **calendar:**
  - `<nz-calendar>` `nzCard` 被移除了, 请使用 `nzFullscreen` 代替。
* **carousel:**
  - `nzVertical` 被移除，请使用 'nzDotPosition' 代替。
* **empty:**
  - `NZ_DEFAULT_EMPTY_CONTENT` 被移除，请使用 `NzConfigService` 代替。
* **form:**
  - `nz-form-extra` 被移除，请使用  `nz-form-control` 中的  `nzExtra` 代替。
  - `nz-form-explain` 被移除，请使用  `nz-form-control`  中的 `nzSuccessTip | nzWarningTip | nzErrorTip | nzValidatingTip` 代替。
* **icon:**
  - `i[nz-icon]`:  `twoToneColor` `theme` `spin` `iconfont` `type` 输入被移除, 请使用 `nzTwoToneColor` `nzTheme` `nzSpin` `nzIconfont` `nzType` 代替。
  - `i.anticon` 被移除, 请使用 `i[nz-icon]` 代替。
  - `NZ_ICON_DEFAULT_TWOTONE_COLOR` 被移除， 请使用 `NzConfigService`。
* **input-number:**
  - ngModelChange 会在用户输入时立刻触发
* **message,notification:**
  - `NZ_MESSAGE_CONFIG` 被移除，请使用 `NzConfigService` 代替。
  - `NZ_NOTIFICATION_CONFIG` 被移除，请使用 `NzConfigService` 代替。
  - `config` method of `NzMessageService` and `NzNotificationService` 被移除，请使用 `set` method of `NzConfigService` 代替。
  - 用 `NzMessageRef` 替换 `NzMessageDataFilled`
  - 用 `NzNotificationRef` 替换 `NzNotificationDataFilled`
* **pagination:**
  - 当定制 nzItemRender 时，需要考虑 prev_5 and next_5
  - 'pre' 被修改为 'prev'
* **tree, tree-select:**
  - 移除了 `[nzDefaultExpandAll]` 请使用 `[nzExpandAll]` 代替。
  - 移除了 `[nzDefaultExpandedKeys]` 请使用 `[nzExpandedKeys]` 代替。
  - 移除了 `[nzDefaultSelectedKeys]` 请使用 `[nzSelectedKeys]` 代替。
  - 移除了 `[nzDefaultCheckedKeys]` 请使用 `[nzCheckedKeys]` 代替。
  - 移除了 `(nzOnSearchNode)` 请使用 `(nzSearchValueChange)` 代替。
* **tooltip,popover,popconfirm:**
  - `<nz-tooltip>` `<nz-popover>` `<nz-popconfirm>` 组件被移除, 请使用对应的 directives 代替。
* **移除 API:** `NgZorroAntdModule.forRoot()`

---

## 9.0.0 之前版本

9.0.0 之前版本的更新记录可以在 [Github](https://github.com/NG-ZORRO/ng-zorro-antd/releases) 查看。
