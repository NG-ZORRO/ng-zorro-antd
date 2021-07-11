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

## 12.0.0

`2021-07-11`

### Bug Fixes

* **pagination:** 修复总页数改变时没有触发变更检查的问题 ([#6780](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6780)) ([2f1f8dc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2f1f8dcb1c7eb4f89b1ff21bf8c64d7f8a75f344))
* **pagination:** 修复错误的按钮类型导致在表单中触发提交的问题 ([#6744](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6744)) ([f77ab28](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f77ab28341489e9df7f757294a6a5ad6030700f4))
* **cascader:** 修复 `nzClear` 不工作的问题 ([#6761](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6761)) ([3dd9534](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3dd9534d8059985dba3389fc52ea463bbf3381c5)), closes [#6751](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6751)
* **select:** 修复选择器被点击时没有聚焦的问题 ([#6786](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6786)) ([1c9331a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1c9331a4f8a32a91eaaf6128bdb335f26bd6fcab))
* **time-picker:** 修复 Tab 切换焦点时弹出没有关闭的问题 ([#6602](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6602)) ([0e53053](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0e530538ee954ce6ccc5891c0556cfb338f00b56))
* **tree:** 修复 firefox 下拖拽的问题 ([#6771](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6771)) ([be20114](https://github.com/NG-ZORRO/ng-zorro-antd/commit/be20114f6b83f326045dd98b5ad3aa9fab61af03))
* **typography:** 修复单行省略的样式问题 ([#6776](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6776)) ([e192a70](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e192a70aa034913d87b00f863e27e0f6acc280de))


### Features

* **checkbox:** 添加 `nzId` 属性 ([#6813](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6813)) ([52235c9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/52235c97aaf75802cca9e81c9071fa2bdfe0208e))
* **date-picker:** 添加 `nzId` 属性 ([#6814](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6814)) ([28074e1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/28074e1749a38a19cc64bd52aefc85d3e6f1a53b))
* **experimental/image:** 添加新的实验性组件 ([#6590](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6590)) ([7e2fba3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e2fba39354de78219be1237eea8edf19b5799e7))
* **popconfirm:** 添加 `nzAutoFocus` 属性 ([#6256](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6256)) ([91e5d49](https://github.com/NG-ZORRO/ng-zorro-antd/commit/91e5d49f83c8e833e70400c65b69a2e4787fc91d)), closes [#6249](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6249)
* **rate:** 为定义字符模版添加 `index` 变量 ([#6787](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6787)) ([7163e36](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7163e360fc97d48cd718c65ffa301c0253801851))
* **steps:** 支持环形进度条 ([#6132](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6132)) ([466a093](https://github.com/NG-ZORRO/ng-zorro-antd/commit/466a093d10da6d8996adc636447be3531c5d1d76)), closes [#5684](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5684)
* **timeline:** 添加 `nzLabel` 属性 ([#6687](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6687)) ([86c587d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/86c587d7be4b7b6e936cf50e2cafa4499d735407)), closes [#6682](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6682)

### BREAKING CHANGES

**button**
- `[nz-button][nzType="danger"]` 已经不再支持，请使用 `[nz-button][nzDanger]` 代替。

**modal**
- `ng-content` 的用法已经被移除，请使用 `<ng-template nzModalContent></ng-template>` 代替。

**drawer**
- `ng-content` 的用法已经被移除，请使用 `<ng-template nzDrawerContent></ng-template>` 代替。

**tree-view**
- `[nzNodeWidth]` 已经被移除， 请使用 `[nzItemSize]` 代替.

**nz-space-item**
- `nz-space-item, [nz-space-item]` 已经被移除， 请使用 `<ng-template nzSpaceItem></ng-template>` 代替。


## 历史版本

历史版本的更新记录可以在 [Github](https://github.com/NG-ZORRO/ng-zorro-antd/releases) 查看。
