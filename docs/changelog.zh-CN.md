---
order: 12
title: 更新日志
toc: false
timeline: true
---
`ng-zorro-antd` 严格遵循 [Semantic Versioning 2.0.0](https://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

* 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
* 次版本号：每月发布一个带有新特性的向下兼容的版本。
* 主版本号：含有破坏性更新和新特性，不在发布周期内。

---

## 10.1.2

`2020-11-16`

### Bug Fixes

* **i18n:** 导出缺少的语言 ([#6061](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6061)) ([6543a80](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6543a80))
* **cascader:** 修复 nzChangeOnSelect 的问题 ([#6049](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6049)) ([1575bae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1575bae)), closes [#6048](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6048)
* **code-editor:** 记录光标位置及所选区域 ([#6044](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6044)) ([84f520d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/84f520d)), closes [#6038](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6038)
* **typography:** 修复省略号在可拷贝情况下的问题 ([#6058](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6058)) ([858fff9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/858fff9)), closes [#6057](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6057)


## 10.1.1

`2020-11-09`

### Bug Fixes

* **breadcrumb:** 修复最后一项的样式 ([#5994](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5994)) ([50f0744](https://github.com/NG-ZORRO/ng-zorro-antd/commit/50f0744)), closes [#5942](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5942)
* **cascader:** 修复菜单关闭行为 ([#6023](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6023)) ([22aea7e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/22aea7e)), closes [#6022](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6022)
* **cascader:** 修复搜索框样式 ([#6030](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6030)) ([9c4424f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9c4424f)), closes [#6020](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6020)
* **select:** 修复被禁用时可以打开下拉框的问题 ([#6008](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6008)) ([79c52ea](https://github.com/NG-ZORRO/ng-zorro-antd/commit/79c52ea)), closes [#6005](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6005) [#6007](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6007)
* **tabs:** 修复垂直模式下 `nzTabBarGutter` 不生效的问题 ([#5998](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5998)) ([516bf97](https://github.com/NG-ZORRO/ng-zorro-antd/commit/516bf97)), closes [#5396](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5396)
* **tabs:** 修复 ink-bar 在某些情况下显示不正确的问题 ([#6016](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6016)) ([8af418b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8af418b)), closes [#6009](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6009) [#4802](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4802) [#3999](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3999)

## 10.1.0

`2020-10-30`


### Bug Fixes

* **form:** 修复子组件无法接收自动提示的问题 ([#5962](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5962)) ([705d6d8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/705d6d8))
* **select:** 修复搜索框在 IE11 输入不生效的问题 ([#5953](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5953)) ([5dc1ff3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5dc1ff3)), closes [#5645](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5645) [#4296](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4296)
* **select:** 修复 ESC 按键监听的问题 ([#5973](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5973)) ([d898cce](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d898cce)), closes [#5965](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5965)
* **select:** 修复 title 没有显示的问题 ([#5978](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5978)) ([fd77cd4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fd77cd4)), closes [#5281](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5281)
* **tabs:** 修复链接没有激活的问题 ([#5954](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5954)) ([5c661c5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5c661c5)), closes [#5857](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5857)
* **time-picker:** 修复 disabled 时清除按钮显示的问题 ([#5990](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5990)) ([761cf40](https://github.com/NG-ZORRO/ng-zorro-antd/commit/761cf40))
* **upload:** 修复 i18n 的问题 ([#5971](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5971)) ([b067e7e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b067e7e))


### Features

* **avatar:** 添加 avatar group 组件 ([#5916](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5916)) ([2dc8d98](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2dc8d98)), closes [#5882](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5882)
* **avatar:** 支持设置间隔 ([#5920](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5920)) ([f3f1aa9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f3f1aa9)), closes [#5883](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5883)
* **back-top:** 添加 `nzDuration` 属性 ([#5892](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5892)) ([b256461](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b256461)), closes [#5887](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5887)
* **cascader:** 支持后缀和展开图标 ([#5899](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5899)) ([d235589](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d235589)), closes [#5885](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5885)
* **date-picker:** 添加 `nzBorderless` 属性 ([#5975](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5975)) ([25e41fa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/25e41fa)), closes [#5680](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5680) [#4967](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4967)
* **descriptions:** 添加 `nzExtra` 属性 ([#5859](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5859)) ([846331e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/846331e)), closes [#5855](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5855)
* **form:** `nz-form-label` 支持 `nzFormTooltip` ([#5957](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5957)) ([4a00b69](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4a00b69)), closes [#5905](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5905)
* **form:** 支持 tooltips locale 回退 ([#5967](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5967)) ([c01e20b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c01e20b)), closes [#5917](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5917)
* **menu:** 添加 danger 样式 ([#5932](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5932)) ([5c19bbd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5c19bbd)), closes [#5881](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5881)
* **tooltip:** 添加 `nzTooltipColor` 属性 ([#5896](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5896)) ([643bd03](https://github.com/NG-ZORRO/ng-zorro-antd/commit/643bd03)), closes [#5884](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5884)
* **tooltip:** 增强自定义位置 ([#5861](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5861)) ([0fce47e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0fce47e)), closes [#5733](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5733)
* **typography:** 支持自定义图标和提示 ([#5911](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5911)) ([2d4cbb0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d4cbb0)), closes [#5888](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5888)
* **typography:** 支持 success 类型 ([#5915](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5915)) ([93c0d46](https://github.com/NG-ZORRO/ng-zorro-antd/commit/93c0d46)), closes [#5906](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5906)



## 10.0.2

`2020-10-16`

### Bug Fixes

* **code-editor:** 修复值相同会更新的问题 ([#5933](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5933)) ([d8c9b4d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d8c9b4d)), closes [#5869](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5869)
* **pagination:** 修复出现小数的问题 ([#5895](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5895)) ([69a1205](https://github.com/NG-ZORRO/ng-zorro-antd/commit/69a1205)), closes [#5668](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5668)
* **select:** 修复 0 不生效的问题 ([#5904](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5904)) ([574fdf0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/574fdf0))
* **slider:** 修复步长为小数引发的问题 ([#5862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5862)) ([dcc743a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dcc743a)), closes [#5699](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5699)
* **spin:** 修复 delay 行为，使 `nzSpinning` 仅在 false 变为 true 时生效 ([#5930](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5930)) ([5c901a0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5c901a0)), closes [#5926](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5926) [#5928](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5928)
* **tooltip:** 修复鼠标离开 overlay 时延迟不生效的问题 ([#5868](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5868)) ([6b5fdee](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b5fdee)), closes [#5713](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5713)

## 10.0.1

`2020-10-09`

### Bug Fixes

* **breadcrumb:** 修复面包屑没有返回的问题 ([#5863](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5863)) ([1e3fea2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e3fea2)), closes [#4751](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4751)
* **code-editor:** 在 zone 中执行值变更([#5872](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5872)) ([3bbed21](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3bbed21))
* **date-picker:** 修复日期禁用导致年月不可选的问题([#5804](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5804)) ([3ba0366](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3ba0366)), closes [#5633](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5633) [#3425](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3425) [#5655](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5655)
* **date-picker,time-picker:** 修复 IE11 异常打开面板的问题 ([#5841](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5841)) ([89aaa79](https://github.com/NG-ZORRO/ng-zorro-antd/commit/89aaa79)), closes [#5562](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5562)
* **modal:** 修复 `nzOnOk/nzOnCancel` rejected 时没有错误栈([#5561](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5561)) ([6a4bddd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6a4bddd)), closes [#5321](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5321)
* **upload:** 修复 card 类型的样式([#5851](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5851)) ([9fda318](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9fda318)), closes [#5850](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5850)


## 10.0.0

`2020-09-28`

### Bug Fixes

* **tree:** 修复 `nzBlockNode` 不生效的问题 ([#5507](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5507)) ([5337652](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5337652))
* **breadcrumb:** 修复懒加载时 `nzAutoGenerate` 的问题 ([#5670](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5670)) ([932d92f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/932d92f)), closes [#5613](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5613) [#5615](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5615)
* **carousel:** 修复 SSR ([#5671](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5671)) ([65b44aa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/65b44aa)), closes [#4292](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4292)
* **code-editor:** 修复懒加载时初始化事件不生效的代替 ([#5677](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5677)) ([b946742](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b946742))
* **date-picker:** 修复 week-year 格式化的问题 ([#5753](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5753)) ([4911e36](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4911e36)), closes [#5327](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5327)
* **date-picker:** 修复点击 ok 时 `nzCalendarChange` 不生效的问题 ([#5790](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5790)) ([c9426f0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c9426f0)), closes [#5782](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5782)
* **date-picker:** 修复 IE11 下自动打开的问题 ([#5643](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5643)) ([0649ceb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0649ceb)), closes [#5562](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5562)
* **date-picker:** 修复 SSR ([#5640](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5640)) ([f5899ad](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f5899ad)), closes [#5630](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5630)
* **form:** 提高鲁棒性 ([#5550](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5550)) ([fdf085b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fdf085b))
* **mention:** 修复上一个值为空时 `nzOnSearchChange` 不生效的问题 ([#5729](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5729)) ([4cc14ba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4cc14ba)), closes [#5722](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5722)
* **modal:** 回退到 FocusTrapFactory ([#5596](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5596)) ([9805620](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9805620)), closes [#5591](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5591)
* **progress:** 修复动态修改 `nzSteps` 的问题 ([#5676](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5676)) ([3eecc44](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3eecc44)), closes [#5585](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5585)
* **select:** 修复单选模式下箭头图标的问题 ([#5785](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5785)) ([bb8677c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bb8677c)), closes [#5575](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5575)
* **select:** 修复禁用时的光标异常 ([#5716](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5716)) ([0d1f027](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0d1f027)), closes [#5709](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5709)
* **select:** 输入框禁用 `COMPOSITION_BUFFER_MODE` 策略 ([#5657](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5657)) ([111721a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/111721a))
* **select:** 修复点击箭头无法打开的问题 ([#5784](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5784)) ([2d3a49c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d3a49c))
* **slider:** 修复反转模式下最大值最小值的问题 ([#5814](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5814)) ([fa46a79](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa46a79))
* **style:** 修复 antd 4.6.1 的样式同步 ([#5727](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5727)) ([b5f96ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b5f96ca))
* **table:** 修复滚动条终是显示的问题 ([#5794](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5794)) ([71be33a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/71be33a)), closes [#5405](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5405)
* **tabs:** 修复 tab-link 的点击区域 ([#5708](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5708)) ([57962e1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/57962e1)), closes [#5696](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5696)
* **tabs:** 修复下拉列表样式 ([#5659](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5659)) ([8415a70](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8415a70))
* **tabs:** 修复点击下拉列表时没有发出事件 ([#5639](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5639)) ([201ef52](https://github.com/NG-ZORRO/ng-zorro-antd/commit/201ef52))
* **tabs:** 修复 tab-link 内容投影的问题 ([#5663](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5663)) ([47050b0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/47050b0))
* **tabs:** 修复 tab-link 无法禁用的问题 ([#5759](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5759)) ([1afabd4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1afabd4)), closes [#5549](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5549) [#5543](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5543)
* **time-picker:** 修改修改 input 值不生效的问题 ([#5770](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5770)) ([31ca2da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/31ca2da)), closes [#5678](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5678) [#5741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5741) [#4934](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4934)
* **tooltip:** 启用 `cdkConnectedOverlayPush` ([#5542](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5542)) ([55ec1cd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/55ec1cd)), closes [#1825](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1825)
* **tree-select:** 修复关闭下拉时搜索值没有清空的问题 ([#5761](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5761)) ([602ea93](https://github.com/NG-ZORRO/ng-zorro-antd/commit/602ea93)), closes [#5664](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5664)
* **tree-select:** 禁用或未选择时不应该显示清除按钮 ([#5769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5769)) ([baede4a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/baede4a)), closes [#5603](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5603)


### Code Refactoring

* **anchor:** 删除 v10 下的弃用 API ([#5776](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5776)) ([e50d530](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e50d530))
* **cascader:**  删除 v10 下的弃用 API ([#5778](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5778)) ([7e64e4c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e64e4c))
* **code-editor:**  删除 v10 下的弃用 API ([#5798](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5798)) ([353e657](https://github.com/NG-ZORRO/ng-zorro-antd/commit/353e657))
* **date-picker:**  删除 v10 下的弃用 API ([#5793](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5793)) ([5159900](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5159900))
* **form,grid:**  删除 v10 下的弃用 API ([#5788](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5788)) ([b215efa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b215efa))
* **notification:**  删除 v10 下的弃用 API ([#5779](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5779)) ([e5ed4d2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5ed4d2))
* **table:**  删除 v10 下的弃用 API ([#5792](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5792)) ([132e425](https://github.com/NG-ZORRO/ng-zorro-antd/commit/132e425))
* **tooltip, popover, popconfirm:**  删除 v10 下的弃用 API ([#5817](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5817)) ([dc3088c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dc3088c))
* **tree:**  删除 v10 下的弃用 API ([#5789](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5789)) ([b378cb7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b378cb7))
* **upload:**  删除 v10 下的弃用 API ([#5774](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5774)) ([9f5baae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9f5baae))


### Features

* **modal:** `nzFooter` 添加模版引用变量支持 ([#5551](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5551)) ([07d91a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07d91a1)), closes [#5506](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5506)
* **breadcrumb:** 支持 `nzRouteLabelFn` 属性 ([#5523](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5523)) ([#5545](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5545)) ([81ef791](https://github.com/NG-ZORRO/ng-zorro-antd/commit/81ef791))
* **button:** 支持 `text` 类型 ([3f5d10b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3f5d10b))
* **card:** 支持 `nzBorderless` 属性 ([#5796](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5796)) ([6e4419c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6e4419c))
* **collapse:** 支持 `nzGhost` 属性 ([1a408ee](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1a408ee))
* **date-picker:** 支持 `open` 和 `close` 方法 ([#5777](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5777)) ([be6eda4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/be6eda4)), closes [#3352](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3352) [#5771](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5771)
* **date-picker:** 新增 week, month, year 范围选择器 ([#5832](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5832)) ([0725d88](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0725d88)), closes [#5742](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5742)
* **divider:** 支持 `nzPlain` 属性 ([d5232ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d5232ac))
* **drawer:** 支持 `nzFooter` 属性 ([#4618](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4618)) ([#5553](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5553)) ([2cd9e12](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2cd9e12))
* **drawer:** 支持 `[nzCloseIcon]` 属性 ([#5546](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5546)) ([aa984f7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aa984f7))
* **input:** 支持 `nzBorderless` 属性 ([#5781](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5781)) ([6e7877b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6e7877b))
* **pipes:** 新增 Pipes 模块 ([#4812](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4812)) ([e03e65b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e03e65b))
* **skeleton:** 新增图片类型和支持 `nzRound` 属性 ([#5710](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5710)) ([aa2ea54](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aa2ea54))
* **space:** 支持 `nzAlign` 属性 ([#5299](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5299)) ([2febb92](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2febb92))
* **table:** 支持 `nzOuterBordered` 属性 ([#5795](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5795)) ([471b0bf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/471b0bf))
* **tabs:** 支持 `(nzContextmenu)` 事件 ([#5749](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5749)) ([76931ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/76931ac)), closes [#5712](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5712)
* **tag:** 支持 icon ([#5801](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5801)) ([b909354](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b909354)), closes [#5628](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5628) [#4581](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4581)
* **tree-select:** 支持虚拟滚动 ([#5760](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5760)) ([1f2d816](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f2d816)), closes [#5589](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5589)
* **typography:** 支持 `keyboard` 和 `link` 类型 ([#5355](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5355)) ([2d6fa62](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d6fa62))


### BREAKING CHANGES

**tooltip, popover, popconfirm:**
- nz-tooltip
  * `[nzOverlayStyle]` 已经移除, 请使用 `[nzTooltipOverlayStyle]` 代替。
  * `[nzOverlayClassName]` 已经移除, 请使用 `[nzTooltipOverlayClassName]` 代替。
  * `[nzMouseLeaveDelay]` 已经移除, 请使用 `[nzTooltipMouseLeaveDelay]` 代替。
  * `[nzMouseEnterDelay]` 已经移除, 请使用 `[nzTooltipMouseEnterDelay]` 代替。
  * `(nzVisibleChange)` 已经移除, 请使用 `(nzTooltipVisibleChange)` 代替。
- nz-popover
  * `[nzOverlayStyle]` 已经移除, 请使用 `[nzPopoverOverlayStyle]` 代替。
  * `[nzOverlayClassName]` 已经移除, 请使用 `[nzPopoverOverlayClassName]` 代替。
  * `[nzMouseLeaveDelay]` 已经移除, 请使用 `[nzPopoverMouseLeaveDelay]` 代替。
  * `[nzMouseEnterDelay]` 已经移除, 请使用 `[nzPopoverMouseEnterDelay]` 代替。
  * `(nzVisibleChange)` 已经移除, 请使用 `(nzPopoverVisibleChange)` 代替。
- nz-popconfirm
  * `[nzOverlayStyle]` 已经移除, 请使用 `[nzPopconfirmOverlayStyle]` 代替。
  * `[nzOverlayClassName]` 已经移除, 请使用 `[nzPopconfirmOverlayClassName]` 代替。
  * `[nzMouseLeaveDelay]` 已经移除, 请使用 `[nzPopconfirmMouseLeaveDelay]` 代替。
  * `[nzMouseEnterDelay]` 已经移除, 请使用 `[nzPopconfirmMouseEnterDelay]` 代替。
  * `(nzVisibleChange)` 已经移除, 请使用 `(nzPopconfirmVisibleChange)` 代替。

**code-editor:**
- `NzCodeEditorService.updateDefaultOption` 已经移除, 请使用 `NzConfigService.set` 代替。
- Inject token `NZ_CODE_EDITOR_CONFIG`  已经移除, 请使用 `NZ_CONFIG` 代替。

**date-picker:**
- `NZ_DATE_FNS_COMPATIBLE` 已经移除. 请**手动**迁移到 date-fns v2。
- nz-date-picker,nz-week-picker,nz-month-picker,nz-year-picker,nz-range-picker
  * `[nzClassName]` 已经移除, 请使用 `ngClass` 代替。
  * `[nzStyle]` 已经移除, 请使用 `ngStyle` 代替。

**table:**
- `th[nzSort]` 已经移除, 请使用 `th[nzSortOrder]` 代替。
- `th(nzSortChange) 已经移除, 请使用 `th(nzSortOrderChange)` 代替。
- `th(nzSortChangeWithKey)` 已经移除, 请**手动**移除。
- `thead(nzSortChange)` 已经移除, 请使用 `thead(nzSortOrderChange)` 代替。
- `thead[nzSingleSort]` 和 `th[nzSortKey]` 已经移除, 请**手动**修改为 `th[nzSortFn]`。

**form,grid:**
- `nz-form-item[nzFlex]` 已经移除, 请**手动**移除。
- `nz-form-item[nzType]` 已经移除, 请**手动**移除。
- `nz-row[nzType]` 已经移除, 请**手动**移除。

**tree:**
- `NzTreeNode.isAllChecked` 已经移除, 请使用 `NzTreeNode.isChecked` 代替。
- `NzTreeNode.setSelected(boolean)` 已经移除, 请使用 `NzTreeNode.isSelected = boolean` 代替。

**notification:**
- `NzNotificationDataFilled` 已经移除, 请使用 `NzNotificationRef` 代替。
- `NzNotificationDataOptions.nzPosition` 已经移除, 请使用 `NzNotificationDataOptions.nzPlacement` 代替。

**anchor:**
- `nzTarget` 已经移除, 请使用 `nzContainer` 代替。

**cascader:**
- `CascaderOption` 已经移除, 请使用 `NzCascaderOption` 代替。
- `CascaderSearchOption` 已经移除, 请使用 `NzCascaderSearchOption` 代替。

**upload:**
- `UploadType` 已经移除, 请使用 `NzUploadType` 代替。
- `UploadListType` 已经移除, 请使用 `NzUploadListType` 代替。
- `UploadFile` 已经移除, 请使用 `NzUploadFile` 代替。
- `UploadChangeParam` 已经移除, 请使用 `NzUploadChangeParam` 代替。
- `ShowUploadListInterface` 已经移除, 请使用 `NzShowUploadList` 代替。
- `UploadTransformFileType` 已经移除, 请使用 `NzUploadTransformFileType` 代替。
- `UploadXHRArgs` 已经移除, 请使用 `NzUploadXHRArgs` 代替。


## 历史版本

历史版本的更新记录可以在 [Github](https://github.com/NG-ZORRO/ng-zorro-antd/releases) 查看。
