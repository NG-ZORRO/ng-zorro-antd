---
order: 8
title: Animations Switch
---

> Since v21, NG-ZORRO uses [native animation](https://angular.dev/guide/animations) to implement animation effects. You can remove the `@angular/animations` dependency as needed.

NG-ZORRO allows developers to turn off the animations. You can set animations' switch by adding corresponding directives or
configurations, or use the global configuration to turn off all animations associated with it.

### Turn Off Globally or in Components

`provideNoopAnimations` has been marked as deprecated. You can use `provideNzNoAnimation` to turn off animations.

```ts
import { provideNzNoAnimation } from 'ng-zorro-antd/core/no-animation';

// Turn off animations globally
export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    provideNzNoAnimation()
  ]
};

// Turn off animations in components
@Component({
  providers: [
    // ...
    provideNzNoAnimation()
  ]
})
```

### Turn Off in Templates

Import the `NzNoAnimationDirective` and add the `nzNoAnimation` directive to the component where you want to turn off animations.

```html
<nz-modal nzNoAnimation></nz-modal> <ul nz-menu nzNoAnimation></ul>
```

### Turn Off in Services

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

### Turn Off the Wave Effect

Some components (such as Button) use dynamic styles to support wave effects, so their styles are unable to be overridden directly.
You can use `provideNzWave` or `provideNzNoAnimation` to turn off the wave effects.

```ts
import { provideNzWave } from 'ng-zorro-antd/core/wave';

export const appConfig: ApplicationConfig = {
  providers: [provideNzWave({ disabled: true })]
};
```
