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


## 8.3.0
`2019-09-09`

### Bug Fixes

* **cascader:** 支持假值, 除了 `null` / `undefined`) ([#4119](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4119)) ([0cb44ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0cb44ac)), closes [#4110](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4110)
* **editor:** 修复 `any` 类型 ([#4105](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4105)) ([bd720fb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bd720fb)), closes [#4099](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4099)
* **i18n:** 修复繁体中文国际化与类型定义 ([#4102](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4102)) ([bb9e89f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bb9e89f)), closes [#4080](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4080)
* **i18n:** 修复俄罗斯国际化 ([f267bdd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f267bdd))
* **i18n:** 修复加泰罗尼亚国际化 ([#4116](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4116)) ([c530c74](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c530c74))
* **tabs:** 修复选中索引未更新的问题 ([#4094](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4094)) ([1e76e37](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e76e37)), closes [#3873](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3873)


### Features

* ***:** 支持全局配置 ([#3613](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3613)) ([6eb041a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6eb041a))
* **i18n:** 添加罗马尼亚国际化 ([#4068](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4068)) ([207e178](https://github.com/NG-ZORRO/ng-zorro-antd/commit/207e178))
* **modal:** 支持自定义关闭标签 ([#4072](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4072)) ([06b895e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/06b895e))
* **progress:** 支持 `nzTooltipPlacement` 属性 ([#4007](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4007)) ([d6a2968](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d6a2968))
* **steps:** 支持 `navigation` 类型添加 `nzDisable` `nzSubtitle` ([#4064](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4064)) ([272dc98](https://github.com/NG-ZORRO/ng-zorro-antd/commit/272dc98)), closes [#3931](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3931)


### Performance Improvements

* **resizable:** 当 resize 开始时再监听 document 事件 ([#4021](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4021)) ([66afcf0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/66afcf0))


## 8.2.1
`2019-08-26`

### Bug Fixes

* **cascader:** 修复鼠标移动未正确隐藏子节点问题 ([#3916](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3916)) ([906849b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/906849b))
* **code-editor:** 修复编辑器未初始化状态下执行销毁事件错误问题 ([#4002](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4002)) ([a35fb09](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a35fb09))
* **code-editor:** 修复 css overflow 问题 ([#4016](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4016)) ([ab832d9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ab832d9))
* **descriptions:** 修复水平带边框模式下单元格计算问题 ([#4014](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4014)) ([345712f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/345712f))
* **table:** 修复迷你类型表格右边框样式问题 ([#4027](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4027)) ([a3bd531](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a3bd531))
* **tabs:** 修复 tabs 无路由匹配状态错误显示问题 ([#4034](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4034)) ([7ca0a52](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7ca0a52))


## 8.2.0
`2019-08-13`

### Bug Fixes

* **badge:** 修复初始动画问题 ([#3925](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3925)) ([353c95b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/353c95b)), closes [#3686](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3686)
* **date-picker:** 修复点击日期后时间重置的问题 ([#3911](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3911)) ([9499aec](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9499aec))
* **date-picker:** 修复展开后的焦点问题 ([#3804](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3804)) ([3f03ee1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3f03ee1)), closes [#3146](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3146)
* **date-picker:** 修复日期范围顺序问题 ([#3956](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3956)) ([117b453](https://github.com/NG-ZORRO/ng-zorro-antd/commit/117b453)), closes [#3940](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3940) [#1642](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1642)
* **message:** 修复 HMR 下的问题 ([#3859](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3859)) ([07e86a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07e86a5))
* **table:** 修复 nzWidthConfig 在 nzTemplateMode 的问题 ([#3958](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3958)) ([baab74b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/baab74b)), closes [#3957](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3957)
* **tooltip:** 修复 tooltip 的问题 ([#3993](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3993)) ([a853e96](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a853e96)), closes [#3909](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3909)


### Features

* **avatar:** 支持 image 加载错误事件 ([#3893](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3893)) ([ab4bcbe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ab4bcbe)), closes [#3223](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3223)
* **badge:** 支持 nzTitle 与 nzOffset 属性 ([#3977](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3977)) ([ffb7219](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ffb7219))
* **code-editor:** 增加 code editor 组件 ([#3706](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3706)) ([df78b2e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/df78b2e))
* **descriptions:** 增加 nzColon 属性 ([#3923](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3923)) ([8e95cb1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8e95cb1))
* **drawer:** 增加 `nzKeyboard` 属性 ([#3896](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3896)) ([38062fb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/38062fb))
* **i18n:** 支持 Malay 和 Tamil 语言 ([#3924](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3924)) ([b87f1fe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b87f1fe))
* **page-header:** 增加返回按钮的默认行为 ([#3891](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3891)) ([41bc285](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41bc285)), closes [#3421](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3421)
* **resizable:** 增加 resizable 组件 ([#3771](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3771)) ([5e71739](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5e71739)), closes [#3701](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3701)
* **statistics:** 支持结束事件 ([#3902](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3902)) ([9ea40da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9ea40da))
* **steps:** 支持点击事件 ([#3934](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3934)) ([ac866ce](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ac866ce))
* **tabs:** 增加路由 exact active 属性 ([#3862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3862)) ([6b13faf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b13faf)), closes [#3858](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3858)
* **timeline:** 增加 gray 颜色配置 ([#3922](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3922)) ([f889f34](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f889f34))
* **schematics:**  ng add 识别用户初始化配置样式方案 ([#3930](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3930)) ([84b0355](https://github.com/NG-ZORRO/ng-zorro-antd/commit/84b0355))



## 8.1.2
`2019-07-29`

### Bug Fixes

* **slider:** 修复水平模式样式问题 ([#3879](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3879)) ([e6a6221](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e6a6221)), closes [#3876](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3876)
* **tree-select:** 节点不可选时不应该关闭面板 ([#3843](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3843)) ([329ec22](https://github.com/NG-ZORRO/ng-zorro-antd/commit/329ec22)), closes [#3833](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3833)
* **schematics:** 修复模版文件后缀的问题 ([#3884](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3884)) ([5b4714f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5b4714f))


## 8.1.1
`2019-07-29`

### Bug Fixes
* **all:** 在组件中使用 platform 时导入 PlatformModule ([#3823](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3823)) ([6ec85a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6ec85a4))
* **dropdown:** 禁用时隐藏背景并还原 Escape ([#3831](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3831)) ([b758572](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b758572)), closes [#3835](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3835)
* **form:** 使用提示初始化时修复表单错误 ([#3868](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3868)) ([7c0aa51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c0aa51)), closes [#3865](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3865)
* **select:** 修复自动分词模式的 bug ([#3869](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3869)) ([fa462c7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa462c7)), closes [#3825](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3825)
* **table:** 修复表格 nzSize='small' 时的样式错误 ([#3849](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3849)) ([c4de8ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c4de8ff))
* **tabs:** 修复在滚动时分页的 padding-right 问题 ([#3539](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3539)) ([#3709](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3709)) ([9a4df38](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9a4df38))
* **tooltip:** 修复位置重设问题 ([#3857](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3857)) ([3dbb6dc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3dbb6dc))
* **schematics:** 修复解析模块名称错误 ([#3848](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3848)) ([d4e7210](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d4e7210)), closes [#3844](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3844)
* **schematics:** 更新 copy-resources 以支持 Windows 路径 ([#3856](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3856)) ([915b67d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/915b67d))


## 8.1.0
`2019-07-19`

### Bug Fixes

* **date-picker:** 修复缺失 12 小时制问题 ([#3781](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3781)) ([feae069](https://github.com/NG-ZORRO/ng-zorro-antd/commit/feae069))
* **descriptions:** 修复子元素属性时不渲染的问题 ([#3798](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3798)) ([3c65697](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c65697)), closes [#3795](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3795)
* **descriptions:** 修复响应式计算方法 ([#3799](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3799)) ([aaa5852](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aaa5852))
* **message:** 修复在懒加载模块中的问题 ([#3797](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3797)) ([679fdea](https://github.com/NG-ZORRO/ng-zorro-antd/commit/679fdea)), closes [#3794](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3794)
* **modal:** 修复 confirm 模式下按钮无法禁用的问题 ([#3707](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3707)) ([3847250](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3847250)), closes [#3679](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3679)
* **page-header:** 修复 page-header 的样式 ([#3803](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3803)) ([39d1f45](https://github.com/NG-ZORRO/ng-zorro-antd/commit/39d1f45))
* **select:** 修复选中项目太长时的显示问题 ([#3802](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3802)) ([4dd93e6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4dd93e6)), closes [#3710](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3710)
* **table:** 修复固定表头的样式问题 ([#3806](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3806)) ([0677540](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0677540))
* **table:** 修复滚动条的问题 ([#3801](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3801)) ([7e00e52](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e00e52)), closes [#3796](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3796)
* **tree:** 修复节点消失的问题 ([#3748](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3748)) ([1ff176e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ff176e)), closes [#3739](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3739)


### Features

* **dropdown:** 允许禁用遮罩层 ([#3769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3769)) ([cb51069](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb51069))
* **i18n:** 增加多种语言支持 ([#3818](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3818)) ([7eac09e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7eac09e))
* **modal:** 支持使用指令自定义页脚 ([#3036](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3036)) ([f022a0f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f022a0f)), closes [#3035](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3035)
* **result:** 增加全新组件 ([#3731](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3731)) ([eb6377e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb6377e)), closes [#2759](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2759)
* **tabs:** 支持路由联动模式 ([#3718](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3718)) ([ab8a58c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ab8a58c))
* **tree-select:** 支持 `[nzHideUnMatched]` 属性 ([#3729](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3729)) ([3a3b33a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3a3b33a)), closes [#3527](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3527)


## 8.0.3
`2019-07-14`

### Bug Fixes

* **dropdown:** 修复关闭右键菜单的问题 ([#3782](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3782)) ([cce920d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cce920d)), closes [#3768](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3768)
* **input:** 修复 OnPush 模式下 disabled 失效的问题 ([#3786](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3786)) ([dd81155](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dd81155)), closes [#3732](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3732)
* **menu:** 修复 nzMatchRouter 在嵌套菜单中的问题 ([#3785](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3785)) ([eb5d544](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb5d544)), closes [#3736](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3736)
* **switch:** 修复 ViewChild ([#3784](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3784)) ([f59d79f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f59d79f)), closes [#3760](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3760)
* **table:** 修复自定义 filter panel 的问题 ([#3787](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3787)) ([b9a7267](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b9a7267)), closes [#3721](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3721)


## 8.0.2
`2019-07-03`

修复依赖的版本范围。

## 8.0.1
`2019-07-01`

### Bug Fixes

* **tree:** 修复错误的 Warning ([#3692](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3692)) ([637c334](https://github.com/NG-ZORRO/ng-zorro-antd/commit/637c334))
* **breadcrumb:** 修复 rxjs 的引用错误 ([fe28a0d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fe28a0d))
* **schematics:** 修复生成 sidemenu 模板时缺少的 routing 模块 ([#3695](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3695)) ([fdcef82](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fdcef82))


## 8.0.0
`2019-06-29`

### 版本介绍

欢迎来到 `ng-zorro-antd` 的 8.0.0 版本，升级到最新版本之后，开发者不仅可以享受到最新版本 Angular 的支持，还可以获得最新特性和更好的性能。

在升级之前请首先升级 Angular 至 8.0.0 以上版本，`ng-zorro-antd` 的部分 API 在 8.0.0 版本进入弃用状态，所有弃用 API 在 9.0.0 之前仍然会的得到支持，这意味着 8.0.0 版本 与 7.0.0 版本是 **完全兼容** 的。开发者可以在开发环境下获得弃用 API 的详细提示（生产环境下提示不会出现），并在 9.0.0 发布之前有充足的时间修正这些用法。

* 新增 Typography 组件，该组件提供了文本的基本格式及常见操作。

* `ng add ng-zorro-antd` 时新增模板选项，可以更方便的初始化项目，更多信息可以在[脚手架](https://ng.ant.design/docs/schematics/zh)部分查看。

* 对 Form 表单进行了全面增强，新版本只需要直接传入错误提示内容即可工作。

```html
<nz-form-control nzErrorTip="Please input your username!">
  <nz-input-group [nzPrefix]="prefixUser">
    <input formControlName="userName" nz-input placeholder="Username" />
  </nz-input-group>
</nz-form-control>

```

* Dropdown 不再需要 Component 包裹 Directive 的写法，避免 Component 的 selector 对于 样式的影响。

```html
<a nz-dropdown [nzDropdownMenu]="menu">Hover me</a>
<nz-dropdown-menu #menu="nzDropdownMenu">
  <ul nz-menu>
    <li nz-menu-item>1st menu item</li>
    <li nz-menu-item>2nd menu item</li>
    <li nz-menu-item>3rd menu item</li>
  </ul>
</nz-dropdown-menu>
```

* Menu 增加自动根据路由高亮的功能。

```html
<ul nz-menu nzMode="horizontal">
  <li nz-menu-item nzMatchRouter>
    <a [routerLink]="['/', 'welcome']">Welcome</a>
  </li>
</ul>
```

### 升级 Angular 版本

推荐根据 [Angular Update Guide](https://update.angular.io/#7.0:8.0) 提示进行升级，以下几个问题可能需要额外注意：

* `ViewChild` 与 `ContentChild` 用法发生了变化，参照 [Static Query Migration Guide](https://angular.io/guide/static-query-migration) 部分进行更新。
* 路由懒加载使用方式发生了变化，参照 [loadChildren string synatx](https://angular.io/guide/deprecations#loadchildren-string-syntax) 部分进行更新。
* 最新版本支持差异加载技术，可以显著降低打包体积，参照 [Differential Loading](https://angular.io/guide/deployment#differential-loading) 部分进行更新。

### Features

* **avatar:** 增加 nzSrcSet nzAlt 属性 ([#3583](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3583)) ([d0ad5e8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d0ad5e8)), closes [#3543](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3543)
* **breadcrumb:** 支持在 breadcrumb 中加入 dropdown ([#3636](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3636)) ([9dfab45](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9dfab45))
* **carousel:** 支持修改 dot 位置 ([#3575](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3575)) ([0566331](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0566331))
* **form:** 支持直接传入错误信息 ([10d0e28](https://github.com/NG-ZORRO/ng-zorro-antd/commit/10d0e28))
* **input-number:** 支持 nzId 属性 ([a6500c8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6500c8))
* **menu:** 支持按照 routerLink 自动激活状态 ([c9e84c7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c9e84c7))
* **menu:** 支持直接传入 nzTitle & nzIcon ([0cde4d7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0cde4d7))
* **pagination:** 支持 nzDisabled 状态 ([141bef8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/141bef8))
* **select:** 支持自定义展示 template ([#3071](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3071)) ([aad02a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aad02a5)), closes [#2946](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2946)
* **table:** 支持 nzVirtualForTrackBy 属性 ([cb14096](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb14096))
* **transfer:** 增加 nzShowSelectAll & nzRenderList 属性 ([#3588](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3588)) ([1619f30](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1619f30)), closes [#3567](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3567) [#2870](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2870)
* **typography:** 增加 typography 组件 ([#3119](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3119)) ([4d739ef](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4d739ef))
* **schematics:** 在 `ng-add` 支持新建模板 ([#3674](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3674)) ([69072de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/69072de))

### Bug Fixes

* **button:** 修复 button 初始化 icon 顺序问题 ([#3578](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3578)) ([c3df8b5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c3df8b5)), closes [#3079](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3079)
* **descriptions:** 修复 warning 问题 ([#3663](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3663)) ([5826fc1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5826fc1))
* **dropdown:** 当 disabled 时关闭 dropdown ([0bd1ae3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0bd1ae3)), closes [#3420](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3420)
* **form:** 修复 formControl 下的校验问题 ([bc54e90](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc54e90)), closes [#3551](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3551)
* **form:** 修复 form 中 nz-input-group 图标重叠问题 ([#3633](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3633)) ([0fc7d05](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0fc7d05)), closes [#3607](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3607)
* **grid:** 修复 typescript 定义 ([#3473](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3473)) ([107e731](https://github.com/NG-ZORRO/ng-zorro-antd/commit/107e731))
* **input:** 修复 nzAddOnBeforeIcon 动态切换时的问题 ([#3597](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3597)) ([a37ec0a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a37ec0a)), closes [#3596](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3596)
* **mention:** 修复 trigger 切换时的问题 ([#3632](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3632)) ([c8b5b09](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c8b5b09)), closes [#3629](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3629)
* **menu:** 修复 title 改变导致的 ExpressionChangedAfterItHasBeenCheckedError ([52975ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/52975ff)), closes [#3023](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3023)
* **menu:** 修复 submenu 在 collapsed 时激活状态的问题 ([67f6fa2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/67f6fa2)), closes [#3345](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3345)
* **pagination:** 修复 pagination 在 nzTotal 为 0 下的显示问题 ([#3651](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3651)) ([d28fc49](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d28fc49)), closes [#3648](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3648)
* **select:** 修复在 nzOnSearch 触发时 nzOpen 状态问题 ([3ca816d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3ca816d)), closes [#3626](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3626)
* **select:** 修复在 disabled 状态下回车可以打开 select 的问题 ([36db36c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36db36c)), closes [#3408](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3408)
* **select:** 修复在 chrome 49 下中文输入法引发的问题 ([#3440](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3440)) ([3c82f26](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c82f26)), closes [#3439](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3439)
* **table:** 修复与 @angular/material/table 的兼容问题 ([79b02ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/79b02ca))
* **table:** 修复与 table 边框状态下固定列样式问题 ([31e674d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/31e674d))
* **table:** 修复在列数动态调整下 sortChange 触发逻辑问题 ([#3603](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3603)) ([#3605](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3605)) ([c85743d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c85743d))

---

## 8.0.0 之前版本

8.0.0 之前版本的更新记录可以在 [Github](https://github.com/NG-ZORRO/ng-zorro-antd/releases) 查看。
