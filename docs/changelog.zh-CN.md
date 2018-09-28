---
order: 9
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

## 1.6.0
`2018-09-22`

### Bug Fixes

* **date-picker:** 修复在 input group 中的样式问题 ([#2136](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2136)) ([049212f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/049212f))
* **calendar:** 修复年份列表选择器的问题 ([#2140](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2140)) ([e485d02](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e485d02)), closes [#2091](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2091)
* **cascader:** 修复搜索问题 ([#2108](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2108)) ([28556e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/28556e4)), closes [#2104](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2104)
* **drawer:** 修复不能滚动问题 ([#2120](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2120)) ([e8dad8f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e8dad8f)), closes [#2119](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2119)
* **steps:** 修复动态生成问题 ([#2149](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2149)) ([ee3fa7e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee3fa7e)), closes [#2148](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2148)
* **publish:** 增加版本校验 ([#2117](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2117)) ([bc1f6fa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc1f6fa))
* **schematics:** 修复与 Angular CLI 6.2.0 的兼容问题 ([#2131](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2131)) ([ac428db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ac428db))
* **test:** 修复覆盖率问题 ([#2146](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2146)) ([310771f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/310771f))
* **upload:** 修复提示错误 ([#2173](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2173)) ([69c5210](https://github.com/NG-ZORRO/ng-zorro-antd/commit/69c5210))


### Features

* **drawer:** 支持使用 service 创建 drawer ([#1981](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1981)) ([a232d59](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a232d59)), closes [#1937](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1937)
* **upload:** 支持文件夹上传 ([#2164](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2164)) ([3ef8bcf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3ef8bcf)), closes [#2167](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2167) [#2154](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2154)
* **tree:** 支持更多常用属性，简化用法 ([#2121](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2121))
* **skeleton:** 增加 skeleton 组件 ([#1829](https://github.com/NG-ZORRO/ng-zorro-antd/pull/1829))


### Build

* **build:** 打包器切换至 ng-packagr ([#2126](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2126))


### Performance Improvements

* **table:** 提升固定表头时 table 的性能 ([#2157](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2157)) ([cde5fb0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cde5fb0))


## 1.5.0
`2018-09-09`

### Bug Fixes

* **drawer:** 修复 Drawer 组件弹出导致body出现滚动条问题 ([#2095](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2095)) ([b993068](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b993068)), closes [#2070](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2070)
* **modal:** 修复 nzComponentParams 类型支持 ([#1812](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1812)) ([6ef1185](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6ef1185))


### Features

* **breadcrumb:** 支持通过配置 `router.data` 自动生成面包屑 ([#2050](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2050)) ([64d191c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/64d191c)), closes [#2001](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2001)
* **button:** 支持将按钮宽度调整为其父宽度的选项 ([#2051](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2051)) ([2858ba1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2858ba1)), closes [#2047](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2047)
* **drawer:** 支持从自定义位置弹出 ([#2039](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2039)) ([693b4eb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/693b4eb)), closes [#2015](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2015)
* **modal:** 支持自定义 NZ_MODAL_CONFIG (当前包含属性 "autoBodyPadding") ([#2006](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2006)) ([1d5e06c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1d5e06c)), closes [#1720](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1720)
* **select:** 支持键盘激活 select 弹出选项 ([#2038](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2038)) ([b2ea96a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b2ea96a)), closes [#1909](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1909)
* **steps:** 支持自定义开始步骤 ([#2021](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2021)) ([bc7bf17](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc7bf17)), closes [#1994](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1994)
* **publish:** 自动发布脚本 ([#1979](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1979)) ([98cb651](https://github.com/NG-ZORRO/ng-zorro-antd/commit/98cb651)), closes [#1925](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1925)

## 1.4.1
`2018-09-02`

### Bug Fixes

* **auto-complete:** 修复移动端不能选择选项的问题 ([#2054](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2054)) ([2e8e63d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2e8e63d)), closes [#2053](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2053)
* **modal:** 修复 modal 可能在 Angular 生命周期结束之前被关闭的问题 ([#1769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1769)) ([075c7a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/075c7a4)), closes [#1663](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1663)
* **pagination:** 修复 pagination 显示范围的问题 ([#2046](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2046)) ([30bccd1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/30bccd1)), closes [#2036](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2036)
* **table:** 修复第一行 margin 的问题 ([#2061](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2061)) ([cb34983](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb34983)), closes [#2059](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2059)
* **tree-select:** 修复在使用 OnPush 策略的情况下无法关闭的问题 ([#2028](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2028)) ([fb83354](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb83354)), closes [#2012](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2012)

## 1.4.0
`2018-08-19`

### Bug Fixes

* **avatar:** 修复 src 错误时无法更新的问题 ([#2008](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2008)) ([d55cdf2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d55cdf2))
* **carousel:** 修复桌面端无法滑动图像的问题 ([#1970](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1970)) ([02a84a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/02a84a9))
* **cascader:** 修复无法动态加载的问题 ([#1931](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1931)) ([d4d24fb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d4d24fb)), closes [#1927](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1927)
* **cascader:** 修复 hover 触发 onChange 的问题 ([#1991](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1991)) ([577ae47](https://github.com/NG-ZORRO/ng-zorro-antd/commit/577ae47)), closes [#1966](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1966)
* **select:** 修复使用 enter 选择后无法聚焦的问题 ([#1943](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1943)) ([a64d04c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a64d04c)), closes [#1940](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1940)
* **tooltip,popconfirm,popover:** 修复 directive 模式下创建元素引起的问题 ([#1968](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1968)) ([fa40145](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa40145)), closes [#1967](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1967)
* **tree-select:** 修复设置 nodes 后没有更新选择框内容的问题 ([#1946](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1946)) ([cd928e1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cd928e1)), closes [#1934](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1934)
* **tree:** 修复 loading 样式 ([#1942](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1942)) ([19fc2ee](https://github.com/NG-ZORRO/ng-zorro-antd/commit/19fc2ee))


### Features

* **modal:** 添加智能识别是否添加为 body 添加 padding-right 的功能 ([#1877](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1877)) ([a5d631d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a5d631d)), closes [#1422](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1422)
* **timeline:** 支持自定义圆点颜色 ([#1959](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1959)) ([fb3daa1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb3daa1)), closes [#1956](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1956)


## 1.3.0
`2018-08-03`

### Bug Fixes

* **auto-complete:** 修复第一次打开时的位置问题 ([#1863](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1863)) ([c80bc8d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c80bc8d)), closes [#1840](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1840)
* **date-picker:** 修复 31 号时月份选择问题 ([#1903](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1903)) ([3c654a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c654a5)), closes [#1899](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1899)


### Features

* **cascader:** 支持搜索功能 ([#1873](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1873)) ([633bc87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/633bc87)), closes [#1773](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1773)
* **date-picker:** 支持年份选择 ([#1906](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1906)) ([f1f5625](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f1f5625)), closes [#416](https://github.com/NG-ZORRO/ng-zorro-antd/issues/416)
* **drawer:** 新增 Drawer 组件 ([#1789](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1789)) ([33aff47](https://github.com/NG-ZORRO/ng-zorro-antd/commit/33aff47)), closes [#1565](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1565)
* **radio:** 支持 Solid 样式 ([#1892](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1892)) ([945a924](https://github.com/NG-ZORRO/ng-zorro-antd/commit/945a924)), closes [#1891](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1891)
* **table:** 支持 filter 默认值([#1893](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1893)) ([cea0e51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cea0e51)), closes [#1872](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1872)

## 1.2.0
`2018-07-22`

### Bug Fixes

* **carousel:** 修复窗口大小变化时的问题 ([#1815](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1815)) ([1e0a029](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e0a029)), closes [#1811](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1811)
* **input-number:** 修复 nzAutoFocus 未生效的问题 ([#1833](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1833)) ([739b353](https://github.com/NG-ZORRO/ng-zorro-antd/commit/739b353)), closes [#1706](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1706)
* **tree:** 修复 checkedNodeList 同步问题 ([#1809](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1809)) ([5305723](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5305723)), closes [#1802](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1802)
* **input:** 修复 addon 与 affix 混用时的样式问题 ([#1857](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1857)) ([ca2d7e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca2d7e0)), closes [#1795](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1795)
* **input-number:** 修复 touched 事件未触发的问题 ([#1858](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1858)) ([7c90a72](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c90a72)), closes [#1785](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1785)
* **tabs:** 修复 focus 导致的样式问题 ([#1845](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1845)) ([bbcb0de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bbcb0de)), closes [#1821](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1821)
* **upload:** 修复 nzRemove 的问题 ([#1851](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1851)) ([3532bbe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3532bbe)), closes [#1850](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1850)


### Features

* **carousel:** 支持 swipe 手势操作 ([#1856](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1856)) ([bb5bdd3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bb5bdd3)), closes [#1816](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1816)
* **carousel:** 支持 dot 自定义渲染 ([#1860](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1860)) ([c1f15b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c1f15b6)), closes [#1743](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1743)
* **form:** 支持 touched 状态下校验 ([#1861](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1861)) ([27ca5bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/27ca5bc)), closes [#1665](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1665)
* **tree-select:** 支持自定义显示 ([#1832](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1832)) ([1cc3646](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1cc3646)), closes [#1823](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1823)

## 1.1.1
`2018-07-02`

### Bug Fixes

* **tree:** 修复 disabled 状态节点的问题 ([#1737](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1737)) ([92675e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/92675e4)), closes [#1721](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1721)
* **auto-complete, mention, tree-select:** 修复组件在 Firefox 下的问题 ([#1761](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1761)) ([82af2ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/82af2ff)), closes [#1756](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1756)
* **date-picker:** 修复动态切换语言不生效的问题 ([#1768](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1768)) ([9caabb5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9caabb5)), closes [#1717](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1717)
* **list:** 修复 loading 状态的问题 ([#1767](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1767)) ([336cc08](https://github.com/NG-ZORRO/ng-zorro-antd/commit/336cc08)), closes [#1739](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1739)
* **radio:** 修复 radio group 状态冲突的问题 ([#1746](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1746)) ([86fc773](https://github.com/NG-ZORRO/ng-zorro-antd/commit/86fc773)), closes [#1734](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1734)
* **radio:** 修复在 reactive form 下的问题 ([#1748](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1748)) ([b7a831d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b7a831d)), closes [#1735](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1735)
* **select:** 修复在 IOS 上不触发键盘展开的问题 ([#1653](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1653)) ([#1751](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1751)) ([89d05f9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/89d05f9)), closes [#1752](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1752) [#1274](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1274)
* **transfer:** 修复样式问题 ([#1745](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1745)) ([4005c7c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4005c7c)), closes [#1732](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1732)
* **tree-select:** 修复不能设置为 null 的问题 ([#1760](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1760)) ([689f8b4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/689f8b4)), closes [#1740](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1740)
* **tree-select:** 修复样式问题 ([#1775](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1775)) ([4eb039a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4eb039a)), closes [#1772](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1772)
* **table:** 提供跳过组件渲染的方式 ([#1742](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1742)) ([aeb485f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aeb485f)), closes [#1736](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1736)

### Features

* **carousel:** 支持手动设定 AutoSpeed ([#1741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1741)) ([a516949](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a516949)), closes [#1711](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1711)


## 1.1.0
`2018-06-25`


### Bug Fixes

* ** cascader:** 修复 nzClear 后不生效的问题 ([#1676](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1676)) ([c683bc3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c683bc3)), closes [#1646](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1646)
* **autocomplete:** 修复 AutoComplete 在 AoT 编译下的问题 ([#1686](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1686)) ([a1f326d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a1f326d)), closes [#1683](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1683)
* **card:** 修复 Card 的 loading 样式问题 ([#1696](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1696)) ([70cb591](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70cb591)), closes [#1695](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1695)
* **date-picker:** 修复 DatePicker 在跨日期选择下的时间展示问题 ([#1709](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1709)) ([b1a1235](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b1a1235)), closes [#1693](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1693)
* **nz-alert:** 修复 close 事件的逻辑 ([#1667](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1667)) ([6b31ca3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b31ca3)), closes [#1666](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1666)
* **select:** 修复 select 在弹出框中的顺序问题 ([#1673](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1673)) ([442e3f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/442e3f3)), closes [#1672](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1672) [#1643](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1643)
* **table:** 修复 table 中 重置 filter 及 表头滚动条样式问题 ([#1674](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1674)) ([1a4332a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1a4332a)), closes [#1671](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1671) [#1660](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1660)
* **tree-select:** 修复 TreeSelect 在弹出框中的下拉菜单定位问题 ([#1687](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1687)) ([43910f9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/43910f9)), closes [#1681](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1681)
* **ng-add:** 修复使用 ng add 多次执行后的样式导入问题 ([#1655](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1655)) ([fc67ce5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fc67ce5))
* **showcase:** 修复文档中 DatePicker 禁止时间范围的问题 ([#1648](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1648)) ([7d593e6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7d593e6))


### Features

* **table:** 支持 pagination 的 nzSimple 选项 ([#1699](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1699)) ([4868c41](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4868c41)), closes [#1599](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1599)



## 1.0.0
`2018-06-11`

更多内容见 NG ZORRO 1.0 [发布公告](https://zhuanlan.zhihu.com/p/37916702)。


10个月之前我们发布了 NG-ZORRO 的第一个版本，在这 10个月的时间里，我们接收了超过 35 个 contributor 的 386 次 Commit。

**在经过了 35 个版本 的迭代之后，1.0 版本在今天正式发布。**

1.0 版本基于最新的 Angular ^6.0.0 与 RxJS ^6.0.0 构建，与 @angular/cli 进行了深度整合，完善了文档系统，降低了上手难度，同步了最新的设计规范。除此之外，我们完成了与 Ant Design 所有组件（共51个）的完全同步工作，并对之前的部分组件进行了重构。

最重要的是，这些工作相对于上一个版本（0.7.1）没有引入任何破坏性更新，这意味着所有你需要做的只是要升级目前项目的 Angular 版本到 6.0。
> 注：升级到最新的 Angular 6 版本只需要很少的工作就可以完成，具体的步骤可以参考官方的 [升级指南](https://update.angular.io)。



Tooltip、Popover、PopConfirm 等组件在1.0版本中推荐使用 Directive 方式，原有的方式虽然不推荐，但是仍然可以继续使用。另外，借助与 Angular 6.0的部分新特性，原有的forRoot的使用方式不再必要，在任何位置都可以直接引入 `NgZorroAntdModule` 而不用再考虑当前是否是在根模块中。当然，原有的`forRoot`的方式也继续兼容。


## 1.0 之前版本

1.0 之前版本的更新记录可以在 [Github](https://github.com/NG-ZORRO/ng-zorro-antd/releases) 查看