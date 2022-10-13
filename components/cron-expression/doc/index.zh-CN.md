---
category: Components
subtitle: cron 表单
type: 数据录入
title: Cron Expression
cols: 1
experimental: true
---

<blockquote style="border-color: #faad14;">
<p>NG-ZORRO 实验性功能是指已发布但不稳定或者还未准备好用于生产环境的功能。</p>
<p>开发者或用户可以选择在正式发布前使用这些功能，但是每次发布版本时都可能存在 <strong>breaking changes</strong>。</p>
</blockquote>

## 何时使用

需要在表单中使用 cron 格式验证时使用。

### 引入模块

```ts
import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression';
```

## API

别忘记先安装 cron-parser：

```sh
npm install cron-parser
```

### nz-cron-expression

| 参数      | 说明      | 类型     | 默认值      |
|---------------|-------|-------------|----------|
| `[nzSize]`  | 设置文本框、按钮大小，可选值为 `small` `large` 或者不设   | `'large'｜'small'｜'default'` | `default` |
| `[nzType]`  | 设置快捷设置类型，可选值为 `primary` `dashed` `text` `link` 或者不设 | `'primary'｜'dashed'｜'link'｜'text'` | -        |
| `[nzVisible]` | 隐藏快捷设置   | `boolean`  | `false`  |
| `[nzOptions]` | 修改快捷设置的选项   | `NzCronOptions`   | - |
