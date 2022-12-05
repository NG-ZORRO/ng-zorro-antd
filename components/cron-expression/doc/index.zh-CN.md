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

| 参数             | 说明             | 类型                          | 默认值      |
|----------------|----------------|-----------------------------|----------|
| `[nzType]` | cron 规则类型      | `'linux'｜'spring'`          | `linux`  |
| `[nzSize]`     | 设置输入框大小        | `'large'｜'small'｜'default'` | `default` |
| `[nzCollapseDisable]`  | 隐藏折叠面板         | `boolean`                   | `false`  |
| `[nzExtra]`     | 自定义渲染右侧的内容 | `TemplateRef<void>`         | -        |
| `[nzSemantic]`     | 自定义渲染下次执行时间 | `TemplateRef<void>`         | -        |