---
order: 9
title: Direction
---

Set the direction (LTR / RTL).

## Set the default direction

Set the `dir` attribute on the document `body` or `html` tag.

```html
<html dir="rtl"></html>
```

## Set in the template

Import the Angular CDK bidi module.

```typescript
import { BidiModule } from '@angular/cdk/bidi';
```

Set the direction for the application or its descendants in the template.

```html
<div dir="rtl"></div>
```

## Set in the service

For example, the modal service.

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

### References

- [Angular CDK Bidirectionality](https://material.angular.io/cdk/bidi/api)
- [dir - HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
