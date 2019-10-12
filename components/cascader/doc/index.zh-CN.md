---
category: Components
type: 数据录入
title: Cascader
subtitle: 级联选择
---

级联选择框。

## 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
- 比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。

## 单独引入此组件

想要了解更多关于单独引入组件的内容，可以在[快速上手](/docs/getting-started/zh#单独引入某个组件)页面进行查看。

```ts
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
```

## API

```html
<nz-cascader [nzOptions]="options" [(ngModel)]="values"></nz-cascader>
```

### nz-cascader

| 参数 | 说明 | 类型 | 默认值 | 支持全局配置 |
| --- | --- | --- | --- | --- |
| `[ngModel]` | 指定选中项 | `any[]` | - |
| `[nzAllowClear]` | 是否支持清除 | `boolean` | `true` |
| `[nzAutoFocus]` | 是否自动聚焦，当存在输入框时 | `boolean` | `false` |
| `[nzChangeOn]` | 点击父级菜单选项时，可通过该函数判断是否允许值的变化 | `(option: any, index: number) => boolean` | - |
| `[nzChangeOnSelect]` | 当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的演示 | `boolean` | `false` |
| `[nzColumnClassName]` | 自定义浮层列类名 | `string` | - |
| `[nzDisabled]` | 禁用 | `boolean` | `false` |
| `[nzExpandTrigger]` | 次级菜单的展开方式，可选 'click' 和 'hover' | `'click'\|'hover'` | `'click'` |
| `[nzMenuClassName]` | 自定义浮层类名 | `string` | - |
| `[nzMenuStyle]` | 自定义浮层样式 | `object` | - |
| `[nzNotFoundContent]` | 当下拉列表为空时显示的内容 | `string\|TemplateRef<void>` | - |
| `[nzLabelProperty]` | 选项的显示值的属性名 | `string` | `'label'` |
| `[nzLabelRender]` | 选择后展示的渲染模板 | `TemplateRef<any>` | - |
| `[nzOptionRender]` | 选项的渲染模板 | `TemplateRef<{ $implicit: NzCascaderOption, index: number }>` | | 
| `[nzLoadData]` | 用于动态加载选项。如果提供了`ngModel`初始值，且未提供`nzOptions`值，则会立即触发动态加载。 | `(option: any, index?: index) => PromiseLike<any>` | - |
| `[nzOptions]` | 可选项数据源 | `object[]` | - |
| `[nzPlaceHolder]` | 输入框占位文本 | `string` | `'请选择'` |
| `[nzShowArrow]` | 是否显示箭头 | `boolean` | `true` |
| `[nzShowInput]` | 显示输入框 | `boolean` | `true` |
| `[nzShowSearch]` | 是否支持搜索，默认情况下对 `label` 进行全匹配搜索，不能和 `[nzLoadData]` 同时使用 | `boolean\|NzShowSearchOptions` | `false` |
| `[nzSize]` | 输入框大小，可选 `large` `default` `small` | `'large'\|'small'\|'default'` | `'default'` | ✅ |
| `[nzValueProperty]` | 选项的实际值的属性名 | `string` | `'value'` |
| `(ngModelChange)` | 值发生变化时触发 | `EventEmitter<any[]>` | - |
| `(nzVisibleChange)` | 菜单浮层的显示/隐藏 | `EventEmitter<boolean>` | - |
| `(nzSelectionChange)` | 值发生变化时触发 | `EventEmitter<NzCascaderOption[]>` |- |

`nzShowSearch` 为对象时需遵守 `NzShowSearchOptions` 接口：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `filter` | 可选，选择是否保留选项的过滤函数，每级菜单的选项都会被匹配 | `(inputValue: string, path: NzCascaderOption[]): boolean` | - |
| `sorter` | 可选，按照到每个最终选项的路径进行排序，默认按照原始数据的顺序 | `(a: NzCascaderOption[], b: NzCascaderOption[], inputValue: string): number` | - |

#### 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |
| closeMenu() | 隐藏菜单 |


> 注意，如果需要获得中国省市区数据，可以参考 [china-division](https://gist.github.com/afc163/7582f35654fd03d5be7009444345ea17)。
