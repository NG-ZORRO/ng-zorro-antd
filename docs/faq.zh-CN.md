---
order: 8
title: 常见问题
---

### 为什么不提供模块单独引入

事实上，从 `ng-zorro-antd` 的第一个版本开始，所有的 `ng-zorro-antd` 代码就完全由 TypeScript 编写，打包时会根据代码中使用的模块 Tree Shaking，未使用的模块并不会打包进生成的应用中，因此单模块引入是完全没有任何必要的。

![](https://img.alicdn.com/tfs/TB1D8MXdTtYBeNjy1XdXXXXyVXa-2864-1592.jpg)

### 有些特性为什么不会被支持

`ng-zorro-antd` 是 Angular 版本 Ant Design 的实现，这意味着只有 Ant Design 支持的交互、功能 才会被 `ng-zorro-antd` 实现。

### 打包出来的文件太大

首先请确定使用了 `ng build --prod` 正确的方式进行了打包，如果除 `ng-zorro-antd` 之外还引入了其他第三方组件库，你可以通过 `ng build --prod --sourcemaps` 命令生成 sourcemap 文件后，再通过 source-map-explorer 检查每个模块所占用的体积，具体操作可以参考[官方文档](https://angular.io/guide/deployment#inspect-the-bundles)。

### 浏览器兼容性问题

首先请确定浏览器版本得到了 Angular 的[官方支持](https://github.com/angular/angular)，并正确引入了 [polyfill](https://angular.io/guide/browser-support) 文件，另外有些组件的部分使用方式不支持部分浏览器（例如 flex显示方式），如果不是以上问题，请提 ISSUE 给我们。

### 数据修改后页面为什么没有更新

请确认按照正确方式使用了 [Angular](https://angular.io/guide/lifecycle-hooks#onchanges)

### 为什么我的 ISSUE 会被关闭

ISSUE 列表是为了 开发者 和 用户 追踪相关的开发进度而设计的，这意味 ISSUE 只接受 bug 报告或是新功能请求 (feature requests)，这意味着我们不接受用法问题。
另外为了给予 更具体的工作更高的优先级和提高 ISSUE 处理的效率，未按照 格式提交的 ISSUE 也将会被立刻自动关闭。

### Angular的相关问题在哪里提问

除了Angular的官方文档和相关的论坛之外，Angular的相关问题可以在 Google 或者 百度 上搜索 `关键字 -angularjs` 来避免 `angularjs` 的干扰，例如 `angular ngmodel -angularjs` 就可以获得 Angular 关于 `ngModel` 的相关文章。

### NG-ZORRO 与 Ant Design 的关系

NG-ZORRO 由阿里计算平台事业部、阿里云等不同部门的一些小伙伴在原业务组件的基础上共同构建而成，整体的设计完全兼容并遵守 Ant Design 的规范，并定期会与 Ant Design React 版本保持功能同步。
