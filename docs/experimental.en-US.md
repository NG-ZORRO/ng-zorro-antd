---
order: 12
title: Experimental Features
experimental: true
---

NG-ZORRO experiments are features that are released but not yet considered stable or production ready

Developers and users can opt-in into these features before they are fully released. But **breaking changes** may occur with any release.

### Using the experimental components

Import the `NgModule` and styles for the component you want to use, then just like normal components to use it.

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
