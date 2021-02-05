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


## 11.1.0

`2021-01-22`

### Bug Fixes

* **table:** 修复 `nzBordered` 的问题([#6367](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6367)) ([d6ca800](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d6ca8002ff1bc1482312f9a6340a453466627c01)), closes [#6135](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6135) [#6254](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6254)
* **typography:** 修复编辑区域无法获取内容的问题 ([#6369](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6369)) ([814ef92](https://github.com/NG-ZORRO/ng-zorro-antd/commit/814ef925f3b2c046309c388bc1b98506779a3eaf))

### Features

* **date-picker:** 添加 `nzId` 支持 ([#6242](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6242)) ([#6246](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6246)) ([1e9f8bd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e9f8bd9d661ad00cfde7642118127e93247000b))
* **modal:** 添加 `nzCentered` 支持 ([#6333](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6333)) ([8fd4df6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8fd4df66d858066dfafd3854dba339124fca866c)), closes [#6327](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6327)
* **table:** 添加 `ReadonlyArray` 支持 ([#6156](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6156)) ([9d67d0b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9d67d0beac80032d07a56cd57829f3bd41da9b05))
* **table:** 添加 `nzPaginationType` 支持 ([#5986](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5986)) ([61ca6e2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/61ca6e232a8a9625cd658abfe184ac45f2729ddf))
* **upload:** `nzIconRender` 添加 `NzUploadFile` 模版引用变量 ([#6283](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6283)) ([a949470](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a949470af22b9c212f96bef43ad1ef47b42b75e0)), closes [#6279](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6279)

## 11.0.2

`2021-01-18`

### Bug Fixes

* **carousel:** 修复在 RTL 下的问题 ([#6336](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6336)) ([f6a844b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f6a844b468d24ffcccb2c93e39367276778416a3)([#6318](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6318))); ([bef7e29](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bef7e29a3f994074abbea10512b8ec1ce213110e)), closes [#6301](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6301)
* **date-picker:** 修复警告信息提示错误的问题 ([#6335](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6335)) ([cf10a03](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cf10a03a7eb161b96ca01f47abfe926b1033854f)), closes [#6310](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6310)
* **date-picker:** 修复开始结束面板展示不合理的问题 ([#6339](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6339)) ([7f47698](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7f476984a59fe4b5097d13a4ef6768dd63b6881e)), closes [#6308](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6308) [#6142](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6142) [#5992](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5992)
* **descriptions:** 修复 `nzBordered` 在全局配置的问题 ([#6348](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6348)) ([eb20970](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb2097036f16c66ae351d2a099eb12e869ede5b6)), closes [#6331](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6331)
* **image:** 添加未引用的模块 ([#6300](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6300)) ([caad718](https://github.com/NG-ZORRO/ng-zorro-antd/commit/caad718e23f7617fc99aa4aa29928a9db55a1e76)), closes [#6299](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6299)
* **table:** 修复内存泄漏问题 ([#6325](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6325)) ([7f267b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7f267b6ebc9c3259e6824702cad36382cc7df63e))

## 11.0.1

`2020-12-31`

### Bug Fixes

* **carousel:** 修复样式问题 ([#6269](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6269)) ([3a70a2d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3a70a2dcf98ec13946e388649d4901a13dd5a1ba))
* **collapse:** 修复动画不能关闭的问题 ([#6280](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6280)) ([16fa890](https://github.com/NG-ZORRO/ng-zorro-antd/commit/16fa890bf18d8a7f7d3bb9f63ae8e0cace057226))
* **image:** 添加未引用的模块 ([#6273](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6273)) ([20db5d4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/20db5d4ab1bae943539386559d8188e94cc49127)), closes [#6271](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6271)
* **image:** 修复拖拽释放后图片尺寸适应的问题 ([#6262](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6262)) ([07ae66a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07ae66a60285f9debf7176684ff66335f97c5a31))
* **modal:** 修复遮罩层 `nzZindex` 与弹窗不一致的问题 ([#6294](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6294)) ([54d294a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/54d294a6bec56494992fefe6b2898f7af957df3b)), closes [#6288](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6288)
* **select:** 调整清除图标和箭头图标的 DOM 顺序 ([#6245](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6245)) ([c822073](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c8220737c25bf4670a697729eaadc8e762e2404f)), closes [#5989](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5989)
* **slider:** 修复 `nzReverse` 的样式问题 ([#6006](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6006)) ([fa06415](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa064156ef59673556a62d741ae640494eefae32))
* **table:** 修复 pagination 存在时数据没有更新的问题 ([#6298](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6298)) ([1f2ab41](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f2ab41fae89d0e674102c12b3960bfc7bddebab)), closes [#6272](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6272)
* **tabs:** 修复 a 标签可点击范围的问题 ([#6278](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6278)) ([0694079](https://github.com/NG-ZORRO/ng-zorro-antd/commit/069407959850995f1a5ecbef0d71fa00c69b99a5))
* **tabs:** 启用 `nzLinkRouter` 时 index 只应由路由事件改变 ([#6293](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6293)) ([ca1b861](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca1b861b410f92a60f214f34b39c2c5d3ae9ea63))


## 11.0.0

`2020-12-21`


## 新特性

### 支持 RTL

在 `body` 或 `html` 上设置 `dir` 属性。

```html
<html dir="rtl"></html>
```

或者使用 Angular CDK bidi module 设置双方向

```typescript
import {BidiModule} from '@angular/cdk/bidi';
```

非常感谢 [@saeedrahimi](https://github.com/saeedrahimi), [@hdm91](https://github.com/hdm91), [@HDaghash](https://github.com/HDaghash), [@hmdnikoo](https://github.com/hmdnikoo) 的贡献!

### 新增 Image 组件

可用于处理图片的渐进加载，加载失败占位符，以及图文内容中的图片（多张）预览。

非常感谢 [@stygian-desolator](https://github.com/stygian-desolator) 的贡献！

### 新增 Graph 实验性组件

支持自定义的多层级的图（Graph）渲染。

### 新增 Tree View 组件

原有的 Tree 已经包含了许多常用的功能，为了处理更多定制性更高的场景我们开发了更基础的 Tree View 组件，具有更高的定制度并且能够更好的控制性能。

### 新增内置 Aliyun 主题

```less
@import "~ng-zorro-antd/ng-zorro-antd.aliyun.less";
```

### Bug Fixes

* **tree:** 修复样式 ([#6198](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6198)) ([a481a15](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a481a156278047472e1324b87df896b37246a0ed))
* **button:** 修复错误的弃用警告 ([#6193](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6193)) ([40c644a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/40c644aa8fe92ccfaf26220a872b0995874b2569)), closes [#6191](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6191) [#6187](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6187)
* **i18n:** 修复 Ukrainian i18n 文件 ([#6236](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6236)) ([551c7a2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/551c7a24c1ae0cec9f15f61bcaa12b9057de4bd0))
* **image:** 修复 RTL 和属性 ([#6227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6227)) ([3978e0f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3978e0f48c3924fdbfda54e69438ea794b29a8ec))
* **list:** 修复模版渲染顺序 ([#6232](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6232)) ([4324011](https://github.com/NG-ZORRO/ng-zorro-antd/commit/43240113c66c583e806f87b84b669a6ddb1faffe)), closes [#6229](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6229)
* **modal:** 修复确认框模式下的 `nzOkDanger` ([#6214](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6214)) ([ebe2869](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ebe2869d1b9459a8e02e3993d8a93483fa531f62))
* **select:** 修复 XSS 漏洞 ([#6222](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6222)) ([a393b89](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a393b89bf82eece5b0586592d709629865b27b3a)), closes [#6209](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6209)
* **table:** 修复 `nzFrontPagination` 的问题 ([#6201](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6201)) ([8029ef4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8029ef47d6eeaf43aa5875f8a8034205dc9c69bb)), closes [#6196](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6196)
* **time-picker:**  修复默认 placeholder 没有跟随 i18n 更新的问题 ([#6069](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6069)) ([f34840b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f34840bf2a4c5eb2d2facba0fa00068f6fa2bd5e))


### Features

* **all:** 添加 RTL 支持 ([#4703](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4703)) ([860dfed](https://github.com/NG-ZORRO/ng-zorro-antd/commit/860dfeddcf02fc7e775615244827cb224d1aa8be)), closes [#4704](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4704) [#1762](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1762) [#5261](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5261)
* **date-picker:** 添加 `nzShowNow` 属性 ([#6160](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6160)) ([99e3117](https://github.com/NG-ZORRO/ng-zorro-antd/commit/99e3117b70853c0aa4f6b4f475b031734840f10f)), closes [#6146](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6146)
* **graph:** 添加 graph 组件 ([#6053](https://github.com/NG-ZORRO/ng-zorro-antd/pull/6053)) ([e69303f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e69303f828132cb62263867abe8afefc600f15f6))
* **image:** 添加 image 组件 ([#6154](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6154)) ([83dfdf9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/83dfdf97b5a716e1cc9424d645dfc6713fe4ba64))
* **tree-view:** 添加 tree-view 组件 ([#6161](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6161)) ([05d58de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/05d58de21f8a3e4d3e2bf4d4333de95a2c71e1ed)), closes [#5976](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5976) [#5809](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5809) [#5739](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5739) [#5736](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5736) [#5519](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5519) [#5446](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5446) [#5152](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5152) [#4694](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4694) [#4472](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4472) [#3832](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3832) [#2785](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2785) [#2744](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2744) [#6199](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6199)
* **schematics:** 使 ng-add schematics 可以链式运行 ([#6203](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6203)) ([d1e76f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d1e76f3d8d41b0e3b9f01887e4805ff43f48d0fa))

### BREAKING CHANGES

**date-picker**
- `[nzMode]` 不再支持 `NzDateMode[]` 数组类型。

**modal**
- `[nzGetContainer]` 以被移除。
- `NzModalRef` 的 `open` 方法以被移除。

**tabs**
- `[nzShowPagination]` input 以被移除。
- `(nzOnPrevClick)` output 以被移除。
- `(nzOnNextClick)` output 以被移除。
- `a[nz-tab-link]` 用法以被移除，请使用 `ng-template[nzTabLink] > a[nz-tab-link]` 代替.


## 历史版本

历史版本的更新记录可以在 [Github](https://github.com/NG-ZORRO/ng-zorro-antd/releases) 查看。
