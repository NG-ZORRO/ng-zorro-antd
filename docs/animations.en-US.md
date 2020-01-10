---
order: 8
title: Animations Switch
---

NG-ZORRO allows developers to turn off animations. You can set animations by adding corresponding directive or
configurations, or use global configuration to  turn off all animations with.

### In Global

Replace `BrowserAnimationsModule` with 'NoopAnimationsModule` in the your module.

```ts
@NgModule({
  imports: [
   ...
   NoopAnimationsModule
  ]
})
```

### In Templates


Import `NzNoAnimationModule` module.

```ts
import { NzNoAnimationModule } from 'ng-zorro-antd/core';

@NgModule({
  imports: [
  ...
   NzNoAnimationModule
  ]
})
```

Add the `nzNoAnimation` directive to the component that wants to close the animation.

```HTML
<nz-modal nzNoAnimation></nz-modal>
<ul nz-menu nzNoAnimation></ul>
<nz-form-explain [nzNoAnimation]="true"></nz-form-explain>
```

### In Services

Add the following configuration to the component that wants to close the animation.

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

### Turn-Off the Wave Effect

Some component use dynamic style to support wave effect, You can set the provider `NZ_WAVE_GLOBAL_CONFIG` Or use
 `NoopAnimationsModule` to turn off the wave effect.

```ts
@NgModule({
  ...
  providers   : [
      ...,
      {
        provide: NZ_WAVE_GLOBAL_CONFIG, useValue: {
          disabled: true
        }
      }
   ]
})
```
