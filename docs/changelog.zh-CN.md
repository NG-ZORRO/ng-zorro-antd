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
## 13.0.0

`2021-12-28`

### 版本介绍
欢迎来到 ng-zorro-antd 的 13.0.0 版本，升级到最新版本之后，开发者不仅可以享受到最新版本 Angular 的支持，还可以获得最新特性和更好的性能。

ng-zorro-antd 的部分 API 在 13.x 版本进入弃用状态，并且在开发环境中给出了警告提醒，所有之前弃用 API 在 13.0.0 不再支持，如果你之前已经根据告警信息修改了对应组件的使用方式，那么 13.0.0 版本升级不会有任何障碍，请按照以下步骤进行。

## 开始之前

1. 首先确保你 `Node.js` >= `12.20`, `Typescript` >= `4.4`
2. 创建新的分支，或者使用其他方式备份当前项目
3. 删除项目下 package-lock.json 文件

## 升级步骤

### 1. 升级相关依赖

- 前往 [https://update.angular.io/](https://update.angular.io/) 将项目升级到 Angular 13
- 如果你有单独使用 `@angular/cdk` 请执行 `ng update @angular/cdk`

### 升级 NG-ZORRO

- 运行 `ng update ng-zorro-antd`
- 如果控制台出现警告消息请按提示修改对应代码

### 新版本特性
#### 支持 Angular Ivy
Angular 13 宣布不再支持 View Engine，同时全面启用 Ivy，ng-zorro-antd v13 版本开始完全基于 Ivy 构建，实现更快的编译速度。

获取更多帮助请前往 [Angular Ivy](https://angular.io/guide/ivy) 和 [Template type](https://angular.io/guide/template-typecheck) 查看。

#### 结束对 IE11 的支持
- Angular 可以通过原生的 Web API 使用现代浏览器功能，如 CSS 变量 和 Web 动画等特性
- 移除 IE 相关的 polyfills 和代码使得应用程序更小、加载速度更快
- 消除了对差异加载的需要，开发人员将与应用程序用户将获得更好的体验
- 运行 ng update 将自动删除这些特定于 IE 的 polyfills，并在项目迁移期间减少包大小

#### 性能和易用性增强
- 针对多个组件的优化，消除可能的内存泄漏问题

### BREAKING CHANGES
**dropdown**
- `[nz-dropdown][nzHasBackdrop="true""]` 已经不再支持，请使用 `[nz-dropdown][nzBackdrop]` 代替。

**table**
- `[nz-filter-trigger][nzHasBackdrop="true""]` 已经不再支持，请使用 `[nz-filter-trigger][nzBackdrop]` 代替。


## 历史版本

历史版本的更新记录可以在 [Github](https://github.com/NG-ZORRO/ng-zorro-antd/releases) 查看。
