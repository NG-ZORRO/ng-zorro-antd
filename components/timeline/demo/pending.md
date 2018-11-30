---
order: 2
title:
  zh-CN: 最后一个及排序
  en-US: Last node
---

## zh-CN

当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点，当 `nzPending` 为真值时展示幽灵节点，如果 `nzPending` 是 Template 可用于定制该节点内容，同时 `nzPendingDot` 将可以用于定制其轴点。`nzReverse` 属性用于控制节点排序，为 `false` 时按正序排列，为 `true` 时按倒序排列。

## en-US

When the timeline is incomplete and ongoing, put a ghost node at last. set `[nzPending]="true"` or `[nzPending]="a TemplateRef"`. Used in ascend chronological order.
