---
category: Components
type: Data Entry
title: Mention
---

Mention component.

## When To Use

When need to mention someone or something.

## API

```html
<nz-mention [nzSuggestions]="suggestions">
 <textarea
    nz-input
    [(ngModel)]="value"
    nzMentionTrigger>
  </textarea>
</nz-mention>
```

### nz-mention

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| nzMentionTrigger | Trigger element **(required)** | `HTMLTextAreaElement` `HTMLInputElement` | - |
| nzMentionSuggestion | Customize the suggestion template | `TemplateRef<any>` | - |
| nzLoading | Loading mode | `boolean` | `false` |
| nzNotFoundContent | Suggestion when suggestions empty | `string` | `'无匹配结果，轻敲空格完成输入'` |
| nzPlacement | The position of the suggestion relative to the target, which can be one of top and bottom | `'button'` `'top'` | `'bottom'` |
| nzPrefix | Character which will trigger Mention to show mention list | `'string'` `'string[]'` | `'@'` |
| nzSuggestions | Suggestion content | `any[]` | `[]` |
| nzValueWith | Function that maps an suggestion's value  | `(any) => string` | `(value: string) => string` |
| (nzOnSelect) | Callback function called when select from suggestions | `EventEmitter<any>` | - |
| (onSearchChange) | Callback function called when search content changes| `EventEmitter<MentionOnSearchTypes>` | - |

### Methods

| Name | Description |
| --- |--- |
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
 <input nzMentionTrigger>
</nz-mention>
```

### nzMentionSuggestion
Customize the suggestion template

```html
  <nz-mention
    [nzSuggestions]="items"
    [nzValueWith]="valueWith">
    <input nz-input nzMentionTrigger>
    <ng-container *nzMentionSuggestion="let item">
        <span>{{ item.label }} - {{ item.value }}</span>
    </ng-container>
  </nz-mention>
```

### MentionOnSearchTypes

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| value | Search keyword | string | - |
| prefix | prefix | string | - |
