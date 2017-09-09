更新日志
===

#### 发布周期

* 每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）。
* 每月发布一个带有新特性的向下兼容的版本。
* 含有破坏性升级的版本更新不在发布周期内。

更新日志也可以在[Github](https://github.com/NG-ZORRO/ng-zorro-antd/releases)查看

## 0.5.0
`2017-09-09`

### Build
* 重写了打包逻辑，提供了规范的package格式，兼容了更多打包工具 [#240](https://github.com/NG-ZORRO/ng-zorro-antd/pull/240)  [Trotyl Yu](https://github.com/trotyl)

### Features
* `Table`支持可展开和树形数据展示 [#259](https://github.com/NG-ZORRO/ng-zorro-antd/pull/259)
* `Table`支持固定表头，自定义筛选，增加远程排序、表格行列排序、可编辑行等DEMO [#210](https://github.com/NG-ZORRO/ng-zorro-antd/pull/210)
* `Input`支持`nzReadOnly`属性 [#236](https://github.com/NG-ZORRO/ng-zorro-antd/pull/236) [SangKa.Z](https://github.com/SangKa)
* `Input`支持`nzAutoResize`属性 [#251](https://github.com/NG-ZORRO/ng-zorro-antd/pull/251) [Hsuan Lee](https://github.com/HsuanXyz)
* `Menu`支持缩起内嵌菜单 [#225](https://github.com/NG-ZORRO/ng-zorro-antd/pull/225) [Hsuan Lee](https://github.com/HsuanXyz)
* `Grid`中`Col`支持属性内嵌 [#247](https://github.com/NG-ZORRO/ng-zorro-antd/pull/247)

### Bug Fixes
* `Form`修复了多种组件在表单中不必要的Control触发逻辑 [#257](https://github.com/NG-ZORRO/ng-zorro-antd/pull/257)
* `CheckBox`修复了在safari中的选中问题 [#256](https://github.com/NG-ZORRO/ng-zorro-antd/pull/256) [SangKa.Z](https://github.com/SangKa)
* `Carousel`修复了高度计算的问题 [#242](https://github.com/NG-ZORRO/ng-zorro-antd/pull/242)
* `DropdownButton`修复了下拉菜单无法选中的问题 [#237](https://github.com/NG-ZORRO/ng-zorro-antd/pull/237) [LongYinan](https://github.com/Brooooooklyn)
* `Datepicker`修复了与React版本顺序不一致的问题 [#243](https://github.com/NG-ZORRO/ng-zorro-antd/pull/243) [Nickbing Lao](https://github.com/giscafer)
* `InputNumber`修复了数据校验逻辑 [#230](https://github.com/NG-ZORRO/ng-zorro-antd/pull/230)
* `Cascader`修复了在`nzOptions`变化时不刷新的问题 [#221](https://github.com/NG-ZORRO/ng-zorro-antd/pull/221) [fbchen](https://github.com/fbchen)
* `Form`修复了多种组件中`setDisabledState`不生效的问题 [#188](https://github.com/NG-ZORRO/ng-zorro-antd/pull/188) [Zhaoming Li](https://github.com/deart1mer)
* `Select`,`Datepicker`,`Timepicker`修复了当disable时下拉菜单不收起的问题 [#222](https://github.com/NG-ZORRO/ng-zorro-antd/pull/222) [Zhaoming Li](https://github.com/deart1mer)
* `Select`, `Datepicker`, `Timepicker`, `Radio`, `Checkbox`, `InputNumber`修复了`touched`状态不生效的问题 [#248](https://github.com/NG-ZORRO/ng-zorro-antd/pull/248) [Zhaoming Li](https://github.com/deart1mer)
* `Input`修复了`nzSize`不生效的问题 [#209](https://github.com/NG-ZORRO/ng-zorro-antd/pull/209) [laobeiV5](https://github.com/gsbybb)
* 修改了对`DOCUMENT`的错误依赖 [#233](https://github.com/NG-ZORRO/ng-zorro-antd/pull/233) [Trotyl Yu](https://github.com/trotyl)

### Refactor
* 删除了不必要的`@angular/cdk`依赖 [#241](https://github.com/NG-ZORRO/ng-zorro-antd/pull/241) [Trotyl Yu](https://github.com/trotyl)

## 0.5.0-rc.4
`2017-08-31`

### Features
* `Tooltip`,`Popconfirm`,`Popover`组件支持 OnPush [#143](https://github.com/NG-ZORRO/ng-zorro-antd/pull/143) [@csyszf](https://github.com/csyszf)
* `Modal` 提供了 `open`,`close`,`setConfirmLoading`的新方法 [@giscafer](https://github.com/giscafer)

### Bug Fixes
* 指定了 `@angular/cdk` 版本，修复因`@angular/cdk`不兼容升级导致的问题
* `Pagination` 修复了 `nzPageIndexChange` 事件在部分情况下不触发的问题 [#189](https://github.com/NG-ZORRO/ng-zorro-antd/pull/189)	[@SangKa](https://github.com/SangKa)

### Refactor
* `Dropdown` 中优化了`rxjs`的使用方式 [#148](https://github.com/NG-ZORRO/ng-zorro-antd/pull/148) [@Brooooooklyn](https://github.com/Brooooooklyn)
* `Calendar` 不再使用 ngOutletContext [#200](https://github.com/NG-ZORRO/ng-zorro-antd/pull/200)  [@chunghha](https://github.com/chunghha)

### Doc
* 修正`Form`样例说明中`nz-demo-form-dynamic` [#186](https://github.com/NG-ZORRO/ng-zorro-antd/pull/186)  [@thegatheringstorm](https://github.com/thegatheringstorm)
* 修正`Datapicker`样例中事件范围的禁止选择范围 [#102](https://github.com/NG-ZORRO/ng-zorro-antd/pull/102) [@HsuanXyz](https://github.com/HsuanXyz)

## 0.5.0-rc.3
`2017-08-26`

### Features
* `nz-root`不再作为必须项引入，提供了[新的方法](https://ng.ant.design/#/components/icon)配置本地字体文件，原有`nz-root`的使用方式继续兼容，但不建议继续使用 [#34](https://github.com/NG-ZORRO/ng-zorro-antd/issues/34) [@trotyl](https://github.com/trotyl)
* 增加`BackTop`,`Anchor`,`Affix`,`Avatar`四个组件 [#88](https://github.com/NG-ZORRO/ng-zorro-antd/pull/88) [@cipchk](https://github.com/cipchk)

### Bug Fixes
* 修复`checkbox`class名称丢失的问题 [#104](https://github.com/NG-ZORRO/ng-zorro-antd/issues/104)  [@giscafer](https://github.com/giscafer)
* 修复`input`中`touched`事件触发的问题 [#65](https://github.com/NG-ZORRO/ng-zorro-antd/issues/65) [#117](https://github.com/NG-ZORRO/ng-zorro-antd/issues/117)
* 修复`select`中激活`option`样式的问题 [#139](https://github.com/NG-ZORRO/ng-zorro-antd/issues/139) [@SangKa](https://github.com/SangKa)
* 修复`pgaination`中`nzPageIndex`双向绑定的问题 [#107](https://github.com/NG-ZORRO/ng-zorro-antd/issues/107)
* 修复`select`在`multiple`情况下表单中reset时的问题 [#128](https://github.com/NG-ZORRO/ng-zorro-antd/issues/128)
* 修复`input`的`disable`情况下样式未生效的问题 [#103](https://github.com/NG-ZORRO/ng-zorro-antd/issues/103) [@giscafer](https://github.com/giscafer)
* 修复`carousel`中自动播放的问题 [#161](https://github.com/NG-ZORRO/ng-zorro-antd/issues/161)

### Doc
* 文档页面切换路由时自动滚动至顶部 [#26](https://github.com/NG-ZORRO/ng-zorro-antd/issues/26)

## 0.5.0-rc.2
`2017-08-19`

### Features
* `Input`组件增加`nzBlur`和`nzFocus`事件 [#73](https://github.com/NG-ZORRO/ng-zorro-antd/issues/73) [@giscafer](https://github.com/giscafer)

### Bug Fixes
* 修复`Steps`组件在`Tabs`组件中使用时的样式BUG [#83](https://github.com/NG-ZORRO/ng-zorro-antd/issues/83)
* 修复`Pagination`上一页和下一页样式BUG [#17](https://github.com/NG-ZORRO/ng-zorro-antd/issues/17)
* 修复`Menu`组件在懒加载模块中与`routerLinkActive`冲突的BUG [#52](https://github.com/NG-ZORRO/ng-zorro-antd/issues/52)
* 修复`Menu`组件在`Layout`收起状态下样式错误的BUG [#35](https://github.com/NG-ZORRO/ng-zorro-antd/issues/35) [#74](https://github.com/NG-ZORRO/ng-zorro-antd/issues/74)
* 修复`Timeline`组件使用`ngFor`渲染时的BUG [#66](https://github.com/NG-ZORRO/ng-zorro-antd/issues/66) [@SangKa](https://github.com/SangKa)
* 修复`Carousel`组件内容动态改变时的BUG [#56](https://github.com/NG-ZORRO/ng-zorro-antd/issues/56)
* 修复`Pagination`中快速跳转时首页和尾页不会高亮的BUG [#37](https://github.com/NG-ZORRO/ng-zorro-antd/issues/37) [@HsuanXyz](https://github.com/HsuanXyz)
* 修复安装时`package.json`文件定义导致的Angular版本冲突问题 [#23](https://github.com/NG-ZORRO/ng-zorro-antd/issues/23)
* 修正文档中多处错误 [@SangKa](https://github.com/SangKa)

### Performance Improvements
* 修改了`rxjs`的引入方式 [#29](https://github.com/NG-ZORRO/ng-zorro-antd/pull/29) [@trotyl](https://github.com/trotyl)

### Other
* 修正了`HostBinding`的使用方式 [#19](https://github.com/NG-ZORRO/ng-zorro-antd/pull/19) [@trotyl](https://github.com/trotyl)

## 0.5.0-rc.0
`2017-08-15`

### Features
* 对外第一个版本，暂时移除了不稳定和强依赖的组件部分，后续单独发布
* 新增 `Cascader`和 `Tag`组件，感谢fbchen
* Select增加了nzFilter属性
* 同步Ant Design样式至`2.12.5`版本
* 全站修改为LazyLoad
* 调整部分文件夹名称
* 调整了快速上手等部分的说明

### THANK YOU

感谢所有参与者的贡献

VTHINKXIE, Wilson Zeng, chensimeng, zjgzx1988, SunMing, fbchen, Trotyl Yu, 雪狼, afc163, xufei, lightningtgc

## 0.4.0
`2017-07-20`

### Features
* `Select`,`DropDown`,`TimePicker`,`DatePicker`下拉菜单改为absolute布局，不再受父元素overflow限制
* `Select`,`DropDown`,`TimePicker`,`DatePicker`,`ContextMenu`下拉菜单位置跟随视窗边界自动切换
* `Select` 增加nzMode方法
* `Modal`增加`zIndex`选项用于配置多窗口时显示次序
* `Alert`增加关闭时动画效果
* `Tooltip`组件加入

### Break Changes
* `nz-table-sort`修复ascend和descend语义错误
* `Select`中nz-option修正输入语义，nzValue->nzLabel,nzKey->nzValue
* `Tabs`组件重构，使用方法改变，具体见组件页面介绍
* `Select`组件不再支持位置选项，改为自动布局
* `Popover`和`Popconfirm`和`DropDown`重构，使用方法改变，具体组件页面介绍
* 根Module组件需要使用` NgZorroAntdModule.forRoot()`方法，不再需要手动在`Providers`中加入`  NzContextMenuService,NzMessageService,NzNotificationService`



## 0.3.4
`2017-06-27`

### Features
* `Popover`卡片内容：增加对原生DOM HTMLElement引用的支持

### Bug Fixes
* `Popover`修复removeChild移除不存在元素时报错的问题


## 0.3.3
`2017-06-10`

### Features
* `Select`组件支持位置选项
* `ContextMenu`右键菜单组件位置自动调整
* `Checkbox Group`组件支持nzDisable属性
* `Directory`组件动画时间调整


### Bug Fixes
* `Table`组件PageSizeChange属性在ViewInit之前不再会被触发
* `Tabs`修复组件使用NgIf初始化时Change After View Check的bug


## 0.3.2

`2017-05-26`

### Features
* 增加`Slider`组件，感谢 @凌亦 提供
* `Graph`组件支持`ForeignObject`自动计算高度
* `Monaco Editor`组件支持动态调整字体、主题、换行等选项

### Bug Fixes
* 修复`Input`组件首次传值是调用`OnChanges`的Bug
* 修复`Dir`组件Focus样式的Bug
* 修复`DropDown`组件在首页使用时的Bug

## 0.3.1-beta.0

`2017-05-11`

### Features
* 增加`G2`图表组件
* 增加`Carousel`组件
* 增加`Card`组件
* `Menu`组件增加`nzClickActive`属性
* `Select`组件增加远程搜索示例

### Bug Fixes
* 修复`Menu`在disable状态下点击样式，修复子菜单点击收起的bug
* 修复`Steps`组件样式bug
* 修复`Select`多选状态下初始化数据动画效果，支持更多异步加载环境

## 0.3.0

`2017-05-09`

### Features
* 与`ant design 2.9.3`同步样式
* 新增`Layout`组件
* 新增`Menu`组件
* 新增`Dropdown`组件
* 新增`Breadcrumb`组件
* `Button`新增`Danger`按钮，改变`Ghost按钮`的使用方式
* `Col`修改`gutter`生效逻辑，仅当父节点`Row`设置`gutter`后生效
* `Input`新增`search`类型，增加`prefix`与`suffix`标签功能
* `Checkbox`增加`nzIndeterminate`属性
* `Badge`组件重写，增加状态点功能
* `Calendar`组件增加自定义渲染数据功能

### BREAKING CHANGES
* 根组件必须加入`nz-root`标签，不再需要手动引入`iconfont.css`文件，加入`nz-root`后不再必须引入`nz-notifications`、`nz-messages`和`nz-context-menu`插座
* `Input`组件前置/后置标签使用方式修改，参照最新Demo
* `Badge`组件包含数据方式修改，参照最新Demo


## 0.2.0

`2017-04-24`

### BREAKING CHANGES
* 升级到Angular `4.0`版本，如果要使用Angular`2.x`请使用`0.2.0`之前的版本
* 修改了`nz-ace`与`nz-monaco-editor`的引入方法
* 修改`nzModalSubject`的名称为`NzModalSubject`，规范了所有component的命名方式

## 0.1.9

`2017-04-20`

* 增加iconfont文件引入说明
* 增加`nz-dir`组件的替换模板功能

## 0.1.8

`2017-03-24`

* 修改发布逻辑，当前npm发布包不再包含less文件
* 增加`nz-graph`组件的编辑功能

## 0.1.7

`2017-03-21`

* 增加`nz-graph`组件，增加复杂图显示模块
* 修复部分bug


## 0.1.6

`2017-03-08`

* 修复了`select`组件，在多选状态下Enter键入的bug
* 移除了部分不必要的引入

## 0.1.5

`2017-03-07`

* 新增了`nz-dir`组件，用于进行文件和文件夹管理
* 修复了`nz-dir`组件样式bug

## 0.1.3

`2017-02-26`

* 修复`nz-input-number`在非focus时的校验
* 配合`@angular/cli`至`1.0.0-rc0`，升级步骤见`https://github.com/angular/angular-cli/blob/master/CHANGELOG.md`

## 0.1.1

`2017-02-15`

* `modal-confirm`中增加maskCloseable选项
* 增加`context-menu`在LazyLoad中的使用规范
* 增加`nz-message`在LazyLoad中的使用规范
* 增加`nz-notification`在LazyLoad中的使用规范

## 0.1.0

`2017-02-13`

* 完善monaco-editor组件
* 兼容`@angular/cli`到`1.0.0@beta.31`

## 0.0.9

`2017-02-08`

* 添加monaco-editor组件
* 修改nz-steps文件，兼容webpack打包方式

## 0.0.8

`2017-02-06`

* 兼容至angular`2.4.6`版本
* @angular/cli代替angular-cli
* 支持LazyLoad和PreLoad方式加载
* 修复popover及popconfirm在2.4.6下typescript支持bug

## 0.0.7

`2017-01-17`

* 修复Tabs标签页组件

## 0.0.6

`2017-01-16`

* 兼容angular 2.4.3
* 兼容angular-cli@@1.0.0-beta.25.5
* 修复webpack raw loader

## 0.0.5

`2017-01-12`

* 增加Steps组件
* 修复Progress组件

## 0.0.4

`2017-01-12`

* 修复button group展示问题
* 增加Progress组件
* iconfont目录切换至本地


## 0.0.3

`2017-01-11`

* 与[ant.design 2.6.0](http://antd.alipay.net/changelog-cn#2.6.0)同步UI样式
* 重写DEMO站点样式

## 0.0.2

`2016-12-25`

* 启用angular-cli作为默认脚手架工具
* 支持AoT编译
* 加入单元测试
* 加入protractor e2e测试

## 0.0.1

`2016-12-08`

* 从NAZA-UI迁移成功
