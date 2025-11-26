---
order: 8
title: 动画开关
---

NG-ZORRO 允许开发者关闭动画效果，您可以通过添加对应指令或者配置来设置动画的开关，也可以通过全局配置关闭所有动画。

### 在全局关闭

在模块中使用 `NoopAnimationsModule` 替换 `BrowserAnimationsModule`。

```ts
import { provideNoopAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    provideNoopAnimations()
  ]
};
```

### 在组件中关闭

你可以通过 `provideNzNoAnimation` 来关闭动画。

```ts
import { provideNzNoAnimation } from 'ng-zorro-antd/core/no-animation';

@Component({
  providers: [
    // ...
    provideNzNoAnimation()
  ]
})
```

### 在模版中关闭

引入 `NzNoAnimationDirective` 指令。

```ts
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';

@Component({
  imports: [
    // ...
    NzNoAnimationDirective
  ]
})
```

在想关闭动画的组件上添加 `nzNoAnimation` 指令。

```html
<nz-modal nzNoAnimation></nz-modal> <ul nz-menu nzNoAnimation></ul>
```

### 在服务中关闭

在调用组件服务时传入以下配置来关闭动画。

#### Modal, Drawer

```ts
{
    ...,
    nzNoAnimation: true
}
```

#### Notification, Message

```ts
{
   ...,
   nzAnimate: false
}
```

### 关闭波浪效果

部分组件（如：Button）为了支持波纹效果，使用了动态样式，因此无法直接使用样式覆盖。
但是你可以通过 `provideNzWave` 或者使用 `NoopAnimationsModule` 来关闭波浪效果。

```ts
import { provideNzWave } from 'ng-zorro-antd/core/wave';

export const appConfig: ApplicationConfig = {
  providers: [provideNzWave({ disabled: true })]
};
```
