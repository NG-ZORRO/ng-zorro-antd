---
order: 8
title: Animations Switch
---

NG-ZORRO allows developers to turn off the animations. You can set animations' switch by adding corresponding directives or
configurations, or use the global configuration to turn off all animations associated with it.

### Turn Off Globally

Replace `BrowserAnimationsModule` with `NoopAnimationsModule` in the module.

```ts
@NgModule({
  imports: [
   ...
   NoopAnimationsModule
  ]
})
```

### Turn Off In Templates


Import `NzNoAnimationModule`.

```ts
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';

@NgModule({
  imports: [
  ...
   NzNoAnimationModule
  ]
})
```

Add the `nzNoAnimation` directive to the component.

```html
<nz-modal nzNoAnimation></nz-modal>
<ul nz-menu nzNoAnimation></ul>
```

### Turn Off In Services

Add the following configuration while invoking components' services.

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

### Turn Off The Wave Effect

Some components use dynamic styles to support wave effects, so their styles are unable to be override directly. Instead, you can use `provideNzWave` or use
 `NoopAnimationsModule` to turn off the wave effects.

```ts
import { provideNzWave } from 'ng-zorro-antd/core/wave';

@NgModule({
  providers: [
    provideNzWave({ disabled: true })
  ]
})
```
