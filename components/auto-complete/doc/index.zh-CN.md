---
category: Components
type: 数据录入
title: AutoComplete
subtitle: 自动完成
cover: 'https://gw.alipayobjects.com/zos/alicdn/qtJm4yt45/AutoComplete.svg'
description: 输入框自动完成功能。
---

## 何时使用

需要自动完成时。

## API

```html
<input nz-input [(ngModel)]="value" [nzAutocomplete]="auto" />
<nz-autocomplete [nzDataSource]="['12345', '23456', '34567']" #auto></nz-autocomplete>
```

```html
<input nz-input [(ngModel)]="value" [nzAutocomplete]="auto" />
<nz-autocomplete #auto>
  <nz-auto-option [nzValue]="'12345'">12345</nz-auto-option>
  <nz-auto-option [nzValue]="'23456'">23456</nz-auto-option>
  <nz-auto-option [nzValue]="'34567'">34567</nz-auto-option>
</nz-autocomplete>
```

### [nzAutocomplete]

| 属性               | 说明                         | 类型                      | 默认值 |
| ------------------ | ---------------------------- | ------------------------- | ------ |
| `[nzAutocomplete]` | 用于绑定 nzAutocomplete 组件 | `NzAutocompleteComponent` | -      |

### nz-autocomplete

| 属性                           | 说明                                                                                          | 类型                            | 默认值                          |
| ------------------------------ | --------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------- |
| `[nzBackfill]`                 | 使用键盘选择选项的时候，会把当前高亮项的值即时回填到输入框中                                  | `boolean`                       | `false`                         |
| `[nzDataSource]`               | 自动完成的数据源                                                                              | `AutocompleteDataSource`        | -                               |
| `[nzDefaultActiveFirstOption]` | 是否默认高亮第一个选项。                                                                      | `boolean`                       | `true`                          |
| `[nzWidth]`                    | 自定义宽度单位 px                                                                             | `number`                        | 触发元素宽度                    |
| `[nzOverlayClassName]`         | 下拉根元素的类名称                                                                            | `string`                        | -                               |
| `[nzOverlayStyle]`             | 下拉根元素的样式                                                                              | `object`                        | -                               |
| `[compareWith]`                | 与 [SelectControlValueAccessor](https://angular.cn/api/forms/SelectControlValueAccessor) 相同 | `(o1: any, o2: any) => boolean` | `(o1: any, o2: any) => o1===o2` |

### nz-auto-option

| 属性           | 说明                        | 类型      | 默认值  |
| -------------- | --------------------------- | --------- | ------- |
| `[nzValue]`    | 绑定到触发元素 ngModel 的值 | `any`     | -       |
| `[nzLabel]`    | 填入触发元素显示的值        | `string`  | -       |
| `[nzDisabled]` | 禁用选项                    | `boolean` | `false` |

## FAQ

### Q：滚动时浮层元素没有跟随滚动位置

默认情况下，浮层元素使用 `body` 作为滚动容器，如果使用了其他滚动容器，在自定义滚动容器元素上添加 [CdkScrollable](https://material.angular.dev/cdk/scrolling/api#CdkScrollable) 指令。
注意：您需要从 `@angular/cdk/scrolling` 导入 `CdkScrollable` 指令或 `ScrollingModule` 模块。
