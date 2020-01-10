---
category: Components
type: Other
title: Divider
---

A divider line separates different content.

## When To Use

- Divide sections of article.
- Divide inline text and links such as the operation column of table.

```ts
import { NzDividerModule } from 'ng-zorro-antd/divider';
```

## API

### nz-divider

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[nzDashed]` | whether line is dasded | `boolean` | `false` |
| `[nzType]` | direction type of divider | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `[nzText]` | inner text of divider | `string \| TemplateRef<void>` | - |
| `[nzOrientation]` | inner text orientation | `'center' \| 'left' \| 'right'` | `'center'` |
