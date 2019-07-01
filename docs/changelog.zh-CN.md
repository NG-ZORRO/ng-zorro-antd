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