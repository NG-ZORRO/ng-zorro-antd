---
order: 12
title: 实验性功能
experimental: true
---

NG-ZORRO 实验性功能是指已发布但不稳定或者还未准备好用于生产环境的功能。

开发者或用户可以选择在正式发布前使用这些功能，但是每次发布版本时都可能存在 **breaking changes** 。

### 使用实验性功能

引入你想使用功能的 `NgModule` 和样式，然后像正常组件一样使用它。

```ts
  import { NzResizableModule } from 'ng-zorro-antd/resizable';

  @NgModule({
    imports: [ NzResizableModule ]
  })
  export class SomeModule {}
```

```less
@import "node_modules/ng-zorro-antd/resizable/style/entry.less"
```
