---
order: 8
title: Animations Switch
---

NG-ZORRO allows developers to turn off the animations. You can set animations' switch by adding corresponding directives or
configurations, or use the global configuration to turn off all animations associated with it.

### Turn Off Globally

Replace `BrowserAnimationsModule` with `NoopAnimationsModule` in the module.

```ts
import { provideNoopAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    provideNoopAnimations()
  ]
};
```

### Turn Off in components

You can use `provideNzNoAnimation` to turn off animations in components.

```ts
import { provideNzNoAnimation } from 'ng-zorro-antd/core/no-animation';

@Component({
  providers: [
    // ...
    provideNzNoAnimation()
  ]
})
```

### Turn off in templates

Import `NzNoAnimationDirective`.

```ts
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';

@Component({
  imports: [
    // ...
    NzNoAnimationDirective
  ]
})
```

Add the `nzNoAnimation` directive to the component.

```html
<nz-modal nzNoAnimation></nz-modal> <ul nz-menu nzNoAnimation></ul>
```

### Turn off in services

Add the following configuration while invoking components' services.

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

### Turn off the wave effect

Some components use dynamic styles to support wave effects, so their styles are unable to be overridden directly.
Instead, you can use `provideNzWave` or use `NoopAnimationsModule` to turn off the wave effects.

```ts
import { provideNzWave } from 'ng-zorro-antd/core/wave';

export const appConfig: ApplicationConfig = {
  providers: [provideNzWave({ disabled: true })]
};
```
