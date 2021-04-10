---
category: Components
type: Data Display
title: Image
cols: 1
experimental: true
---

<blockquote style="border-color: #faad14;">
<p>NG-ZORRO experiments are features that are released but not yet considered stable or production ready</p>
<p>Developers and users can opt-in into these features before they are fully released. But <strong>breaking changes</strong> may occur with any release.</p>
</blockquote>

## When To Use

- When you need the browser to prioritize image loading (needs to be handled in SSR).
- When you need to optimize for HD displays (e.g. retina screens).
- When using image CDN.
- More in [Image documentation](/components/image)
- Next steps
  * Add [sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes) attribute and responsive support.

```ts
import { NzImageModule } from 'ng-zorro-antd/experimental/image';
```

## API

### nz-image

| Property | Description | Type | Default | Global Config |
| --- | --- | --- | --- | --- |
|nzSrc | URL | `string` | - | |
|nzAlt | Alt | `string` | - | |
|nzWidth | Width | `number\|string` | `auto` | |
|nzHeight | Height | `number\|string` | `auto` | |
|nzAutoSrcset | Whether to optimize image loading | `boolean` | `false` | ✅ |
|nzSrcLoader | Loader | `NzImageSrcLoader` | `defaultImageSrcLoader` | ✅ |
|nzPriority | Whether to add [preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content) (only SSR)  | `boolean` | `false` | ✅ |

### NzImageSrcLoader

```ts
export type NzImageSrcLoader = (params: { src: string; width: number }) => string;
```

## Note

### nzSrcLoader

Using `nzSrcLoader` helps you to fill in key information about the requested image, such as `src` and `width`, which defaults to
```ts
export const defaultImageSrcLoader: NzImageSrcLoader = ({ src }) => {
  return src;
};
```
Other built-in loaders
```ts
// Demo: https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/resize,w_256
export const aliObjectsLoader: NzImageSrcLoader = ({src, width}) => {
  return `https://zos.alipayobjects.com/rmsportal/${normalizeSrc(src)}?x-oss-process=image/resize,w_${width}`;
};

// Demo: https://static.imgix.net/daisy.png?format=auto&fit=max&w=300
export const imgixLoader: NzImageSrcLoader = ({src, width}) => {
  return `https://static.imgix.net/${normalizeSrc(src)}?format=auto&fit=max&w=${width}`;
};

// Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
export const cloudinaryLoader: NzImageSrcLoader = ({src, width}) => {
  return `https://res.cloudinary.com/demo/image/upload/w_${width},c_limit,q_auto/${normalizeSrc(src)}`;
};
```

### Responsive images and preloaded images

Using responsive images can help web pages display well on different devices. Preloading images can help you load images faster, for more information please refer to.
- [preloading responsive images](https://web.dev/preload-responsive-images/)
- [next.js image component and image optimization](https://nextjs.org/docs/basic-features/image-optimization)