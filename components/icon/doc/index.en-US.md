---
category: Components
type: General
title: Icon
hasPageDemo: true
---

Semantic vector graphics.

<blockquote style="border-color: orange;">
<p><strong>If the icon cannot be displayed or the console has an error, please run the following command to fix it <code>ng g ng-zorro-antd:fix-icon</code>.</strong></p>
<p>See <a href="/components/icon/en#static-loading-and-dynamic-loading">Static loading and dynamic loading</a> for details.</p>
</blockquote>

## List of icons

> Click the icon and copy the code.

We are still adding two-tone icons right now, syncing to [antd](https://ant.design/components/icon-cn/#components-icon-demo-iconfont).

## API

### [nz-icon]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[type]` | Type of the ant design icon | string | - |
| `[theme]` | Type of the ant design icon | `fill 丨 outline 丨 twotone` | `outline` |
| `[spin]` | Rotate icon with animation | `boolean` | `false` |
| `[twoToneColor]` | Only support the two-tone icon. Specific the primary color. | `string (hex color)` | - |
| `[iconfont]` | Type of the icon from iconfont | string | - |

### NzIconService

| Methods/Properties | Description | Parameters |
| -------- | ----------- | ---- |
| `twoToneColor` | To set the default primary color of twotone icons, use Ant Design's official blue by default | `TwoToneColorPaletteSetter` |
| `addIcon()` | To import icons statically | `IconDefinition` |
| `fetchFromIconfont()` | To get icon assets from fonticon | `NzIconfontOption` |
| `changeAssetsSource()` |  To change the location of your icon assets, so that you can deploy these icons wherever you want | `string` |

### InjectionToken

| Token | Description | Parameters |
| ----- | --- | ---- |
| `NZ_ICONS` | To import icons statically | `IconDefinition[]`, `useValue` |
| `NZ_ICON_DEFAULT_TWOTONE_COLOR` | To set the default primary color of twotone icons, use Ant Design's official blue by default | `string (hex color)`, `useValue` |

### SVG icons

After `1.7.0` version，we synced to Ant Design `3.9.x` and replaced font icons with svg icons which bring benefits below:

- Complete offline usage of icon, no dependency of alipay cdn font icon file and no more empty square during downloading.
- Much more display accuracy in lower-level screens.
- Support multiple colors for icon.
- No need to change built-in icons with overriding styles by providing more props in component.

You can join in [this dicussion of Ant Design](https://github.com/ant-design/ant-design/issues/10353).

NG-ZORRO hadn't provided an icon component. Instead, icon based on font files was provided. In `1.7.0`, we make this new directive compatible to old API. If you make no changes to your existing code, old icons would be dynamically loaded as `outline` icons. But the best pratice is always to use `nz-icon` directive and specify the `theme` prop.

```html
<i nz-icon [type]="'star'" [theme]="'fill'"></i>
```

All the icons will be rendered to `<svg>`, and styles and classes applied to `<i>` would work.

```html
<i nz-icon [type]="'message'" style="font-size: 16px; color: #08c;"></i>
```

### Static loading and dynamic loading

As for icons provided by Ant Design, there are two ways of importing them into your project.

Static loading. By registering icons to `AppModule` you load icons statically.

```ts
import { IconDefinition } from '@ant-design/icons-angular';
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';
import { NgZorroAntdModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd';
// import * as AllIcons from '@ant-design/icons-angular/icons';

// Import what you need. RECOMMENDED. ✔️
const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill ];
// Import all. NOT RECOMMENDED. ❌
// const antDesignIcons = AllIcons as {
//   [key: string]: IconDefinition;
// };
// const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent
  ],
  imports     : [
    NgZorroAntdModule,
  ],
  providers   : [
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // If not provided, Ant Design's official blue would be used
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap   : [ AppComponent ]
})
export class AppModule {
}
```

Actually this calls `addIcon` of `NzIconService`. Icons imported would be bundled into your `.js` files. Static loading would increase your bundle's size so we recommend use dynamic importing as much as you can. You can track this [issue](https://github.com/ant-design/ant-design/issues/12011) of Ant Design for more details.

> Icons used by `NG-ZORRO` itself are imported statically to increase loading speed. However, icons demonstrated on the official website are loaded dynamically.

Dynamic importing. This way would not increase your bundle's size. When NG-ZORRO detects that the icon you want to render hasn't been registered, it would fire a HTTP request to load it. All you have to do is to config your `angular.json` like this:

```json
{
  "assets": [
    {
      "glob": "**/*",
      "input": "./node_modules/@ant-design/icons-angular/src/inline-svg/",
      "output": "/assets/"
    }
  ]
}
```

We provide a schematic to fix this. Just simply run `ng g ng-zorro-antd:fix-icon` and we would add this config above for you!

You can call `changeAssetsSource()` of `NzIconService` to change the location of your icon assets, so that you can deploy these icon assets to cdn. The parameter you passed would be add in front of `assets/`.

Let's assume that you deploy static assets under `https://mycdn.somecdn.com/icons/assets`. You can call `changeAssetsSource('https://mycdn.somecdn.com/icons')` to tell NG-ZORRO that all your resources are located there.

Please call this in component's constructor or `AppInitService`.

### Set Default TwoTone Color

When using the two-tone icons, you can change the property of `NzIconService` to specify the primary color: `this.iconService.twoToneColor = { primaryColor: '#1890ff' }`.

### Custom Font Icon

We added a `fetchFromIconfont` method function to help developer using their own icons deployed at [iconfont.cn](http://iconfont.cn/) in a convenient way.

> This method is specified for iconfont.cn.

```ts
this._iconService.fetchFromIconfont({
  scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
});
```

```html
<i nz-icon [iconfont]="'icon-tuichu'"></i>
```

It create a component that uses SVG sprites in essence.

The following option are available:

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `scriptUrl` | The URL generated by iconfont.cn project. | string | - |

The property scriptUrl should be set to import the svg sprite symbols.

See [iconfont.cn](http://iconfont.cn/help/detail?spm=a313x.7781069.1998910419.15&helptype=code) documents to learn about how to generate scriptUrl.
