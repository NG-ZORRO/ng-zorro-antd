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
## 0.7.0-beta.4

#### Mention

- 新增 Mention 组件

#### Tree

- `nzTreeData` 变更为 `ngModel`, 初始化数据使用 `new NzTreeNode({})`,请参阅示例
- 新增 `origin` 属性存储用户原始数据
- 支持根据 `NzTreeComponent` 上下文获取 `NzTreeService`

#### Table

- 修复计算滚动条宽度导致的重绘问题
- 修复过滤器高亮问题

#### Message

- 修复动态创建时报错的问题

#### Notification

- 修复动态创建时报错的问题

#### Card

- 修复了 `card-meta` 的对齐问题

#### Transfer

- 修复了 Transfer 在 OnPush 下使用的问题

#### Select

- 修复 `nzValue` 值为 0 不能选中的问题
- 修复滚动条定位的问题

#### Carousel

- 修复自动播放的问题

#### Menu

- 修复动态修改结构时 `ExpressionChangedAfterItHasBeenCheckedError` 的问题

#### i18n

- 更详细的描述了国际化的使用方式
- 修复了未设置 i18n 时的报错

#### 其他

- 官网支持动态修改主题
- 更新了 angular.cn 的网址
- 更新了 `Upload` 组件的说明
- 更新了 `Tree` 组件的说明


## 0.7.0-beta.3

#### Tree

- 支持拖拽文件夹前 `beforeDrop` 进行确认的API

#### Modal

- 支持手动触发 `nzOnOk` 与 `nzOnCancel` 的方法

#### Cascader

- 修复异步加载数据时的问题

#### Card

- 修复样式问题

#### 文档

- 修复部分文档问题

## 0.7.0-beta.2

`2018-03-20`

#### 全局部分

- 去掉了 cdk-overlay-pane 的 z-index 样式

#### Modal

- 新增参数 `nzAfterOpen` / `nzAfterClose`
- `nzGetContainer` 参数默认值改为动态创建的overlay容器
- `NzModalService` 服务新增 `openModals` / `afterAllClose` / `closeAll()` 支持
- `NzModalRef` 新增 `afterOpen` / `afterClose` / `getContentComponent()` 支持，并且原 `close` / `destroy` 方法支持传递参数

#### Form

- 修复 `Form` 校验 `markAsDirty` 样式不生效的问题
- 修复 `Input` 在 `ReactiveForm` 模式下 `disabled` 属性不生效的问题


#### Table

- 修复 Table 横向滚动宽度小于实际宽度时的样式问题
- 修复 Table 右侧固定多列时的样式问题


#### Doc

- 修复多处文档错误
- 增加手机浏览时的适配


## 0.7.0-beta.1

`2018-03-15`

0.7.0 作为 1.0 正式版 之前的最后一系列版本，涉及到了底层的大量重构与改动，大部分 API 将与 1.0 正式版本的内容保持一致，目前剩余以下组件仍在紧张开发中，最近几日会逐步放出

- TimePicker
- DatePicker
- Mention
- TreeSelect

### 主要变化

- 同步Ant Design 3.0 的设计
- 支持定制主题
- 支持英文文档
- 支持34种语言类型
- 已有组件的功能与Ant Design React同步
- 大量组件的性能优化与重构
- 单元测试率提高到95以上%
- 新的 Tree 组件
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

## 之前版本

之前版本的更新记录可以在 [Github](https://github.com/NG-ZORRO/ng-zorro-antd/releases) 查看