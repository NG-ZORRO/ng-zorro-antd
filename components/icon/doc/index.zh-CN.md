---
category: Components
subtitle: 图标
type: 通用
title: Icon
hasPageDemo: true
cover: 'https://gw.alipayobjects.com/zos/alicdn/rrwbSt3FQ/Icon.svg'
description: 语义化的矢量图形。
---

## 图标列表

新版图标可能略有缺失，我们将与 [Ant Design](https://ant.design/components/icon-cn/) 同步保持图标的更新。

## API

### nz-icon, [nz-icon]

| 参数               | 说明                                                         | 类型                           | 默认值      | 支持全局配置 |
| ------------------ | ------------------------------------------------------------ | ------------------------------ | ----------- | ------------ |
| `[nzType]`         | 图标类型，遵循图标的命名规范                                 | string                         | -           | -            |
| `[nzTheme]`        | 图标主题风格。可选实心、描线、双色等主题风格，适用于官方图标 | `'fill'丨'outline'丨'twotone'` | `'outline'` | ✅           |
| `[nzSpin]`         | 是否有旋转动画                                               | `boolean`                      | `false`     | -            |
| `[nzTwotoneColor]` | 双色图标的主要颜色，默认为 Ant Design 蓝色                   | `string (十六进制颜色)`        | -           | ✅           |
| `[nzIconfont]`     | 指定来自 IconFont 的图标类型                                 | string                         | -           | -            |
| `[nzRotate]`       | 图标旋转角度                                                 | `number`                       | -           | -            |

### NzIconService

| 方法                   | 说明                                                                               | 参数                     |
| ---------------------- | ---------------------------------------------------------------------------------- | ------------------------ |
| `addIcon()`            | 用于静态引入图标，可传入多个值（或者用数组解构赋值）                               | `IconDefinition`         |
| `addIconLiteral()`     | 用于静态引入用户自定义图标                                                         | `string`, `string (SVG)` |
| `fetchFromIconfont()`  | 用于从 IconFont 获取图标资源文件                                                   | `NzIconfontOption`       |
| `changeAssetsSource()` | 用于修改动态加载图标的资源前缀，使得你可以部署图标资源到你想要的任何位置，例如 CDN | `string`                 |

### SVG 图标

NG-ZORRO 采用 svg 图标，带来了以下优势：

- 支持多色图标。
- 在低端设备上 SVG 有更好的清晰度。
- 对于内建图标的更换可以提供更多 API，而无需样式覆盖。

你可以使用 `nz-icon` 组件，传入 `theme` 以明确图标的主题风格，例如：

```html
<nz-icon nzType="star" nzTheme="fill" />
```

### 静态加载与动态加载

对于 Ant Design 提供的图标，我们提供了两种方式来加载图标资源文件。

**静态加载**，可以在 `app.config.ts` 中使用 `provideNzIcons` 引入你需要的图标（推荐）或者是全部的图标，例如：

```typescript
import { IconDefinition } from '@ant-design/icons-angular';
import { provideNzIcons } from 'ng-zorro-antd/icon';

// 引入你需要的图标，比如你需要 fill 主题的 AccountBook Alert 和 outline 主题的 Alert，推荐 ✔️
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];

// 引入全部的图标，不推荐 ❌
// import * as AllIcons from '@ant-design/icons-angular/icons';

// const antDesignIcons = AllIcons as Record<string, IconDefinition>;
// const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

export const appConfig: ApplicationConfig = {
  providers: [provideNzIcons(icons)]
};
```

本质上是调用了 `NzIconService` 的 `addIcon` 方法，引入后的文件会被打包到 `.js` 文件中。
静态引入会增加包体积，所以我们建议尽可能地使用动态加载，如果要静态加载，也仅仅加载你需要用到的图标。

> 为了加快渲染速度，NG-ZORRO 本身用到的图标是静态引入的。官网的图标是动态引入的。

**动态加载**，这是为了减少包体积而提供的方式。当 NG-ZORRO 检测用户想要渲染的图标还没有静态引入时，会发起 HTTP 请求动态引入。
你只需要配置 `angular.json` 文件：

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

你可以通过 `NzIconService` 的 `changeAssetsSource()` 方法来修改图标资源的位置，这样你就可以部署这些资源到 CDN 上。你的参数会被直接添加到 `assets/` 的前面。

例如，你在 `https://mycdn.somecdn.com/icons/assets` 目录下部署了静态资源文件，则可以通过调用 `changeAssetsSource('https://mycdn.somecdn.com/icons')`，来告诉 NG-ZORRO 从这个位置动态加载图标资源。

### 在子模块中补充图标

有时候，为了避免增大 `main.js` 的体积，你可能想要在懒加载的组件中或路由的 `providers` 中使用 `provideNzIconsPatch` 来补充图标

```typescript
import { NzIconModule, provideNzIconsPatch } from 'ng-zorro-antd/icon';

// 在 xxx.component.ts 中
@Component({
  imports: [NzIconModule],
  providers: [provideNzIconsPatch([QuestionOutline])]
})
class ChildComponent {}

// 或 在 xxx.routes.ts 中
const routes: Routes = [
  {
    path: '',
    providers: [provideNzIconsPatch([QuestionOutline])]
  }
];
```

这样，当 QuestionOutline 图标加载之后，整个应用都能够使用它。

### 双色图标主色

对于双色图标，可以通过提供全局配置 `{ nzIcon: { nzTwotoneColor: 'xxx' } }` 或 `NzConfigService` 的对应方法修改来全局设置图标主色。

### 自定义 font 图标

我们提供了 `fetchFromIconfont` 方法，方便开发者调用在 [iconfont.cn](http://iconfont.cn/) 上自行管理的图标。

```typescript
this._iconService.fetchFromIconfont({
  scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
});
```

```html
<nz-icon nzIconfont="icon-tuichu" />
```

其本质上是创建了一个使用 `<use>` 标签渲染图标的组件。

`options` 的配置项如下：

| 参数        | 说明                                                                                           | 类型   | 默认值 |
| ----------- | ---------------------------------------------------------------------------------------------- | ------ | ------ |
| `scriptUrl` | [iconfont.cn](http://iconfont.cn/) 项目在线生成的 `js` 地址，在 `namespace` 也设置的情况下有效 | string | -      |

在 `scriptUrl` 都设置有效的情况下，组件在渲染前会自动引入 [iconfont.cn](http://iconfont.cn/) 项目中的图标符号集，无需手动引入。

见 [iconfont.cn 使用帮助](http://iconfont.cn/help/detail?spm=a313x.7781069.1998910419.15&helptype=code) 查看如何生成 js 地址。

### 命名空间

用户可以使用该功能方便地添加自己的图标。在渲染自定义图标时，只需要将 `type` 指定为 `namespace:name` 的形式，`nz-icon` 组件就会在用户自行添加的图标中进行检索并渲染。同时支持静态和动态引入。

静态引入，只需要调用 `NzIconService` 的 `addIconLiteral` 方法即可。

动态引入，只需要保证 SVG 资源文件放到了相应的目录，即 `assets/${namespace}`。
例如你在 `zoo` 命名空间下有一个 `panda` 图标，你需要将 `panda.svg` 放到 `assets/zoo` 目录下。

## 常见问题

### 图标都不见了！

你是不是没有阅读以上的文档？

### 我想静态引入全部的图标，该怎么做？

尽管这是不推荐的行为，实际上我们已经在 <a href="/components/icon/zh#%E9%9D%99%E6%80%81%E5%8A%A0%E8%BD%BD%E4%B8%8E%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BD">静态加载与动态加载</a> 部分演示过了：

```typescript
import * as AllIcons from '@ant-design/icons-angular/icons';

const antDesignIcons = AllIcons as Record<string, IconDefinition>;
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);
```

然后通过 `provideNzIcons` 或者 `NzIconService` 的 `addIcon` 方法引入。

### 动态加载会不会影响网页的性能？

我们用了多种手段来尽量减少动态请求，包括先静态后动态、缓存和相同图标的请求复用，用户很少能感知到图标是异步加载的。
在网络环境尚可的情况下，即使是有三百多个图标同时展示的 NG-ZORRO 官网，也基本没有卡顿。
对于加载速度要求更高的用户，我们也支持 CDN。

### 我怎么知道一个图标的静态引入名？

很简单，大写驼峰加主题即为图标的引入名。比如 `alibaba` 的引入名就是 `AlibabaOutline`，事实上，编辑器的自动补全能帮助到你。
