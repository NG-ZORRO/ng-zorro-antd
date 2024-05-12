---
category: Components
type: Featured Components
title: HashCode
tag: 17.0.0
cover: https://img.alicdn.com/imgextra/i3/O1CN01ePPF8q1cxXFz041Q9_!!6000000003667-0-tps-172-57.jpg
---

## Import Module

The hash code component is styled for 64-bit design, and if the data given is less than or more than 64-bit, it may
bring some differences in presentation.

### Import Module

module:

```ts
import { NzHashCodeModule } from 'ng-zorro-antd/hash-code';
```

standalone:

```ts
import { NzHashCodeComponent } from 'ng-zorro-antd/hash-code';
```

## API

### nz-hashCode:standalone

| Property     | Description                                         | Type                                | Default    |
|--------------|-----------------------------------------------------|-------------------------------------|------------|
| `[nzValue]`  | The value of the hash code                          | `string`                            | -          |
| `[nzTitle]`  | Description of the content in the upper left corner | `string`                            | `HashCode` |
| `[nzLogo]`   | Display in the upper right corner                   | `TemplateRef<void> \| string`       | -          |
| `[nzMode]`   | Demonstration Mode                                  | `single \| double \| strip \| rect` | `double`   |
| `[nzType]`   | style                                               | `defalut \| primary`                | `primary`  |
| `(nzOnCopy)` | Clicking the Copy callback                          | `EventEmitter<string>`              | -          |
