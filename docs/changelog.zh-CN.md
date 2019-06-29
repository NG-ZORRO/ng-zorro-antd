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

### 更新日志

---

## 8.0.0 之前版本

8.0.0 之前版本的更新记录可以在 [Github](https://github.com/NG-ZORRO/ng-zorro-antd/releases) 查看。