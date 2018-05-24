---
order: 9
title: 更新日志
toc: false
timeline: true
---

#### 发布周期

* 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
* 次版本号：每月发布一个带有新特性的向下兼容的版本。
* 主版本号：含有破坏性更新和新特性，不在发布周期内。

---

## 0.7.1
`2018.05.24`

### Menu
- 修复 `Menu` 在 `*ngFor` 使用方式下的问题

### Switch
- 支持用户完全控制 `Switch` 状态

### AutoComplete
- 修复 `nzValue` 与 `nzLabel` 并存时未生效的问题
- 修复在 `ReactiveForm` 下未生效的问题

### InputNumber
- 支持自定义 `placeholder` 内容
- 修复 `focus` 样式未被移除的问题

### DatePicker
- 修复贴近边界时的显示问题

### Popconfirm
- 修复 `nzOkType` 未生效的问题

### Message
- 修复 `Modal` 弹出时遮挡 `Message` 的问题

### Modal
- 调整隐藏和显示滚动条的逻辑

### 其他
- 修复部分文档错误
- 修复部分打包问题


### 写给 `0.6.x` 版本用户

#### 我应该升级到最新版本的 `ng-zorro-antd` 吗？

`0.7.0` 版本的 `ng-zorro-antd` 在以下几个方面做出了很大改进

* 更少的代码：简化了很多组件的使用方式，例如 `form` 表单同样功能下代码量会缩减1/3
* 更强的功能：完善了很多组件的功能，无论是 `input` 还是 `date-picker` 等大量组件都有了更强大的功能可用
* 更好的质量：增加了组件的单元测试，为了保证组件的质量我们目前为止增加了 1070 个测试用例，单测覆盖率达到了 `95%` 以上
* 更新的规范：升级到 Ant Design 3.0 规范，并且支持像 `react` 版本一样自定义主题

升级到 `0.7.0` 版本是最好的选择。

#### 为什么会有这么多 break change

就像上文所说的那样，为了能够提供更好的使用方式，我们对大量代码进行了简化，并对很多功能做了增强，在这个过程中不可避免的会引入破坏性更新，希望大家能够理解。

#### 应该如何升级到最新版本

为了帮助用户从低版本升级，我们保留了低版本的文档系统，你可以随时对比文档中的差别，另外 `ng-alain` 也提供了从 `0.6.x` 版本升级到 `0.7.0` 的[在线模板工具](https://ng-alain.com/6to7)，大家可以根据需要使用。

**请注意：** 由于 `@angular/cli` 的最新版本已经默认采用 `angular 6.0` 以上的版本，请使用 `@angular/cli` 1.7.4 及以下版本。

### 写给 `0.7.0` 试用用户

感谢在测试阶段升级到 `0.7.0 beta` 版本的所有用户，没有你们的协助就不会有 `0.7.0` 正式版本的诞生，推荐所有 `0.7.0 beta` 版本用户升级到该版本。

#### 如何从 `0.7.0` 测试版本迁移到正式版

从 `0.7.0` 测试版本到 `0.7.0` 正式版本基本没有破坏性更新，更多的工作是在开发新的组件上，因此可以放心迁移。

```bash
npm install ng-zorro-antd@0.7.0
```
命令即可升级至 `0.7.0` 正式版本

#### 什么时候官方会支持 `Angular 6.0` 版本

目前 `ng-zorro-antd` 已经全力在适配 `Angular 6.0` 版本，可以在[这里](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1406) 追踪我们的进度。
我们会在 `1.0` 版本提供经过测试的 `Angular 6.0` 适配版本，届时我们还会同时支持 `@angular/cli` 最新版本的众多特性，`rxjs` 与 `cdk` 的依赖版本也会同步升级到 `6.0` 版本，提供更好更多的性能。


#### 如何在 0.7.0 版本下使用 `Angular 6.0`

如果你希望在当前版本(0.7.0) 使用 `Angular 6.0`，你需要完成以下两部分工作

* 安装 `rxjs-compat` 用于兼容 `rxjs 5.x`
* 降级到 `less 2.7` 版本，因为最新版本的 `@angular/cli` 依赖的 `less 3.0` 版本禁用了 `javascriptEnabled` 选项，相关工作可以在[这里](https://github.com/angular/angular-cli/issues/10430) 追踪

最后，由于目前官方未对 `Angular 6.0` 版本进行全面的测试和兼容工作，并不建议用户在生产环境使用 `Angular 6.0` 版本。

#### 从 `0.7.0` 到 `1.0.0` 还会有破坏性更新吗？

除了Angular 和 RxJS 升级带来的更新之外，`ng-zorro-antd` 不会再引入破坏性更新，可以安心使用当前版本。

---

## 0.7.0
`2018.05.15`

0.7.0 作为 1.0 正式版 之前的最后一系列版本，涉及到了底层的大量重构与改动，API 将与 1.0 正式版本的内容保持一致，请大家放心升级

### 主要变化

- 同步Ant Design 3.0 的设计
- 支持定制主题
- 支持英文文档
- 支持34种语言类型
- 已有组件的功能与Ant Design React同步
- 大量组件的性能优化与重构
- 单元测试率提高到95以上%
- 新的 Tree 组件
- 新的 DatePicker 组件
- 新的 TimePicker 组件
- 新的 Mention 组件
- 新的 AutoComplete 组件
- 新的 Divider 组件
- 新的 List 组件

### 升级内容

#### 全局部分

- 需要手动引入样式文件，支持自定义主题
- 不再依赖 moment，新增加 date-fns 依赖
- `forRoot` 方法不再接受字体配置，本地字体部署需要在定制主题中实现

#### Button
- `nz-button` 内部不再需要加入`<span>`标签

#### Icon
- 新增部分iconfont
- 本地字体部署需要在定制主题中实现

#### Grid
- 栅格断点增加xxl
- 栅格间隔支持根据不同屏幕宽度变化

#### Layout
- 支持 翻转折叠提示箭头的方向
- 支持 自定义Trigger为模板变量

#### Affix
- 增加距离底部固钉
- 增加目标占位符、更好的滚动性能

#### Breadcrumb
- 自定义分隔符 支持传入模板

#### Dropdown
- 增加边界检测
- 增加右键菜单支持

#### Menu
- 支持菜单是否可选中功能
- 增加子菜单选中事件
- 支持二级菜单禁用
- 增加自动边界检测

#### Pagination
- 支持自定义渲染页码结构
- 支持只有一页时是否隐藏分页器

#### Steps
- 支持传入模板可以自定义点状步骤条渲染内容
- 自定义图标 支持传入 样式名称和模板两种方式，原有方式废弃
- 自定义标题 支持传入模板和字符串


#### Checkbox
- label 内部不再需要写入 `span` 标签
- 新增灵活布局的使用方式

#### Form
- 废弃原有 Directive 的使用方式，大幅度简化使用方式

#### Input
- 暴露原生 input 标签，大幅度简化使用方式

#### InputNumber
- 重写了内部逻辑，与React版本逻辑保持一致
- 支持更多快捷键操作

#### Radio
- 内部不再需要写入 `span` 标签
- 支持nzName及更多快捷键操作

#### Rate
— 支持自定义字符
- 支持清除模式

#### Select
- 支持 option 分组功能
- 支持 compareWith 方法
- 支持 nzDropdownClassName、nzDropdownMatchSelectWidth、nzDropdownStyle等对样式定义的方法
- option 自定义内容方式改变
- 增加 nzFilterOption、nzServerSearch 等搜索定义API

#### Switch
- 自定义内容方式改变，nzCheckedChildren 与 nzUnCheckedChildren 支持传入 模板和字符串
- 支持loading效果

#### Card
- 重写使用方式，大幅度降低使用成本

#### Carousel
- 支持动态调整所有属性，重写内部逻辑

#### Collapse
- selector名称改变
- 面板头部内容支持模板和字符串变量
- 增加是否展示箭头的方法
- 增加展开回调函数

#### Table
- 重写内部逻辑，大幅度简化使用方式
- 支持React版本的全部功能

#### Tabs
- nzTitle 的传入方式改变，支持传入模板和字符串
- nzTabBarExtraContent 的传入方式改变
- 增加 nzTabBarGutter、nzOnNextClick、nzOnPrevClick、nzHideAll等多种方法

#### Tags
- 重写使用方式，增加 nzMode 选项

#### Timeline
- 幽灵节点的定义支持 模板 字符串和布尔类型
- 支持自定义自定义时间轴点

#### Alert
- 自定义图标类型、自定义关闭按钮、警告提示的辅助性文字介绍、	警告提示内容 全部支持传入模板

#### Modal
- 重构，同一套代码，以模版方式支持普通模态框和确认框
- 支持AntDesign的所有参数用法（部分参数有调整）
- 额外支持设置确认/取消按钮的loading状态
- 增强footer的自定义：支持配置方式设置按钮组
- 更加便捷的方式进行内外组件与对话框的相互通信和调用

#### Progress
- 重写，支持React的全部功能


#### Spin
- 支持自定义 加载指示符

#### Anchor
- 增加 `nzAffix`、`nzShowInkInFixed`、`nzScroll` 等属性

#### Divider
- 新组件：区隔内容的分割线

#### List
- 新组件：通用列表

#### TimePicker

- 新增 `TimePicker` 组件

#### Mention

- 新增 Mention 组件

## 之前版本

之前版本的更新记录可以在 [Github](https://github.com/NG-ZORRO/ng-zorro-antd/releases) 查看