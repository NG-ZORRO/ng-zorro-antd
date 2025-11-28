---
category: Components
subtitle: 上传
type: 数据录入
title: Upload
cover: 'https://gw.alipayobjects.com/zos/alicdn/QaeBt_ZMg/Upload.svg'
description: 文件选择上传和拖拽上传控件。
---

## 何时使用

上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。

- 当需要上传一个或一些文件时。
- 当需要展现上传的进度时。
- 当需要使用拖拽交互时。

## API

> 服务端上传接口实现可以参考 [jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload/wiki)。

### nz-upload

| 参数                        | 说明                                                                                                                            | 类型                                                                                             | 默认值       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------ |
| `[nzAccept]`                | 接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)  | `string`                                                                                         | -            |
| `[nzAction]`                | 必选参数, 上传的地址                                                                                                            | `string \| ((file: NzUploadFile) => string \| Observable<string>)`                               | -            |
| `[nzDirectory]`             | 支持上传文件夹（[caniuse](https://caniuse.com/#feat=input-file-directory)）                                                     | `boolean`                                                                                        | `false`      |
| `[nzBeforeUpload]`          | 上传文件之前的钩子，参数为上传的文件，若返回 `false` 则停止上传。注意：**IE9** 不支持该方法；注意：务必使用 `=>` 定义处理方法。 | `(file: NzUploadFile, fileList: NzUploadFile[]) => boolean \| Observable<boolean>`               | -            |
| `[nzCustomRequest]`         | 通过覆盖默认的上传行为，可以自定义自己的上传实现；注意：务必使用 `=>` 定义处理方法。                                            | `(item) => Subscription`                                                                         | -            |
| `[nzData]`                  | 上传所需参数或返回上传参数的方法；注意：务必使用 `=>` 定义处理方法。                                                            | `Object \| ((file: NzUploadFile) => Object \| Observable<{}>)`                                   | -            |
| `[nzDisabled]`              | 是否禁用                                                                                                                        | `boolean`                                                                                        | `false`      |
| `[nzFileList]`              | 文件列表，双向绑定                                                                                                              | `NzUploadFile[]`                                                                                 | -            |
| `[nzLimit]`                 | 限制单次最多上传数量，`nzMultiple` 打开时有效；`0` 表示不限                                                                     | `number`                                                                                         | `0`          |
| `[nzMaxCount]`              | 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件                                                                       | `number\|undefined`                                                                              | `undefined`  |
| `[nzSize]`                  | 限制文件大小，单位：KB；`0` 表示不限                                                                                            | `number`                                                                                         | `0`          |
| `[nzFileType]`              | 限制文件类型，例如：`image/png,image/jpeg,image/gif,image/bmp`                                                                  | `string`                                                                                         | -            |
| `[nzFilter]`                | 自定义过滤器                                                                                                                    | `UploadFilter[]`                                                                                 | -            |
| `[nzHeaders]`               | 设置上传的请求头部，IE10 以上有效；注意：务必使用 `=>` 定义处理方法。                                                           | `Object \| ((file: NzUploadFile) => Object \| Observable<{}>)`                                   | -            |
| `[nzListType]`              | 上传列表的内建样式，支持三种基本样式 `text`, `picture` 和 `picture-card`                                                        | `'text' \| 'picture' \| 'picture-card'`                                                          | `'text'`     |
| `[nzMultiple]`              | 是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件。                                                                | `boolean`                                                                                        | `false`      |
| `[nzName]`                  | 发到后台的文件参数名                                                                                                            | `string`                                                                                         | `'file'`     |
| `[nzShowUploadList]`        | 是否展示 uploadList, 可设为一个对象，用于单独设定 `showPreviewIcon`，`showRemoveIcon` 和 `showDownloadIcon`                     | `boolean \| { showPreviewIcon?: boolean, showRemoveIcon?: boolean, showDownloadIcon?: boolean }` | `true`       |
| `[nzShowButton]`            | 是否展示上传按钮                                                                                                                | `boolean`                                                                                        | `true`       |
| `[nzWithCredentials]`       | 上传请求时是否携带 cookie                                                                                                       | `boolean`                                                                                        | `false`      |
| `[nzOpenFileDialogOnClick]` | 点击打开文件对话框                                                                                                              | `boolean`                                                                                        | `true`       |
| `[nzPreview]`               | 点击文件链接或预览图标时的回调；注意：务必使用 `=>` 定义处理方法。                                                              | `(file: NzUploadFile) => void`                                                                   | -            |
| `[nzPreviewFile]`           | 自定义文件预览逻辑；注意：务必使用 `=>` 定义处理方法。                                                                          | `(file: NzUploadFile) => Observable<dataURL: string>`                                            | -            |
| `[nzPreviewIsImage]`        | 自定义预览文件是否有效图像，一般用于图像 URL 为非标准格式；注意：务必使用 `=>` 定义处理方法。                                   | `(file: NzUploadFile) => boolean`                                                                | -            |
| `[nzRemove]`                | 点击移除文件时的回调，返回值为 false 时不移除。支持返回 `Observable` 对象；注意：务必使用 `=>` 定义处理方法。                   | `(file: NzUploadFile) => boolean \| Observable<boolean>`                                         | -            |
| `(nzChange)`                | 上传文件改变时的状态                                                                                                            | `EventEmitter<NzUploadChangeParam>`                                                              | -            |
| `[nzDownload]`              | 点击下载文件时的回调，如果没有指定，则默认跳转到文件 url 对应的标签页                                                           | `(file: NzUploadFile) => void`                                                                   | 跳转新标签页 |
| ~~`[nzTransformFile]`~~     | ~~在上传之前转换文件。支持返回一个 Observable 对象~~                                                                            | ~~`(file: NzUploadFile) => NzUploadTransformFileType`~~                                          | -            |
| `[nzIconRender]`            | 自定义显示 icon                                                                                                                 | `TemplateRef<{ $implicit: NzUploadFile }>`                                                       | -            |
| `[nzFileListRender]`        | 自定义显示整个列表                                                                                                              | `TemplateRef<{ $implicit: NzUploadFile[] }>`                                                     | -            |

#### nzChange

> 开始、上传进度、完成、失败都会调用这个函数。

文件状态改变的回调，返回为：

```js
{
  file: { /* ... */ },
  fileList: [ /* ... */ ],
  event: { /* ... */ },
}
```

1. `file` 当前操作的文件对象。

   ```js
   {
      uid: 'uid',      // 文件唯一标识
      name: 'xx.png'   // 文件名
      status: 'done', // 状态有：uploading done error removed
      response: '{"status": "success"}', // 服务端响应内容
      linkProps: '{"download": "image"}', // 下载链接额外的 HTML 属性
   }
   ```

2. `fileList` 当前的文件列表。
3. `event` 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持。

#### nzCustomRequest

默认使用 HTML5 方式上传（即：使用 `HttpClient`），允许覆盖默认行为实现定制需求，例如直接与阿里云交互等。

`nzCustomRequest` 回调传递以下参数：

- `onProgress: (event: { percent: number }): void`
- `onError: (event: Error): void`
- `onSuccess: (body: Object, xhr?: Object): void`
- `data: Object`
- `filename: String`
- `file: File`
- `withCredentials: Boolean`
- `action: String`
- `headers: Object`
