---
category: Components
type: Data Display
title: Image
cols: 1
experimental: true
description: Experimental image component.
---

## When To Use

- When you need the browser to prioritize image loading (needs to be handled in SSR).
- When you need to optimize for HD displays (e.g. retina screens).
- When using image CDN.
- More in [Image documentation](/components/image/en)
- Next steps
  - Add [sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes) attribute and responsive support.

## API

### nz-image

| Property       | Description                                                                                               | Type               | Default                 | Global Config |
| -------------- | --------------------------------------------------------------------------------------------------------- | ------------------ | ----------------------- | ------------- |
| `nzSrc`        | URL                                                                                                       | `string`           | -                       |               |
| `nzAlt`        | Alt                                                                                                       | `string`           | -                       |               |
| `nzWidth`      | Width                                                                                                     | `number\|string`   | `auto`                  |               |
| `nzHeight`     | Height                                                                                                    | `number\|string`   | `auto`                  |               |
| `nzAutoSrcset` | Whether to optimize image loading                                                                         | `boolean`          | `false`                 | ✅            |
| `nzSrcLoader`  | Loader                                                                                                    | `NzImageSrcLoader` | `defaultImageSrcLoader` | ✅            |
| `nzPriority`   | Whether to add [preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content) (only SSR) | `boolean`          | `false`                 | ✅            |

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

Built-in image CND creation method

```ts
/**
 * AliObjectsLoader return format
 * {domain}/{src}?x-oss-process=image/resize,w_{width}
 */
export function createAliObjectsLoader(domain: string): NzImageSrcLoader;

/**
 * ImgixLoader return format
 * {domain}/{src}?format=auto&fit=max&w={width}
 */
export function createImgixLoader(domain: string): NzImageSrcLoader;

/**
 * CloudinaryLoader return format
 * {domain}/c_limit,q_auto,w_{width}/{src}
 */
export function createCloudinaryLoader(domain: string): NzImageSrcLoader;
```

### Responsive images and preloaded images

Using responsive images can help web pages display well on different devices. Preloading images can help you load images faster, for more information please refer to.

- [preloading responsive images](https://web.dev/preload-responsive-images/)
- [next.js image component and image optimization](https://nextjs.org/docs/basic-features/image-optimization)
