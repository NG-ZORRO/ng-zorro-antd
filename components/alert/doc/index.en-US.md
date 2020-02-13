---
category: Components
type: Feedback
title: Alert
---

Alert component for feedback.

## When To Use

- When you need to show alert messages to users.
- When you need a persistent static container which is closable by user actions.

```ts
import { NzAlertModule } from 'ng-zorro-antd/alert';
```

## API

### nz-alert

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[nzBanner]` | Whether to show as banner | `boolean` | `false` |
| `[nzCloseable]` | Whether Alert can be closed | `boolean` | - | ✅ |
| `[nzCloseText]` | Close text to show | `string \| TemplateRef<void>` | - |
| `[nzDescription]` | Additional content of Alert | `string \| TemplateRef<void>` | - |
| `[nzMessage]` | Content of Alert | `string \| TemplateRef<void>` | - |
| `[nzShowIcon]` | Whether to show icon, in `nzBanner` mode default is `true` | `boolean` | `false` | ✅ |
| `[nzIconType]` | Icon type, effective when `nzShowIcon` is `true` | `string` | - |
| `[nzType]` | Type of Alert styles, in `nzBanner` mode default is `'warning'` | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` |
| `(nzOnClose)` | Callback when Alert is closed | `EventEmitter<void>` | - |
