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
## 12.1.1

`2021-12-18`

### Bug Fixes

* **date-picker,time-picker:** 禁用自动填充 autocomplete 属性 ([#7088](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7088)) ([bddc537](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bddc537f6f64b6697f95ef421c634045656e4903)), closes [#6718](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6718)
* **popconfirm:** 修复箭头丢失样式 ([#7086](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7086)) ([3f4a704](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3f4a704fc126a3c1ccfe92ae0f045062f00fd1e8))
* **timeline:** 清空数据时重置组件状态 ([#7109](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7109)) ([0ece612](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0ece6123a586c96a6178e2ba939b9451c031bc14))


### Performance Improvements

* **carousel:** `keydown` 事件取消不必要的脏值检测 ([#7097](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7097)) ([ca3299e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca3299ea5b00c7075d93871ec418e1527d390f8b))
* **cascader:** `keydown` 事件取消不必要的脏值检测 ([#7060](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7060)) ([9a37718](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9a37718d42ac05288393d7c7d9db4204ba7e640e))
* **date-picker:** 点击 `date-range-popup` 取消不必要的脏值检测 ([#7096](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7096)) ([8f8c71b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8f8c71b1aedd10ecd50c48d802835bd235f0f2ee))
* **date-picker:** 修复内存泄漏问题 ([#7113](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7113)) ([fe9070a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fe9070aaf486b50b231b19ee55bfc0b4907a98a2))
* **icon:** 切换图标时取消不必要的脏值检测 ([#7071](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7071)) ([e998e4a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e998e4abef73f34783aa63e88e9f0adadc8301e7))
* **mention:** `mousedown` 事件取消不必要的脏值检测 ([#7094](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7094)) ([0d4ad23](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0d4ad23a1722a01974c29c4b9f13eeff70c40df5))
* **switch:** 减少触发脏值检测 ([#7105](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7105)) ([6d9b1ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d9b1fff55bcb3d8a6c5ef2b9250cfcee6ce6039))
* **table:** `nz-filter-trigger` 点击事件取消不必要的脏值检测 ([#7095](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7095)) ([346c50d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/346c50d0a5b19160d51c8c6a3e61a389b4b92a52))
* **time-picker:** 滚动时取消不必要的脏值检测 ([#7063](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7063)) ([baf7f0a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/baf7f0a85ef386a4ebe9bef553e532e501129f6e))
* **time-picker:** panel 被点击取消不必要的脏值检测 ([#7126](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7126)) ([76da3ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/76da3ff9f6a64fb854999f3ef30c45980c3b6b7b))
* **tree:** 节点点击时取消不必要的脏值检测 ([#7128](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7128)) ([55f1e04](https://github.com/NG-ZORRO/ng-zorro-antd/commit/55f1e047b32597397c42c779409beff7ab13b1f7))

## 12.1.0

`2021-11-30`

### Bug Fixes

* **tabs:** 修复可编辑标签页全部删除后无法继续添加问题  ([#7076](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7076)) ([3709b73](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3709b735094edf2960b5bec8f2a565619d6f5361)), closes [#7077](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7077)
* **tree-view:** 修复未定义的 `trackBy` ([#7085](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7085)) ([891a622](https://github.com/NG-ZORRO/ng-zorro-antd/commit/891a622ef54b52bdffad894258824926ce25d28d))
* **tree-view:** 修复数据源中的数据发生变化时组件不更新问题 [#7040](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7040) ([#7083](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7083)) ([cad8ca0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cad8ca038067b9c2874a8c3c6e351f46e13c4609))


### Features

* **core,dropdown,table::** 组件新增 nzBackdrop 全局配置 ([#6783](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6783)) ([2f7c44d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2f7c44dc1445d9a88c501e6e114507ed28ae33ae))
* **tooltip:** 支持通过设置 nzTooltipArrowPointAtCenter 箭头将指向目标元素的中心 ([#7010](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7010)) ([7fac8eb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7fac8eb5b1e1c17dbfbf940827f1ca53dae8d5e4))
* **tooltip:** 支持提示文字模板上下文渲染 ([#6948](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6948)) ([fec40a8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fec40a8a1bba792e5722f4facda56412f200f6b2)), closes [#6607](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6607)


### Performance Improvements

* **auto-complete:** `nz-auto-option` 下 `mousedown` 和 `mouseenter` 事件无需触发脏值检测 ([#7048](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7048)) ([d6ca43e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d6ca43e4f78b5b4f6b1407a0012cd806865e9e4d))
* **core:** 滚动时无需触发脏值检测 ([#7062](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7062)) ([a972d7b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a972d7b3986dae613e35dda13667c672878d75b4))
* **graph:** 点击事件减少触发脏值检测 ([#7056](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7056)) ([1e2960a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e2960a855991a380e44a52c31255781830c7043))
* **graph:** 解决缩略图内存泄漏问题 ([#7052](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7052)) ([f93960c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f93960c62cd5598882a98a4e6c6b78f6dbf9f77b))
* **modal:** 元素聚焦时无需触发脏值检测 ([#7070](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7070)) ([ffcb709](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ffcb7095873a87243ff44edd3719ce2c04c6957e))
* **radio:** 减少触发脏值检测 ([#7068](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7068)) ([b8cc94f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b8cc94feeb8517337d4df12f4bf737a7848aa04a))
* **resizable:** 减少触发脏值检测 ([#7036](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7036)) ([5cad154](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5cad154496851e390296830dce7d2321092fd2fc))
* **select:** `nz-select-top-control` 减少触发脏值检测 ([#7038](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7038)) ([d45f0ab](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d45f0abc4993002f1058c3f8753930591d886c9b))
* **upload:** `nz-upload-btn` 取消不必要的脏值检测 ([#7037](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7037)) ([7e587d1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e587d13b382150f8f98c5f58dead14dc3ba24a7))
* **upload:** 组件销毁时预览图片应该可取消 ([#7067](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7067)) ([8f21ef1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8f21ef1d79e3545d01ebb877f9e1a094f06f1a01))

## 12.0.2

`2021-11-04`

### Bug Fixes

* **core:** 纠正 `hidden` 属性行为 ([#6919](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6919)) ([987b1ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/987b1ca675282febb274991f4d8d52f58c623e8d)), closes [#6918](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6918)
* **pagination:** 修复分页组件错误的省略号 ([#6793](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6793)) ([9700e89](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9700e89690f2a2a28e84a35f3e800f60d5d72ab1))
* **affix:** 目标元素大小调整时更新固钉位置状态 ([#6896](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6896)) ([d18a8ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d18a8ae24a0a088de06101b1d0d060e84df29b15)), closes [#6764](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6764)
* **date-picker:** 修复错误的按钮类型导致在表单中触发提交的问题 ([#7013](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7013)) ([d69d374](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d69d37469bb260b1375d6005acb217ca4ec4215f)), closes [#7012](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7012)
* **date-picker:** 修复日期选择框内联模式下重新打开时无法展示问题 ([#6910](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6910)) ([d392b2e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d392b2e95365a0ffec0fa5dcef39ba7f611b2432))
* **i18n:** 更新 `DatePicker` en_GB.ts 国际化文案 ([#6982](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6982)) ([f89cb38](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f89cb38a1c2a5b99460b837f001a39005212352d)), closes [#6979](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6979)
* **modal:** 修复模态框底部按钮 `onClick` 返回 Promise 未抛出错误问题 ([#6928](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6928)) ([3277d22](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3277d22ec3368d7f28a5143a5cec44357dedcdb3))
* **popconfirm:** 支持 `nzOkDanger` 确认按钮是否为危险按钮属性 ([#6866](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6866)) ([d889e98](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d889e98e935f7e7c66e10068fd2665181a9e9975))
* **table:** 加载状态时显示空状态 ([#6934](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6934)) ([013beda](https://github.com/NG-ZORRO/ng-zorro-antd/commit/013bedaf9856931b37c01e9aa24cf63cdb1be9b8))
* **timepicker:** 修复设置 `nzDefaultOpenValue` 时确认按钮未正确赋值问题 ([#6941](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6941)) ([daf9f57](https://github.com/NG-ZORRO/ng-zorro-antd/commit/daf9f5712c11a4b4fdbb1da1eab23c2667398e96))
* **timepicker:** 修复时间选择组件在页面底部时位置被遮挡问题 ([#6939](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6939)) ([65fdbc8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/65fdbc8a5442fed0d4b131ff8147b5b8f10f9f38))
* **tooltip:** 修复 tooltip 部分场景下无法聚焦触发问题 ([#6965](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6965)) ([78c16a2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/78c16a2794f5e5c2f5098c83ea540c88dd9d6d98)), closes [#6955](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6955)


### Performance Improvements

* **autocomplete:** 解决内存泄漏问题 ([#6851](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6851)) ([e61e350](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e61e350874d380cdc68bd6c8dee0f5de358c4c79))
* **breadcrumb:** 当调用 `navigate` 时，不要重新进入 NgZone ([#6850](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6850)) ([830a1f2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/830a1f259e4b51ffcfb82f98974fc9ae52dbfef7))
* **button:** `disabled` 状态点击事件不需要进行脏值检测 ([#6849](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6849)) ([85c79f6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/85c79f652a022dee5c6f57042c856280cc6f23db))
* **core:** 解决内存泄漏问题 ([#6852](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6852)) ([25eb0fe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/25eb0fe90cf981c0ddddceac8f98dfcef6f60f8f))
* **code-editor:** 确保 Monaco Editor 仅被加载一次 ([#7033](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7033)) ([e1eafec](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e1eafecaba7235faa8819cae2ab5607c41572b3c))
* **image:** 解决内存泄漏问题 ([#6856](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6856)) ([6744eb1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6744eb1ac836637563c8ffea1b864502721711d6))
* **select:** `triggerWidth` 未改变不执行脏值检测 ([#6858](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6858)) ([055f4a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/055f4a12679a1538ada58d7d9460694f67b156f5))
* **table:** 解决内存泄漏问题 ([#7034](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7034)) ([cfa1ecd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cfa1ecdb419ec619a196f69cca50fbc92aa61134))
* **upload:** 优化脏值检测时机 ([#7032](https://github.com/NG-ZORRO/ng-zorro-antd/issues/7032)) ([47f91c7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/47f91c77a79ad85e36eb318617b12f548bb56b1f))

## 12.0.1

`2021-07-12`

### Bug Fixes

* **code-editor:** 组件销毁时 dispose 编辑器的事件监听 ([#6847](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6847)) ([503c6f9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/503c6f90b81aed268ec08ce301b8c71f3a479617))
* **code-editor:** 解决 SSR 下内存泄露的问题 ([#6846](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6846)) ([6d43b6c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d43b6c5a9ccf8603106716285a1c032608912d6))
* **code-editor:** 只在 value 发生改变时再进入 `ngZone`  ([##6845](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6845)) ([5c09948](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5c09948ca5e0e70bf7e4d1b4246225999060a930))
* **drawer:** 只有在 `nzOnViewInit` 被监听时再触发 ([#6841](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6841)) ([c5b5741](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c5b5741a0ffaaf50b4e558faf99691977c967426))
* **icon:** 解决内存泄露的问题 ([#6839](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6839)) ([bdc2a55](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bdc2a55e8421b49d80245d3a5a714adf38f58140))
* 移除默认的 resize observer polyfill ([#6843](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6843)) ([29d44af](https://github.com/NG-ZORRO/ng-zorro-antd/commit/29d44afb058cb5d78f236cdfa57be5018b49dc02)), closes [#6696](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6696)

如果你想支持老浏览器，你可以像下面这样提供 polyfill。

```ts
import { NzResizeObserverFactory } from 'ng-zorro-antd/cdk/resize-observer';
import ResizeObserver from 'resize-observer-polyfill';

@NgModule({
  providers: [
    { provide: NzResizeObserverFactory, useValue: {
        create(callback: ResizeObserverCallback): ResizeObserver | null {
          return typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(callback);
        }
      }
    }
  ]
})
export class AppModule {}
```


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
