---
order: 11
title: Change Log
toc: false
timeline: true
---
`ng-zorro-antd` strictly follows [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/).

#### Release Schedule

* Weekly release: patch version at the end of every week for routine bugfix (anytime for urgent bugfix).
* Monthly release: minor version at the end of every month for new features.
* Major version release is not included in this schedule for breaking change and new features.

---
## 8.0.3
`2019-07-14`

### Bug Fixes

* **dropdown:** fix dropdown contextmenu ([#3782](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3782)) ([cce920d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cce920d)), closes [#3768](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3768)
* **input:** fix input disabled OnPush ([#3786](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3786)) ([dd81155](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dd81155)), closes [#3732](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3732)
* **menu:** fix menu nzMatchRouter in nested menu ([#3785](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3785)) ([eb5d544](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb5d544)), closes [#3736](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3736)
* **switch:** fix switch ViewChild static ([#3784](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3784)) ([f59d79f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f59d79f)), closes [#3760](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3760)
* **table:** fix table custom filter panel ([#3787](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3787)) ([b9a7267](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b9a7267)), closes [#3721](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3721)


## 8.0.2
`2019-07-03`

Fix the dependencies version ranges.


## 8.0.1
`2019-07-01`

### Bug Fixes

* **tree:** fix warning bug ([#3692](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3692)) ([637c334](https://github.com/NG-ZORRO/ng-zorro-antd/commit/637c334))
* **breadcrumb:** fix warning startWith operators ([fe28a0d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fe28a0d))
* **schematics:** missing routing module in sidemenu template ([#3695](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3695)) ([fdcef82](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fdcef82))


## 8.0.0
`2019-06-29`

### Intro

Welcome to `ng-zorro-antd` 8.0.0. After upgrading to the latest version, developers can not only enjoy the latest version of Angular, but also get the latest features and better performance.

You need to update your Angular to `^8.0.0` before update. Some `ng-zorro-antd` APIs are deprecated in version 8.0.0, and all deprecated APIs will still be supported until 9.0.0, which means that version 8.0.0 is fully **compatible** with version 7.0.0. Developers can get detailed tips on deprecated APIs in the development environment (prompts will not appear in production environments) and have plenty of time to fix these usages before 9.0.0 is released.

* New Typography Component, which provides basic formatting and common operations for text.

* Support admin template when run `ng add ng-zorro-antd`, more info can be found in [Schematics](https://ng.ant.design/docs/schematics/en) part.

* The Form Component has been fully enhanced, developers only needs to pass in the error tips.

```html
<nz-form-control nzErrorTip="Please input your username!">
  <nz-input-group [nzPrefix]="prefixUser">
    <input formControlName="userName" nz-input placeholder="Username" />
  </nz-input-group>
</nz-form-control>

```

* There is no need to wrap the dropdown directive with `nz-dropdown` now.

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

* Menu support automatic highlighting based on routing.

```html
<ul nz-menu nzMode="horizontal">
  <li nz-menu-item nzMatchRouter>
    <a [routerLink]="['/', 'welcome']">Welcome</a>
  </li>
</ul>
```

### Angular Update Guide

It is recommended to upgrade according to the [Angular Update Guide](https://update.angular.io/#7.0:8.0) prompt. The following questions may require additional attention:

* The usage of `ViewChild` and `ContentChild` has changed. Ref [Static Query Migration Guide](https://angular.io/guide/static-query-migration).
* The usage of lazy load has changed. Ref [loadChildren string synatx](https://angular.io/guide/deprecations#loadchildren-string-syntax).
* New `Differential Loading` feature. Ref [Differential Loading](https://angular.io/guide/deployment#differential-loading).

### Features

* **avatar:** add nzSrcSet & nzAlt properites ([#3583](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3583)) ([d0ad5e8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d0ad5e8)), closes [#3543](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3543)
* **breadcrumb:** support dropdown ([#3636](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3636)) ([9dfab45](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9dfab45))
* **carousel:** support dot position ([#3575](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3575)) ([0566331](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0566331))
* **core:** add universal logger funcs and deprecation warnings ([#3538](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3538)) ([b893520](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b893520))
* **form:** refactor form to support better template driven ([10d0e28](https://github.com/NG-ZORRO/ng-zorro-antd/commit/10d0e28))
* **input-number:** support nzId ([a6500c8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6500c8))
* **menu:** support auto active menu-item via routerLink ([c9e84c7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c9e84c7))
* **menu:** support nzTitle & nzIcon in nz-submenu ([0cde4d7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0cde4d7))
* **pagination:** support pagination nzDisabled ([141bef8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/141bef8))
* **select:** support custom template in select component ([#3071](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3071)) ([aad02a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aad02a5)), closes [#2946](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2946)
* **table:** support nzVirtualForTrackBy ([cb14096](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb14096))
* **transfer:** add nzShowSelectAll & nzRenderList properties ([#3588](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3588)) ([1619f30](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1619f30)), closes [#3567](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3567) [#2870](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2870)
* **typography:** add typography component ([#3119](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3119)) ([4d739ef](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4d739ef))
* **schematics:** add template option in `ng-add` ([#3674](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3674)) ([69072de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/69072de))

### Bug Fixes

* **button:** fix order of DOM nodes in button ([#3578](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3578)) ([c3df8b5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c3df8b5)), closes [#3079](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3079)
* **card:** fix card tab ng-template ([#3654](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3654)) ([7585ba4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7585ba4))
* **descriptions:** fix warning without logger ([#3663](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3663)) ([5826fc1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5826fc1))
* **dropdown:** dropdown should close when set disabled ([0bd1ae3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0bd1ae3)), closes [#3420](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3420)
* **dropdown:** fix dropdown change after checked bug ([16d5c2d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/16d5c2d))
* **dropdown:** fix dropdown SSR bug ([#3628](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3628)) ([ade1abd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ade1abd))
* **form:** fix form control validate with formControl ([bc54e90](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc54e90)), closes [#3551](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3551)
* **form:** fix form overlap ([#3633](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3633)) ([0fc7d05](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0fc7d05)), closes [#3607](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3607)
* **form:** fix nzValidateStatus & nzHasFeedback overlap ([fb4965b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb4965b)), closes [#3607](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3607)
* **grid:** Make all properties in EmbeddedProperty optional ([#3473](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3473)) ([107e731](https://github.com/NG-ZORRO/ng-zorro-antd/commit/107e731))
* **input:** fix ng-content nzAddOnBeforeIcon transclusion ([#3597](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3597)) ([a37ec0a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a37ec0a)), closes [#3596](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3596)
* **mention:** fix cannot to switch trigger ([#3632](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3632)) ([c8b5b09](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c8b5b09)), closes [#3629](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3629)
* **menu:** fix menu title ExpressionChangedAfterItHasBeenCheckedError ([52975ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/52975ff)), closes [#3023](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3023)
* **menu:** fix submenu not active when collapsed ([67f6fa2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/67f6fa2)), closes [#3345](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3345)
* **pagination:** fix pagination nzTotal 0 bug ([#3651](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3651)) ([d28fc49](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d28fc49)), closes [#3648](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3648)
* **select:** fix nzOpen state when nzOnSearch trigger ([3ca816d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3ca816d)), closes [#3626](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3626)
* **select:** fix select enter open when disabled ([36db36c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36db36c)), closes [#3408](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3408)
* **select:** fix the bug of duplication when keyboard input chinese char ([#3440](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3440)) ([3c82f26](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c82f26)), closes [#3439](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3439)
* **table:** compatible with @angular/material/table ([79b02ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/79b02ca))
* **table:** fix sortChange with dynamic columns ([#3603](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3603)) ([#3605](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3605)) ([c85743d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c85743d))
* **typography:** fix the actions button order ([#3677](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3677)) ([c2c28a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c2c28a4))
* **typography:** not render when the edit text has no changes ([51b9ce0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/51b9ce0))


---

## Old Versions

All releases notes can be found [here](https://github.com/NG-ZORRO/ng-zorro-antd/releases)
