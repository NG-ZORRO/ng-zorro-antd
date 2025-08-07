---
order: 9
title: 文字方向
---

设置文字方向（LTR / RTL）。

## 设置默认方向

在文档 `body` 或者 `html` 标签上设置 `dir` 属性。

```html
<html dir="rtl"></html>
```

## 在模版中设置

引入 Angular CDK bidi 模块

```typescript
import { BidiModule } from '@angular/cdk/bidi';
```

在模版中为应用或其后代设置方向。

```html
<div dir="rtl"></div>
```

## 在服务中设置

例如对话框（Modal）服务。

```typescript
class MyComponent {
  constructor(
    private modalService: NzModalService,
    private configService: NzConfigService
  ) {}

  openModal(): void {
    this.modal.create({
      nzDirection: 'rtl'
    });
  }

  setDirWithConfig(): void {
    this.nzConfigService.set('modal', { nzDirection: 'rtl' });
  }
}
```

### 参考

- [Angular CDK Bidirectionality](https://material.angular.io/cdk/bidi/api)
- [dir - HTML（超文本标记语言） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/dir)
