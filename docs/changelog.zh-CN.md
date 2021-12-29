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
