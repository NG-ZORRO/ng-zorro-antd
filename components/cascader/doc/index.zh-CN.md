---
category: Components
type: 数据录入
title: Cascader
subtitle: 级联选择
cover: 'https://gw.alipayobjects.com/zos/alicdn/UdS8y8xyZ/Cascader.svg'
description: 级联选择框。
---

## 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
- 比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。

## API

```html
<nz-cascader [nzOptions]="options" [(ngModel)]="values"></nz-cascader>
```

### nz-cascader

| 参数                  | 说明                                                                                       | 类型                                                                  | 默认值         | 支持全局配置 |
| --------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- | -------------- | ------------ |
| `[ngModel]`           | 指定选中项                                                                                 | `any[]`                                                               | -              |
| `[nzAllowClear]`      | 是否支持清除                                                                               | `boolean`                                                             | `true`         |
| `[nzAutoFocus]`       | 是否自动聚焦，当存在输入框时                                                               | `boolean`                                                             | `false`        |
| `[nzBackdrop]`        | 浮层是否应带有背景板                                                                       | `boolean`                                                             | `false`        |
| `[nzChangeOn]`        | 点击父级菜单选项时，可通过该函数判断是否允许值的变化                                       | `(option: any, index: number) => boolean`                             | -              |
| `[nzChangeOnSelect]`  | 当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的演示                         | `boolean`                                                             | `false`        |
| `[nzColumnClassName]` | 自定义浮层列类名                                                                           | `string`                                                              | -              |
| `[nzDisabled]`        | 禁用                                                                                       | `boolean`                                                             | `false`        |
| `[nzExpandIcon]`      | 自定义次级菜单展开图标                                                                     | `string \| TemplateRef<void>`                                         | -              |
| `[nzExpandTrigger]`   | 次级菜单的展开方式，可选 `'click'` 和 `'hover'`                                            | `'click' \| 'hover'`                                                  | `'click'`      |
| `[nzLabelProperty]`   | 选项的显示值的属性名                                                                       | `string`                                                              | `'label'`      |
| `[nzLabelRender]`     | 选择后展示的渲染模板                                                                       | `TemplateRef<any>`                                                    | -              |
| `[nzLoadData]`        | 用于动态加载选项。如果提供了`ngModel`初始值，且未提供`nzOptions`值，则会立即触发动态加载。 | `(option: any, index?: index) => PromiseLike<any> \| Observable<any>` | -              |
| `[nzMenuClassName]`   | 自定义浮层类名                                                                             | `string`                                                              | -              |
| `[nzMenuStyle]`       | 自定义浮层样式                                                                             | `object`                                                              | -              |
| `[nzMouseEnterDelay]` | 鼠标进入触发器后打开浮层的延迟时间（毫秒）                                                 | `number`                                                              | `150`          |
| `[nzMouseLeaveDelay]` | 鼠标离开触发器后关闭浮层的延迟时间（毫秒）                                                 | `number`                                                              | `150`          |
| `[nzMultiple]`        | 是否支持多选                                                                               | `boolean`                                                             | `false`        |
| `[nzNotFoundContent]` | 当下拉列表为空时显示的内容                                                                 | `string \| TemplateRef<void>`                                         | -              |
| `[nzOptionRender]`    | 选项的渲染模板                                                                             | `TemplateRef<{ $implicit: NzCascaderOption, index: number }>`         |                |
| `[nzOptions]`         | 可选项数据源                                                                               | `object[]`                                                            | -              |
| `[nzOpen]`            | 控制浮层显隐                                                                               | `boolean`                                                             | `false`        |
| `[nzPlaceHolder]`     | 输入框占位文本                                                                             | `string`                                                              | `'请选择'`     |
| `[nzPlacement]`       | 浮层弹出位置                                                                               | `'bottomLeft' \| 'bottomRight' \| 'topLeft' \| 'topRight'`            | `'bottomLeft'` |
| `[nzShowArrow]`       | 是否显示箭头                                                                               | `boolean`                                                             | `true`         |
| `[nzShowInput]`       | 显示输入框                                                                                 | `boolean`                                                             | `true`         |
| `[nzShowSearch]`      | 是否支持搜索，默认情况下对 `label` 进行全匹配搜索，不能和 `[nzLoadData]` 同时使用          | `boolean \| NzShowSearchOptions`                                      | `false`        |
| `[nzSize]`            | 输入框大小，可选 `large` `default` `small`                                                 | `'large' \| 'small' \| 'default'`                                     | `'default'`    | ✅           |
| `[nzStatus]`          | 设置校验状态                                                                               | `'error' \| 'warning'`                                                | -              |
| `[nzPrefix]`          | 自定义的选择框前缀                                                                         | `string \| TemplateRef<void>`                                         | -              |
| `[nzSuffixIcon]`      | 自定义的选择框后缀图标                                                                     | `string \| TemplateRef<void>`                                         | -              |
| `[nzValueProperty]`   | 选项的实际值的属性名                                                                       | `string`                                                              | `'value'`      |
| `[nzVariant]`         | 形态变体                                                                                   | `'outlined' \| 'borderless' \| 'filled' \| 'underlined'`              | `'outlined'`   | ✅           |
| `(ngModelChange)`     | 值发生变化时触发                                                                           | `EventEmitter<any[]>`                                                 | -              |
| `(nzClear)`           | 清除值时触发                                                                               | `EventEmitter<void>`                                                  | -              |
| `(nzVisibleChange)`   | 菜单浮层的显示/隐藏                                                                        | `EventEmitter<boolean>`                                               | -              |
| `(nzRemoved)`         | 多选模式下，移除值时触发                                                                   | `EventEmitter<NzCascaderOption>`                                      | -              |
| `(nzSelectionChange)` | 值发生变化时触发                                                                           | `EventEmitter<NzCascaderOption[]>`                                    | -              |

### Interfaces

#### NzCascaderOption

```ts
export interface NzCascaderOption {
  value?: any;
  label?: string;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  isLeaf?: boolean;
  children?: NzCascaderOption[];
  disableCheckbox?: boolean;

  [key: string]: any;
}
```

#### NzShowSearchOptions

```ts
export type NzShowSearchOptions =
  | boolean
  | {
      filter?: NzCascaderFilter;
      sorter?: NzCascaderSorter;
    };
```

`nzShowSearch` 为对象时需遵守 `NzShowSearchOptions` 接口：

| 参数     | 说明                                                           | 类型                                                                         | 默认值 |
| -------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------ |
| `filter` | 可选，选择是否保留选项的过滤函数，每级菜单的选项都会被匹配     | `(inputValue: string, path: NzCascaderOption[]): boolean`                    | -      |
| `sorter` | 可选，按照到每个最终选项的路径进行排序，默认按照原始数据的顺序 | `(a: NzCascaderOption[], b: NzCascaderOption[], inputValue: string): number` | -      |

默认的 filter 如下所示：

```ts
const defaultFilter: NzCascaderFilter = (i, p) => {
  return p.some(o => {
    const label = o.label;
    return !!label && label.indexOf(i) !== -1;
  });
};
```

如果你想要在搜索时忽略大小写，就可以编写一个这样的 filter 函数：

```ts
const filter: NzCascaderFilter = (i, p) => {
  return p.some(o => {
    const label = o.label;
    return !!label && label.toLowerCase().indexOf(i.toLowerCase()) !== -1;
  });
};
```

#### 方法

| 名称          | 描述     |
| ------------- | -------- |
| `blur()`      | 移除焦点 |
| `focus()`     | 获取焦点 |
| `closeMenu()` | 隐藏菜单 |

> 注意，如果需要获得中国省市区数据，可以参考 [china-division](https://gist.github.com/afc163/7582f35654fd03d5be7009444345ea17)。

## FAQ

### Q: 为什么使用 `nzLoadData` 时报了一个错误 this === undefined ？

对传递给 Cascader 组件的 `nzLoadData` 参数会成为 `NzCasacderComponent` 对象的一个属性，调用这个函数时，函数中的 `this` 没有指向任何对象。
因此，正确的做法是传递剪头函数，或者使用 `Function.bind` 将 `nzLoadData` 参数和你的对象绑定。
[这里](https://stackoverflow.com/questions/60320913/ng-zorro-cascader-lazy-load-data-nzloaddata-function-got-this-undefined/60928983#60928983)是一个比较有代表性的例子。
