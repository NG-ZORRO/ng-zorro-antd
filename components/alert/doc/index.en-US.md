---
category: Components
type: Feedback
title: Alert
---

Alert component for feedback.

## When To Use

- When you need to show alert messages to users.
- When you need a persistent static container which is closable by user actions.

## API

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| nzBanner | Whether to show as banner | boolean | false |
| nzClosable | Whether Alert can be closed | boolean | - |
| nzCloseText | Close text to show | string｜`TemplateRef<void>` | - |
| nzDescription | Additional content of Alert | string｜`TemplateRef<void>` | - |
| nzMessage | Content of Alert | string｜`TemplateRef<void>` | - |
| nzShowIcon | Whether to show icon | boolean | false, in `nzBanner` mode default is true |
| nzIconType | Icon type, effective when `nzShowIcon` is `true` | `string 丨 string[] 丨 Set<string> 丨 { [klass: string]: any; };` | - |
| nzType | Type of Alert styles, options: `success`, `info`, `warning`, `error` | string | `info`, in `banner` mode default is `warning` |
| nzOnClose | Callback when Alert is closed | Function | - |
