---
order: 1
title:
  zh-CN: 使用 Src Loader
  en-US: Use Src Loader
---

## zh-CN

自定义 `nzSrcLoader` 用于解析图片 URLs, 也可以使用内置的图片 CND 提供商的 Loaders。
<br/>
我们建议始终指定图片的尺寸(`nzWidth`、`nzHeight`)，不仅可以帮助提高网页体验的关键指标 [CLS](https://web.dev/cls/)，还可以配合 Loader 利用图片 CND 对图片进行优化处理提高加载速度。
<br/>
如果希望在不同的环境下使用不同的 Loader 时你可以像下面这样做：

```ts
import { environment } from 'environments/environment';

import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { aliObjectsLoader, defaultImageSrcLoader } from 'ng-zorro-antd/experimental/image';

const nzConfig: NzConfig = {
  imageExperimental: {
    nzSrcLoader: environment.production ? aliObjectsLoader : defaultImageSrcLoader
  }
};

export const appConfig: ApplicationConfig = {
  providers: [provideNzConfig(nzConfig)]
};
```

## en-US

Custom `nzSrcLoader` is used to resolve image URLs, or you can also use the built-in image CND provider's Loaders.
<br/>
We recommend always specifying the image size (`nzWidth`, `nzHeight`), which can help improve the key metrics of the web experience [CLS](https://web.dev/cls/), and can also be used with the Loader to optimize the images using the image CND to improve the loading speed.
<br/>
If you want to use a different Loader in a different environment you can do the following.

```ts
import { environment } from 'environments/environment';

import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { createAliObjectsLoader, defaultImageSrcLoader } from 'ng-zorro-antd/experimental/image';

const nzConfig: NzConfig = {
  imageExperimental: {
    nzSrcLoader: environment.production
      ? createAliObjectsLoader('https://zos.alipayobjects.com/rmsportal')
      : defaultImageSrcLoader
  }
};

export const appConfig: ApplicationConfig = {
  providers: [provideNzConfig(nzConfig)]
};
```
