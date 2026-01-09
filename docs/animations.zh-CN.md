---
order: 8
title: 动画开关
tag: updated
---

> 从 v21 版本开始，NG-ZORRO 完全使用 [native animation](https://angular.cn/guide/animations) 实现动画效果，你可以按需移除 `@angular/animations` 依赖。

NG-ZORRO 允许开发者关闭动画效果，您可以通过添加对应指令或者配置来设置动画的开关，也可以通过全局配置关闭所有动画。

### 在全局或组件中关闭

`provideNoopAnimations` 已被标记为废弃，你可以通过 `provideNzNoAnimation` 来关闭动画。

```ts
import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';

// 在全局中关闭动画
export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    provideNzNoAnimation()
  ]
};

// 在组件中关闭动画
@Component({
  providers: [
    // ...
    provideNzNoAnimation()
  ]
})
```

### 在模版中关闭

引入 `NzNoAnimationDirective` 指令，在期望关闭动画的组件上添加 `nzNoAnimation` 指令。

```html
<nz-modal nzNoAnimation></nz-modal> <ul nz-menu nzNoAnimation></ul>
```

### 在服务中关闭

在调用组件服务时传入以下配置来关闭动画。

#### Modal, Drawer

```ts
{
  // ...
  nzNoAnimation: true;
}
```

#### Notification, Message

```ts
{
  // ...
  nzAnimate: false;
}
```

### 关闭波浪效果

部分组件（如：Button）为了支持波纹效果，使用了动态样式，因此无法直接使用样式覆盖。
你可以通过 `provideNzWave` 或者使用 `provideNzNoAnimation` 来关闭波浪效果。

```ts
import { provideNzWave } from 'ng-zorro-antd/core/wave';

export const appConfig: ApplicationConfig = {
  providers: [provideNzWave({ disabled: true })]
};
```
