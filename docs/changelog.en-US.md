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

---

## Old Versions

All releases notes can be found [here](https://github.com/NG-ZORRO/ng-zorro-antd/releases)