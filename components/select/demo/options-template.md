---
order: 27
title:
  zh-CN: 选项模板
  en-US: Option Template
---

## zh-CN

选项的 `label` 可以是一个模板，该选项连同 `nzCustomTemplate` 使用的 `nz` 前缀字段会作为模板的上下文传入。将 `NzSelectOptionLabelContext` 传给 `nzTypeHint`，即可在模板中获得类型检查与代码补全。

## en-US

The `label` of an option can be a template, and the option itself is passed to it as context, together with the
`nz`-prefixed fields used by `nzCustomTemplate`. Hand a `NzSelectOptionLabelContext` to `nzTypeHint` to get type
checking and completion inside the template.
