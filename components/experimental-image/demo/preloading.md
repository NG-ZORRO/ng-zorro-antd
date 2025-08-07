---
order: 0
title:
  zh-CN: 优先加载
  en-US: Priority
---

## zh-CN

设置 `nzPriority` 将会在服务端渲染(SSR) 时添加 `<link rel="preload">` 标签，浏览器会将其视为高优先级资源加载。你可以在 [MDN - Preloading](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content)、[web.dev - Preloading responsive images](https://web.dev/preload-responsive-images/) 了解更多。

需要注意的是，通常只需要为首屏图片设置 `nzPriority` 因此在循环生成的模版中只需要为靠前的子项添加即可，例如：

```html
@for (product of products; track product)
<nz-image [nzPriority]="$index <= 8"></nz-image>
}
```

## en-US

Setting `nzPriority` will add the `<link rel="preload">` tag when rendering server-side (SSR), and browsers will treat it as a high priority resource to load. You can see this in [MDN - Preloading](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content), [web.dev - Preloading responsive images](https://web.dev/preload-responsive-images/) to learn more.

Note: usually we only need to set `nzPriority` for the first screen images, so you only need to add it for the first few items in the cyclically generated template, e.g.

```html
@for (product of products; track product)
<nz-image [nzPriority]="$index <= 8"></nz-image>
}
```
