---
category: Components
type: Data Entry
title: Mention
cover: 'https://gw.alipayobjects.com/zos/alicdn/jPE-itMFM/Mentions.svg'
description: Used to mention someone or something in an input.
---

## When To Use

When need to mention someone or something.

## API

```html
<nz-mention [nzSuggestions]="suggestions">
  <textarea nz-input [(ngModel)]="value" nzMentionTrigger> </textarea>
</nz-mention>
```

### nz-mention

| Property                | Description                                                                               | Type                                                     | Default                          | Version |
| ----------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------- | ------- |
| `[nzMentionTrigger]`    | Trigger element **(required)**                                                            | `HTMLTextAreaElement \| HTMLInputElement`                | -                                |
| `[nzMentionSuggestion]` | Customize the suggestion template                                                         | `TemplateRef<any>`                                       | -                                |
| `[nzLoading]`           | Loading mode                                                                              | `boolean`                                                | `false`                          |
| `[nzNotFoundContent]`   | Suggestion when suggestions empty                                                         | `string`                                                 | `'无匹配结果，轻敲空格完成输入'` |
| `[nzPlacement]`         | The position of the suggestion relative to the target, which can be one of top and bottom | `'button' \| 'top'`                                      | `'bottom'`                       |
| `[nzPrefix]`            | Character which will trigger Mention to show mention list                                 | `string \| string[]`                                     | `'@'`                            |
| `[nzSuggestions]`       | Suggestion content                                                                        | `any[]`                                                  | `[]`                             |
| `[nzStatus]`            | Set validation status                                                                     | `'error' \| 'warning'`                                   | -                                |
| `[nzAllowClear]`        | If allow to remove mentions content with clear icon                                       | `boolean`                                                | `false`                          | 20.3.0  |
| `[nzClearIcon]`         | The custom clear icon                                                                     | `TemplateRef<void>`                                      | -                                | 20.3.0  |
| `[nzVariant]`           | Variants of Input                                                                         | `'outlined' \| 'filled' \| 'borderless' \| 'underlined'` | `'outlined'`                     | 20.3.0  |
| `[nzValueWith]`         | Function that maps an suggestion's value                                                  | `(any) => string \| (value: string) => string`           |
| `(nzOnSelect)`          | Callback function called when select from suggestions                                     | `EventEmitter<any>`                                      | -                                |
| `(nzOnSearchChange)`    | Callback function called when search content changes                                      | `EventEmitter<MentionOnSearchTypes>`                     | -                                |
| `(nzOnClear)`           | Callback function called when click on clear button                                       | `EventEmitter<void>`                                     | -                                |

#### Methods

| Name        | Description                                             |
| ----------- | ------------------------------------------------------- |
| getMentions | Get the mentions array in the `input[nzMentionTrigger]` |

### nzMentionTrigger

Trigger element

```html
<nz-mention>
  <textarea nzMentionTrigger></textarea>
</nz-mention>
```

```html
<nz-mention>
  <input nzMentionTrigger />
</nz-mention>
```

### nzMentionSuggestion

Customize the suggestion template

```html
<nz-mention [nzSuggestions]="items" [nzValueWith]="valueWith">
  <input nz-input nzMentionTrigger />
  <ng-container *nzMentionSuggestion="let item">
    <span>{{ item.label }} - {{ item.value }}</span>
  </ng-container>
</nz-mention>
```

### MentionOnSearchTypes

| Property | Description    | Type     | Default |
| -------- | -------------- | -------- | ------- |
| value    | Search keyword | `string` | -       |
| prefix   | prefix         | `string` | -       |

## FAQ

### Q: The overlay layer element does not follow the scroll position when scrolling

By default, the overlay layer element uses body as the scroll container. If using another scroll container, add the [CdkScrollable](https://material.angular.dev/cdk/scrolling/api#CdkScrollable) directive to the custom scroll container element.
Note: You need to import the `CdkScrollable` directive or `ScrollingModule` module from `@angular/cdk/scrolling`.
