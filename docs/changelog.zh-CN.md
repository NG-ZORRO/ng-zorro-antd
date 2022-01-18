---
order: 13
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
## 13.0.1

`2022-01-18`

### Bug Fixes

* **back-top:** 修复 scrolling listener 问题 ([#7208](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7208)) ([3bcd343](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3bcd343e38aefc35af1c2386a539d19a1d0ca279)), closes [#7199](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7199)
* **drawer:** 修复 `nzTitle` 为空时关闭图标的位置错误问题 ([#7176](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7176)) ([a6195b9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6195b991a531e914faef2237dadf7226b8d6390)), closes [#7164](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7164)
* **icon:** 修复切换图标未正确替换问题 ([#7188](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7188)) ([67ac573](https://github.com/NG-ZORRO/ng-zorro-antd/commit/67ac573d2e0a9b19263c600f020842532844566a)), closes [#7186](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7186)
* **statistic:** `nzCountdownFinish` 事件触发后应重新进入 ngZone ([#7137](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7137)) ([6835544](https://github.com/NG-ZORRO/ng-zorro-antd/commit/68355448198b31d9a064710cfc4d790739909616))
* **tree-view:** 修复 trackBy 方法在虚拟滚动场景下节点异常问题 ([#7150](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7150)) ([4484674](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4484674e212f67dea3aad8b56f27e9de61e6d21e)), closes [#7118](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7118)

### Performance Improvements

* **auto-complete:** 修复内存泄漏问题 ([#7112](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7112)) ([3806250](https://github.com/NG-ZORRO/ng-zorro-antd/commit/38062508fb7e0df13e528e1c9d5bf3720bd76200))
* **cdk:** 修复内存泄漏问题 ([#7139](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7139)) ([2a93d05](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2a93d05c48ebba1a1f6a3add74b71f4049907337))
* **checkbox:** 减少触发脏值检测 ([#7127](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7127)) ([15abe33](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15abe33053ee888e31c1ad629fd5a5ecae79db43))
* **code-editor:** 在 ngZone 外初始化提升性能 ([#7151](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7151)) ([f73be80](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f73be80ca8e55604a683827f0693455c20978214))
* **core:** 应用销毁时停止 `resize` 事件监听 ([#7125](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7125)) ([8437111](https://github.com/NG-ZORRO/ng-zorro-antd/commit/843711117a8bd7b6feb6410b4b824bd9741147a7))
* **image:** unsubscribe 过期的 src 源 ([#7102](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7102)) ([87a3e27](https://github.com/NG-ZORRO/ng-zorro-antd/commit/87a3e276fc1f1a50ecc6da9edc28dd4f77ac8482))
* **input-number:** 减少触发脏值检测 ([#7129](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7129)) ([9971faa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9971faa7d9c54db40c19fa6333dce8a65d38ccd4))
* **modal:** 鼠标事件无需触发脏值检测 ([#7169](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7169)) ([c20bb80](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c20bb8076b9d0e5e63880921cdfc738de12fc5a0))
* **modal:** 修复内存泄漏问题 ([#7123](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7123)) ([3664efe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3664efe1d6e9f5a93ed85e958652f8a898c0b987))
* **graph:** 动画执行无需触发脏值检测 ([#7132](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7132)) ([1ceaf70](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ceaf70e215ab854a94897aebbf6acb4bd5c2006))
* **rate:** `focus` 与 `blur` 事件在无监听情况下无需触发脏值检测 ([#7182](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7182)) ([3e9e035](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3e9e035d0273427f47eb4c0200930e549711d5d4))
* **steps:** 未监听 `nzIndexChange` 事件时无需触发脏值检测 ([#7183](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7183)) ([cbfc558](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cbfc558c255e7f70e2b931f751c800501474a791))
* **transfer:** checkbox 被点击无需重复触发脏值检测 ([#7124](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7124)) ([b12f43a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b12f43afe78d03687000471f164ff1f5d2631d3b))


## 13.0.0

`2021-12-29`

#### 停止对 View Engine 的支持

`ng-zorro-antd@13` 不再支持 View Engine 并使用 Ivy 包进行分发，你将获得更快的打包速度和更小的包体积。

获取更多帮助请前往 [Angular Ivy](https://angular.io/guide/ivy) 查看。

#### 停止对 IE11 的支持

- Angular 可以通过原生的 Web API 使用现代浏览器功能，如 CSS 变量 和 Web 动画等特性
- 移除 IE 相关的 polyfills 和代码使得应用程序更小、加载速度更快

获取更多帮助请前往 [Issue #41840](https://github.com/angular/angular/issues/41840) 查看。

#### 性能增强

修复了多处可能造成内存泄漏的问题。

### BREAKING CHANGES
**dropdown**
- `[nzHasBackdrop]` 已被移除，请使用 `[nzBackdrop]` 代替。


## 历史版本

历史版本的更新记录可以在 [Github](https://github.com/NG-ZORRO/ng-zorro-antd/releases) 查看。
