---
order: 18
title:
  zh-CN: 伊斯兰历月份修正
  en-US: Hijri month overrides
---

## zh-CN

各地实际观月的结果可能与乌姆库拉历表不同。通过 `NZ_HIJRI_MONTH_OVERRIDES` 可以修改单个月份的天数，其后的所有月份会顺延相同的天数。这里提供的是一个 signal，因此修正值可以在运行时更新，重新打开面板即可看到变化。

## en-US

Local moon sighting may differ from the tabular Umm al-Qura calendar. `NZ_HIJRI_MONTH_OVERRIDES`
changes the length of a single month and shifts every following month by the same amount. It is
provided as a signal here, so the overrides can change at runtime; reopen the panel to see it.
