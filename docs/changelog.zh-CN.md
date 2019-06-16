---
order: 11
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
## 7.5.0
`2019-06-05`

### Bug Fixes

* **cascader:** 修复使用 nzLoadData 后无法未更新值问题 ([#3481](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3481)) ([7c0e30c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c0e30c)), closes [#3480](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3480)
* **date-picker:** 使用 formatDate 方法替换 DatePipe ([#3500](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3500)) ([19ad7fd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/19ad7fd)), closes [#3487](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3487)
* **layout:** 修复宽度支持类型 ([#3525](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3525)) ([fd803bd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fd803bd))
* **select:** 修复 tags 模式对象显示错误问题 ([#3442](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3442)) ([a05f5a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a05f5a5)), closes [#3424](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3424)


### Features

* **button:** 支持 link 类型 ([#3503](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3503)) ([050f141](https://github.com/NG-ZORRO/ng-zorro-antd/commit/050f141)), closes [#3479](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3479)
* **carousel:** 支持自定义过渡策略 ([#3501](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3501)) ([a53a43a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a53a43a))
* **descriptions:** 新增描述列表组件 ([#3327](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3327)) ([11bf89e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/11bf89e)), closes [#2847](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2847)
* **drawer:** 支持 ESC 关闭 ([#3488](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3488)) ([2928f84](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2928f84))
* **dropdown:** 支持自定义 icon ([#3517](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3517)) ([4329b51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4329b51))

## 7.4.1
`2019-05-21`

### Bug Fixes

* **build:** 修复引入二级模块的打包问题 ([#3266](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3266))

## 7.4.0
`2019-05-19`

### Bug Fixes

* **breadcrumb:** 修复路由事件监听问题 ([#3185](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3185)) ([fd43ec5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fd43ec5)), closes [#3186](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3186)
* **carousel:** 修复集成问题 ([#3367](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3367)) ([9d495fc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9d495fc))
* **cascader,checkbox,switch,tooltip:** 修复内存泄漏问题 ([#3416](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3416)) ([c63849f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c63849f))
* **drawer:** 修复 z-index ([#3405](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3405)) ([663f6c1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/663f6c1)), closes [#3402](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3402)
* **menu:** 修复子菜单高亮显示问题 ([#3455](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3455)) ([fd47605](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fd47605))
* **modal:** 修复 esc 不能按顺序关闭模态框 ([#3339](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3339)) ([0533c32](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0533c32)), closes [#3338](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3338)
* **modal:** 修复确认框模式下 `nzContent` 为组件不生效的问题 ([#3415](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3415)) ([6458c57](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6458c57)), closes [#3407](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3407)
* **modal:** 修复在模态框外释放鼠标意外关闭的问题 ([#3400](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3400)) ([82e488a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/82e488a)), closes [#3394](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3394)
* **progress:** 修复 `nzStrokeColor` 设置无效的问题 ([#3445](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3445)) ([80c6ed4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80c6ed4)), closes [#3441](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3441)
* **tree,tree-select:** 修复连接线样式 ([#3385](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3385)) ([f7e9a7c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f7e9a7c)), closes [#3382](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3382)


### Features

* **card:** 支持 `nzSize` 选项 ([#3429](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3429)) ([2015021](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2015021))
* **drawer:** 支持调用服务下的 `nzOnCancel` 选项 ([#3376](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3376)) ([3742eda](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3742eda)), closes [#3372](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3372)
* **tree-select:** 支持自定义图标 ([#3395](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3395)) ([0deda73](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0deda73))

## 7.3.3
`2019-04-25`

### Bug Fixes

* **auto-complete:** 打开面板时应该阻止 <kbd>Enter</kbd> ([#3342](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3342)) ([414b428](https://github.com/NG-ZORRO/ng-zorro-antd/commit/414b428)), closes [#3340](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3340)
* **radio, tab:** 修复内存泄露的问题 ([#3354](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3354)) ([7d18fef](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7d18fef))
* **table:** 修复过滤器位置和虚拟滚动样式问题 ([#3365](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3365)) ([6435ee5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6435ee5)), closes [#3357](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3357) [#3348](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3348) [#3359](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3359)
* **tree-select:** 添加缺少的公有方法 ([#3335](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3335)) ([ee6d18b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee6d18b))

## 7.3.2
`2019-04-22`

### Bug Fixes

* **build:** 修复 components.less 的打包错误 ([#3331](https://github.com/NG-ZORRO/ng-zorro-antd/pull/3331)) ([fb19921](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb19921))

## 7.3.1
`2019-04-22`

### Bug Fixes

* **tree:** 修复数据渲染问题 ([#3326](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3326)) ([6d759a8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d759a8)), closes [#3320](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3320)
* **select:** 修复 nzShowSearch 时搜索无效的问题 ([#3324](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3324)) ([d91af03](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d91af03)), closes [#3322](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3322)

## 7.3.0
`2019-04-21`

### Features

* 支持服务端渲染 ([#3295](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3295)) ([2088459](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2088459)), closes [#3222](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3222) [#43](https://github.com/NG-ZORRO/ng-zorro-antd/issues/43) [#2025](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2025) [#2474](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2474)
* 支持子模块单独使用 ([#3234](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3234))
* **modal:** 支持 `nzMask` 与 `nzMaskClosable` 全局配置 ([#3033](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3033)) ([12cac9e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/12cac9e))
* **tree:** 支持 nzBlockNode 选项 ([#3270](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3270)) ([5129f73](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5129f73))
* **date-picker:** `nzRanges` 支持回调函数 ([#3304](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3304)) ([a231cb5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a231cb5)), closes [#1629](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1629)
* **date-picker:** 支持 `nzOnCalendarChange` 功能 ([#3169](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3169)) ([4446005](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4446005))
* **form:** 支持隐藏 label 的冒号 ([#3136](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3136)) ([663169f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/663169f))
* **table:** 导出 CdkVirtualScrollViewport ([#3297](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3297)) ([a942312](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a942312)), closes [#3144](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3144) [#3073](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3073) [#2886](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2886)
* **table:** 支持 `nzLoadingIndicator` 配置 ([#3299](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3299)) ([1f339b3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f339b3)), closes [#3008](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3008)
* **time-picker:** 支持 12-hour 制 `nzUse12Hours` ([#3127](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3127)) ([7c52774](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c52774))
* **tree, tree-select:** 支持定制 icons ([#2933](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2933)) ([a77f6c9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a77f6c9))
* **schematics:** 增强 component 生成器 ([#3265](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3265)) ([c22eae5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c22eae5))

### Bug Fixes

* **anchor:** 修复 scrollbar 的问题 ([#3242](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3242)) ([37ac541](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37ac541))
* **drawer:** 修复 `nzVisible` 默认值为 true 的问题 ([#3203](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3203)) ([327ceca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/327ceca)), closes [#3200](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3200)
* **dropdown:** 修复展开时超出边界的问题 ([#3289](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3289)) ([47f0aef](https://github.com/NG-ZORRO/ng-zorro-antd/commit/47f0aef)), closes [#3288](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3288)
* **dropdown:** 修复与 material design 的样式冲突 ([#3290](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3290)) ([e30a9be](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e30a9be)), closes [#3241](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3241)
* **dropdown:** 修复 ul 的样式问题 ([#3284](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3284)) ([2845b57](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2845b57)), closes [#3268](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3268)
* **form:** 修复模板驱动时 form 表单自动校验的问题 ([#3305](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3305)) ([032d193](https://github.com/NG-ZORRO/ng-zorro-antd/commit/032d193)), closes [#3211](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3211)
* **i18n:** 修复 catalan 语言包 ([#3080](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3080)) ([81f917a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/81f917a)), closes [#2569](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2569)
* **input-number:** 修复 blur 事件不能正确获得校验数值的问题 ([#3315](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3315)) ([ee3d94c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee3d94c)), closes [#3134](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3134)
* **modal:** 修复 modal 收起时的闪烁问题 ([#3245](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3245)) ([3da4b68](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3da4b68)), closes [#3213](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3213)
* **select:** 修复 disable 状态下的样式问题 ([#3287](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3287)) ([f5528d9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f5528d9)), closes [#3246](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3246)
* **select:** 修复当 option 值发生改变时 select 未响应的问题 ([#3313](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3313)) ([74d996b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/74d996b)), closes [#3029](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3029)
* **select:** 修复 scroll 事件多次触发的问题 ([#3285](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3285)) ([1478e59](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1478e59)), closes [#3258](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3258)
* **steps:** 修复 steps 动态更新问题  ([#3194](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3194)) ([8198b23](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8198b23)), closes [#3193](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3193)
* **table:** 修复 firefox 等浏览器下边框显示问题 ([#3294](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3294)) ([82407e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/82407e7)), closes [#3164](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3164)
* **tree:** 修复重复导入问题 ([#3286](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3286)) ([5c8b923](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5c8b923))
* **tree, tree-select:** 修复 key 校验的问题 ([#3247](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3247)) ([87f2386](https://github.com/NG-ZORRO/ng-zorro-antd/commit/87f2386)), closes [#3163](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3163)
* **upload:** 移除部分 icon 旧版本用法 ([#3230](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3230)) ([bc4e7da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc4e7da)), closes [#3228](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3228)
* **rate** 修复 click 事件问题 ([#3262](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3262)) ([2b4bde4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2b4bde4)), closes [#3252](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3252)
* **style** 修复部分样式未导出问题 ([#3317](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3317)) ([5b02e48](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5b02e48))

## 7.2.0
`2019-03-27`

### Bug Fixes

* **affix:** 触发元素大小调整后重新设置 `Affix` 大小 ([#3089](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3089)) ([ff482e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ff482e0)), closes [#3040](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3040)
* 修复一些 TS 类型定义 ([#3166](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3166)) ([c685836](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c685836))
* **breadcrumb:** 修复模块懒加载情况下根据路由自动生成的问题 ([#3174](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3174)) ([4260a40](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4260a40)), closes [#2538](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2538)
* **dropdown:** 修复 CDK 样式冲突 ([#3133](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3133)) ([a9cd84d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a9cd84d)), closes [#3075](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3075)
* **progress:** 修复 success 状态异常问题 ([#3135](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3135)) ([f85c766](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f85c766))
* **transfer:** 修复空白区域无法触发选择框的问题 ([#3161](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3161)) ([92097b2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/92097b2)), closes [#3160](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3160) [#3159](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3159)
* **upload:** 修复移除拖拽事件的问题 ([#3114](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3114)) ([2b1fdd9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2b1fdd9)), closes [#3034](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3034) [#3139](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3139) [#3171](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3171)


### Features

* **collapse:** 支持 `nzExtra` ([#3177](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3177)) ([fbfb4da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fbfb4da))
* **menu:** 子菜单支持 `nzMenuClassName` ([#3176](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3176)) ([15b6724](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15b6724))
* **page-header:** 添加 page-header 组件 ([#2732](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2732)) ([cf51c1f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cf51c1f)), closes [#2710](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2710)
* **schematics:** 如果对应文件已被修改则不再设置引导页 ([#3178](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3178)) ([0a3f62c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0a3f62c))

## 7.1.0
`2019-03-21`

### Bug Fixes

* **tree:** 修复 `nzMultiple` 及 其他兼容性问题 ([#3060](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3060)) ([c917938](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c917938)), closes [#3076](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3076)
* **cascader:** 修复 column 未收起问题 ([#3037](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3037)) ([72a9e67](https://github.com/NG-ZORRO/ng-zorro-antd/commit/72a9e67)), closes [#3034](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3034)
* **date-picker:** 导出 `year-picker` 组件 ([#3125](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3125)) ([c5b0af9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c5b0af9))
* **modal:** 修复 `tabs` 与 `autosize` 的集成问题 ([#3065](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3065)) ([4cab26f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4cab26f)), closes [#2286](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2286) [#2713](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2713)
* **modal:** `confirm` 类型不应该有取消按钮 ([#3115](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3115)) ([f0a2b51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f0a2b51)), closes [#3107](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3107)
* **tooltip:** 修复 `tooltip` 动态更新未渲染问题 ([#3091](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3091)) ([2841a2f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2841a2f))


### Features

* **message:** 支持 `nzTop` 属性 ([#3047](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3047)) ([351135b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/351135b)), closes [#3041](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3041)
* **message:** 支持 `template` 属性 ([#3102](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3102)) ([d3f6655](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d3f6655)), closes [#3081](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3081)

## 7.0.3
`2019-03-14`

### Bug Fixes

* **select:** 修复 disabled 状态时 touched 初始状态错误的问题 ([#3084](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3084)) ([ba9d454](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ba9d454)), closes [#3059](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3059)

### Build

* **build:** 增加 strictNullCheck 等更严格的 ts 校验措施 ([#2126](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2977))
* **build:** icon 依赖包升级至 2.0.2 ([#3085](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3085)) ([fc72d7d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fc72d7d))

## 7.0.2
`2019-03-11`

### Bug Fixes

* **pagination:** 修复 Pagination 不随 pageIndex 变化的问题 ([#3067](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3067)) ([f4948d7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f4948d7)), closes [#3049](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3049)
* **steps:** 修复 Steps 在外层组件 OnPush 下的问题 ([#3061](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3061)) ([97adb2c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/97adb2c))
* **table:** 修复 Virtual Scroll 模式下 nzSize 不生效的问题 ([#3063](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3063)) ([4fa16de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4fa16de)), closes [#3050](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3050)
* **table:** 修复 Table 下拉筛选特殊情况下不生效的问题 ([#3064](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3064)) ([dbc33ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dbc33ae)), closes [#3028](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3028) [#3056](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3056) [#3058](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3058)
* **transfer:** 修复 Transfer 特殊情况下点击不生效的问题 ([#3030](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3030)) ([f077294](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f077294)), closes [#3026](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3026)

## 7.0.1
`2019-03-04`

### Bug Fixes

* **tree:** 修复 `setTimeOut` 默认值的问题 ([#3003](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3003)) ([050faa0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/050faa0)), closes [#3001](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3001)
* **tree:** 修复 `tree-select` 收起动画的问题 ([#2997](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2997)) ([623a9ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/623a9ff))
* **checkbox:** 修复 checkbox 无障碍的问题 ([#3009](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3009)) ([42ed317](https://github.com/NG-ZORRO/ng-zorro-antd/commit/42ed317)), closes [#3000](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3000)
* **fesm2015:** 修复 fesm2015 打包的问题 ([#3015](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3015)) ([e5b388a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5b388a))
* **icon:** 移除 icon 的测试模块导出 ([#3002](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3002)) ([28edb53](https://github.com/NG-ZORRO/ng-zorro-antd/commit/28edb53))
* **schematics:** 修复 `add-icon-assets` schema 路径 ([#3005](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3005)) ([5101928](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5101928))
* **select:** 修复 select 在 form 中的重置问题 ([#3017](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3017)) ([30b3d86](https://github.com/NG-ZORRO/ng-zorro-antd/commit/30b3d86)), closes [#3014](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3014)
* **table:** 修复 table 双向绑定的问题 ([#3007](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3007)) ([a2202b4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a2202b4)), closes [#3004](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3004)

## 7.0.0
`2019-02-28`

距离上一个稳定版本的发布已经有 3 个月的时间，从 7.0 版本开始，ng-zorro-antd 将和其他 Angular 第三方库一样，保持与 Angular 的主版本号一致。按照路线图的规划，我们在 7.0 前三个 rc 版本的基础上增加了 105 个 commits，目前我们已经按计划完成了第一阶段的 [Milestone](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2381)，包含但不限于以下内容

* 全部组件默认工作在 *OnPush* 模式下，大幅度提升了组件性能
* 完成 web animation 与 antd 动画的对应，并支持对每个组件的动画进行全局和单独配置
* 增加了 *Empty*、*Statistic*、*CountDown*、*Comment* 等实用组件
* 支持了最新的 CDK 特性，Table 等组件支持*虚拟滚动*
* 增加了大量新的功能，并修复了大部分之前组件存在的问题
* 日期相关组件支持可选的 ISO 标准日期格式化（依赖Date-fns库），解决周数算法不一致等问题
* 更换了新的全局滚动策略，Modal Drawer 在特殊情况下弹出时页面不再抖动
* 更加严格的 *TSLint* 校验
* 全新的 LOGO 和 文档系统

我们会在 7.0 正式版本发布后立刻进行第二阶段的 [Milestone](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2474) 工作，该部分规划包含完整的服务端渲染支持，a11y，独立的包引入机制，全局的组件配置方式，输入数据的动态校验等等，这些功能会在随后的版本中逐步发布。

### 升级指南

第一步：升级 Angular 及配套环境至最新版本

第二步：升级 ng-zorro-antd 至 7.0 正式版

**注意：**

7.0 正式版有三处更新可能需要修改少量业务代码后才能使用：

1. 7.0 正式版绝大部分组件都默认工作在 OnPush 模式下，OnPush 模式下的组件不会对 Input() 的可变对象 (mutate) 情况进行响应，所有组件 [@Input](#) 内容应修改为不可变对象 (immutable)，具体情况见最后示例代码，正确使用不可变对象可以大幅度[优化应用性能](https://www.sitepoint.com/immutability-javascript/)。
2. 我们修正了 Select 组件中  [nzDropdownMatchSelectWidth] 的实际含义，与之前版本相反。
3. Input Group Search 模式下 button 传入由 nzSuffix 换为 nzAddOnAfter。

### 更新日志

#### Bug Fixes

* **affix:** trigger 元素 `resize` 时应该重置 `placeholder` 大小 ([#2835](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2835)) ([7068a5e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7068a5e)), closes [#2818](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2818)
* **anchor:** 修复组件销毁后调用 `detectChanges` 的问题 ([#2864](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2864)) ([0e5c937](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0e5c937)), closes [#2860](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2860)
* **animation:** 修复 路由变化时动画触发的问题 ([#2895](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2895)) ([e39f6bf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e39f6bf))
* **build:** 修复 build target 为 ES6 时的问题 ([#2921](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2921)) ([ab62b40](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ab62b40)), closes [#2893](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2893)
* **carousel:** 修复在 modal 或 card 中不渲染的问题 ([#2699](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2699)) ([e092bf0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e092bf0)), closes [#2387](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2387) ,[#2226](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2226)
* **carousel:** 修复轮播图不能点击的问题 ([#2699](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2699)) ([e092bf0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e092bf0)), closes [#2631](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2631)
* **carousel:** 修复轮播图在窗口 resize 时内容错位的问题 ([#2699](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2699)) ([e092bf0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e092bf0)), closes [#2158](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2158)
* **cascader:** 修复当 nzOptions 为空时搜索错误的问题 ([#2846](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2846)) ([e33cc50](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e33cc50)), closes [#2784](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2784)
* **cascader**: 修复子节点 loading 状态未变化的问题 [(#2986](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2986)) ([b87e8bb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b87e8bbba88ab6dfb22d4783259d57c8157c7b07))
* **core:** 修复 CDK 样式冲突 ([#2917](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2917)) ([37cf6f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37cf6f3)), closes [#2874](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2874)
* **date-picker & calendar & time-picker**: 提供新的可选方式来解决不符合ISO标准算法的周数 ([#2819](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2822)) ([e1bce41](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2822/commits/e1bce41140186214ae1f214bb50e835b5e9c7303)), closes [#2819](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2819) ,[#2406](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2406)
* **drawer:** 修复 body overflow 的问题 ([#2867](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2867)) ([1e081f0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e081f0)), closes [#2227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2227)  [#2615](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2615)
* **grid:** 修复 Grid 响应式问题 ([#2915](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2915)) ([ab05619](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ab05619)), closes [#2908](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2908)
* **i18n:** 修复法语文件中的字段丢失 ([#2586](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2586)) ([#2737](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2737)) ([c821d56](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c821d56))
* **i18n:** 导出 `da_DK` 以及更新对于文档 ([#2599](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2599)) ([6554cf5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6554cf5))
* **icon:** 修复错误重新的渲染 ([#2912](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2912)) ([6dd3cbf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6dd3cbf)), closes [#2911](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2911)
* **input:** 修复对新 icon API 兼容性的问题 ([#2841](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2841)) ([3c954cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c954cb))
* **menu & dropdown:** 修复Firefox下定位问题 ([#2816](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2816)) ([09f21d0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/09f21d0)), closes [#2834](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2834)
* **modal, drawer:** 修复 IE/Edge 下 SVG `blur`/`focus` 方法找不到的问题 ([#2869](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2869)) ([7487a7e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7487a7e)), closes [#2388](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2388)
* **modal:**  修复 body overflow 的问题 ([#2869](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2869)) ([7487a7e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7487a7e)), closes  [#2612](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2612)
* **modal:**  修复 OnPush 容器下无法关闭蒙层 ([#2869](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2869)) ([7487a7e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7487a7e)), closes [#2643](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2643)
* **radio:** 在 `label` 中子元素无法聚焦 ([#2850](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2850)) ([58743b8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/58743b8)), closes [#2774](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2774)
* **select**: 修复 nzScrollToBottom 在浏览器缩放下的问题 ([#2741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2741))
* **select**: 修复 多选情况下 Input 框大小变化问题 ([#2741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2741))
* **select**: 修复 定位到多个 Option 的问题 ([#2741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2741))
* **switch:** 修复当 loading or disabled 时切换的问题 ([#2896](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2896)) ([a67984c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a67984c)), closes [#2787](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2787)
* **table:** 修复 Firefox 浏览器下边框样式问题 ([#2862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2862)) ([074083e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/074083e))
* **table:** 修复 ngIf 情况下 th 排序事件不触发的问题 ([#2862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2862)) ([074083e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/074083e))
* **table:** 修复 靠右对齐的固定多列的问题 ([#2862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2862)) ([074083e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/074083e))
* **time-picker**: 将清除按钮调整放置到外层输入框处 ([#2948](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2948)) ([ffb6665](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ffb6665db1be40d9b4e653f1cbabe131fd582899))
* **tooltip:** 修复 nzTitle 没有更新的问题 ([#2698](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2698)) ([f6dfbd9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f6dfbd9)), closes [#2695](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2695)
* **tree-select:** 修复 overlay 层级覆盖问题 ([#2764](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2764)) ([599ae1a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/599ae1a)), closes [#2730](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2730)
* **tree:** 修复 loading 图标位置偏移问题 ([#1998](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1998)) ([36c91ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36c91ac)), closes [#1998](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1998)
* **tree:** 修复 nzCheckStrictly 状态下父子节点关联问题 ([#2655](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2655) [#2370](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2370)) ([36c91ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36c91ac)), closes [#2655](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2655) ,[#2370](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2370)
* **tree:** 修复 nzShowIcon 为 false icon 仍然有效问题 ([#2724](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2724)) ([36c91ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36c91ac)), closes [#2724](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2724)
* **tree:** 修复 setChecked 方法状态同步问题 ([#2273](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2273)) ([36c91ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36c91ac)), closes [#2273](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2273)
* **tree**: 修复展开动画 ([#2989](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2989)) ([5142d18](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5142d18982192cbdfd2e9876de85840d2e0f809c))

#### Features

* **auto-complete:** 元素 `blur` 时关闭面板 ([#2916](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2916)) ([1e075f9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e075f9)), closes [#2885](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2885)
* **badge:** 支持 nzCount 传入 TemplateRef ([#2880](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2880)) ([fd0d91c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fd0d91c))
* **cascader:** 当级联选择器打开时调整位置 ([#2836](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2836)) ([289ba54](https://github.com/NG-ZORRO/ng-zorro-antd/commit/289ba54)), closes [#2181](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2181) ,[#2809](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2809)
* **collapse:** 支持自定义 panel 的图标 ([#2783](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2783)) ([a530f80](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a530f80))
* **comment:**  新增 comment 组件 ([14859c8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/14859c8)), closes [#2731](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2731)
* **date-picker,calendar:** 支持所有日期组件的周起始时间 ([#2819](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2822)) ([e1bce41](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2822/commits/e1bce41140186214ae1f214bb50e835b5e9c7303)), closes [#2293](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2293) ,[#2073](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2073)
* **date-picker**: `year-picker` 支持 `nzDisabledDate` 选项 ([#2949](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2949)) ([71dda9b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/71dda9bfce4a1c3a6563f0352580674e2929399d)), closes [#2194](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2194)
* **empty:** 新增空状态组件 ([#2722](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2722)) ([8906dff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8906dff)), closes [#2711](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2711)
* **icon:** 支持旋转 ([#2891](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2891)) ([07f76af](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07f76af)), closes [#2888](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2888)
* **icon:** 更新依赖以支持命名空间功能 ([#2641](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2641)) ([a2000fa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a2000fa))
* **layout:** 支持 zeroTrigger 属性 ([#2938](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2938)) ([4e4231d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4e4231d)), closes [#1950](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1950) ,[#1951](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1951)
* **menu,dropdown:** 支持递归数据样例 ([#2816](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2816)) ([09f21d0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/09f21d0)), closes [#1697](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1697)
* **modal:** 支持 `nzOkDisabled` 和 `nzCancelDisabled` ([#2856](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2856)) ([fa6a8e9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa6a8e9)), closes [#1838](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1838)
* **notification:** 使用模板时可传入上下文 ([#2926](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2926)) ([51940f7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/51940f7)), closes [#2755](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2755)
* **popconfirm:** 支持自定义图标 ([#2964](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2964)) ([ff030ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ff030ff)), closes [#2196](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2196)
* **rate:** 增加对 tooltip 的支持 ([#2794](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2794)) ([e121bd3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e121bd3))
* **select**: 支持 automatic tokenization ([#2741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2741))
* **select**: 支持 maxTagCount & maxTagCountPlaceholder ([#2741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2741))
* **slider:** 支持通过 nzTooltipVisible 控制 tooltip 出现的时机 ([#2930](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2930)) ([d3e61d4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d3e61d4)), closes [#2373](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2373)
* **statistic:** 新增统计组件 ([#2760](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2760)) ([abb9ae4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/abb9ae4e5ef8230f0a773bbdd1cebf46040832f0)), closes [#2754](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2754)
* **table:** 支持 nzItemRender 属性 ([#2862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2862)) ([074083e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/074083e))
* **table:** 支持 pagination 位置变换 ([#2862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2862)) ([074083e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/074083e))
* **table:** 支持 td th 对齐树形 ([#2862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2862)) ([074083e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/074083e))
* **tabs:** 支持 tab 内容懒加载 ([#2968](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2968))
* **tree-select:** 支持设置 `nzNotFoundContent` ([#2740](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2740)) ([d9055f5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d9055f5))
* **tree:** 搜索功能支持隐藏未匹配节点 ([#2208](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2208)) ([36c91ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36c91ac)), closes [#2208](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2208)
* **tree:** 支持删除节点等操作(状态同步) ([#1399](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1399) [#2384](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2384)) ([36c91ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36c91ac)), closes [#1399](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1399) ,[#2384](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2384)
* **tree:** 支持按 key 获取 NzTreeNode 实例 ([#2455](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2455)) ([36c91ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36c91ac)), closes [#2455](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2455)
* **upload:** 支持非 image 格式的文件预览 ([#2709](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2709)) ([4c41715](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c41715))


### 示例代码

在如下代码中，`this.value.push('jack')` 不会被 Angular 下的 OnPush 组件响应，需要使用 `this.value = [ ...this.value, 'jack' ]` 组件才会进行响应。<br />延伸阅读：[These 5 articles will make you an Angular Change Detection expert](https://blog.angularindepth.com/these-5-articles-will-make-you-an-angular-change-detection-expert-ed530d28930)

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-basic',
  template: `
    <nz-select [(ngModel)]="value" nzMode="multiple">
      <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
      <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
    </nz-select>
  `
})
export class NzDemoSelectBasicComponent implements OnInit {
  value = [ 'lucy' ];

  ngOnInit(): void {
    setTimeout(() => {
      // this.value.push('jack'); // mutate 数据不会被组件响应
      this.value = [ ...this.value, 'jack' ]; // 正确使用方式
    }, 3000);
  }
}

```

---

## 7.0.0 之前版本

7.0.0 之前版本的更新记录可以在 [Github](https://github.com/NG-ZORRO/ng-zorro-antd/releases) 查看