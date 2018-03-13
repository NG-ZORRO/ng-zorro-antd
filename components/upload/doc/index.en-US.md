---
category: Components
type: Data Entry
title: Upload
---

Upload file by selecting or dragging.

## When To Use

Uploading is the process of publishing information (web pages, text, pictures, video, etc.) to a remote server via a web page or upload tool.

- When you need to upload one or more files.
- When you need to show the process of uploading.
- When you need to upload files by dragging and dropping.

## API

> You can consult [jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload/wiki) about how to implement server side upload interface.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| nzAccept | File types that can be accepted. See [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) | string | - |
| nzAction | Required. Uploading URL | string | - |
| nzBeforeUpload | Hook function which will be executed before uploading. Uploading will be stopped with `false` or a Observable. **Warning：this function is not supported in IE9**. NOTICE: Muse be use `=>` to define the method. | (file, fileList) => `boolean|Observable` | - |
| nzCustomRequest | override for the default xhr behavior allowing for additional customization and ability to implement your own XMLHttpRequest. NOTICE: Muse be use `=>` to define the method. | `(item) => Subscription` | - |
| nzData | Uploading params or function which can return uploading params. NOTICE: Muse be use `=>` to define the method. | `Object|((file: UploadFile) => Object)` | - |
| nzDisabled | disable upload button | boolean | false |
| nzFileList | List of files, two-way data-binding | UploadFile[] | - |
| nzLimit | limit single upload count when `nzMultiple` has opened. `0` unlimited | number | 0 |
| nzSize | limit file size (KB). `0` unlimited | number | 0 |
| nzFileType | limit file type, e.g: `image/png,image/jpeg,image/gif,image/bmp` | string | - |
| nzFilter | Custom filter when choosed file | UploadFilter[] | - |
| nzHeaders | Set request headers, valid above IE10. NOTICE: Muse be use `=>` to define the method. | `Object|((file: UploadFile) => Object)` | - |
| nzListType | Built-in stylesheets, support for three types: `text`, `picture` or `picture-card` | string | 'text' |
| nzMultiple | Whether to support selected multiple file. `IE10+` supported. You can select multiple files with CTRL holding down while multiple is set to be true | boolean | false |
| nzName | The name of uploading file | string | 'file' |
| nzShowUploadList | Whether to show default upload list, could be an object to specify `showPreviewIcon` and `showRemoveIcon` individually | `Boolean or { showPreviewIcon?: boolean, showRemoveIcon?: boolean }` | true |
| nzShowButton | Show upload button | boolean | true |
| nzWithCredentials | ajax upload with cookie sent | boolean | false |
| nzPreview | A callback function, will be executed when file link or preview icon is clicked. NOTICE: Muse be use `=>` to define the method. | `(file: UploadFile) => void` | - |
| nzRemove   | A callback function, will be executed when removing file button is clicked, remove event will be prevented when return value is `false` or a Observable. NOTICE: Muse be use `=>` to define the method. | (file: UploadFile) => `boolean|Observable` | -   |
| (nzChange) | A callback function, can be executed when uploading state is changing | EventEmitter | - |

## nzChange

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
      response: '{"status": "success"}' // 服务端响应内容
   }
   ```

2. `fileList` 当前的文件列表。
3. `event` 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持。

## nzCustomRequest

默认使用HTML5方式上传（即：使用 `HttpClient`），允许覆盖默认行为实现定制需求，例如直接与阿里云交互等。

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
