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