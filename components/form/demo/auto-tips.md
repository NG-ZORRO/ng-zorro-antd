---
order: 11
title:
  zh-CN: 自动提示
  en-US: Auto tips
---

## zh-CN

让提示变得更简单。  
需要预先自定义 `Validators` 和提供 `nzAutoTips`，它们优先级如下：

- `Validators` > `nzAutoTips`
- 通过 `@Input` 设置 `nzAutoTips`
- 通过全局配置设置 `nzAutoTips`

另外，你可以使用 `nzDisableAutoTips` 去禁用它。

> 使用当前的语言环境(`zh-cn`,`en`...)作为 `nzAutoTips` 的 `key` 去查找提示，如果没找到会再用 `default` 查找一次。

## en-US

Make tips to be easy.  
Need to customize `Validators` and provide `nzAutoTips` in advance, the priority is as follows:

- `Validators` > `nzAutoTips`
- Via `@Input` set `nzAutoTips`
- Via global config set `nzAutoTips`

In addition, you can use `nzDisableAutoTips` to disable it.

> Via the current locale (`zh-cn`, `en`...) is used as the `key` of `nzAutoTips` to search for tips. If it is not found, it will be searched again with `default`.
