---
category: Components
type: Data Entry
title: Upload
cover: 'https://gw.alipayobjects.com/zos/alicdn/QaeBt_ZMg/Upload.svg'
description: Used to select and upload files or drag and drop files.
---

## When To Use

Uploading is publishing information (web pages, text, pictures, video, etc.) to a remote server via a web page or upload tool.

- When you need to upload one or more files.
- When you need to show the process of uploading.
- When you need to upload files by dragging and dropping.

## API

> You can consult [jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload/wiki) about how to implement server-side upload interface.

### nz-upload

| Property                    | Description                                                                                                                                                                                                       | Type                                                                                             | Default         |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------- |
| `[nzAccept]`                | File types that can be accepted. See [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)                                                                        | `string`                                                                                         | -               |
| `[nzAction]`                | Required. Uploading URL                                                                                                                                                                                           | `string \| ((file: NzUploadFile) => string \| Observable<string>)`                               | -               |
| `[nzDirectory]`             | support uploading the whole directory ([caniuse](https://caniuse.com/#feat=input-file-directory))                                                                                                                 | `boolean`                                                                                        | `false`         |
| `[nzBeforeUpload]`          | Hook function, which will be executed before uploading. Uploading will be stopped with `false` or an Observable. **Warning： this function is not supported in IE9**. NOTICE: Must use `=>` to define the method. | `(file: NzUploadFile, fileList: NzUploadFile[]) => boolean \| Observable<boolean>`               | -               |
| `[nzCustomRequest]`         | Override for the default XHR behavior allowing for additional customization and the ability to implement your own XMLHttpRequest. NOTICE: Must use `=>` to define the method.                                     | `(item) => Subscription`                                                                         | -               |
| `[nzData]`                  | Uploading params or function which can return uploading params. NOTICE: Must use `=>` to define the method.                                                                                                       | `Object \| ((file: NzUploadFile) => Object \| Observable<{}>)`                                   | -               |
| `[nzDisabled]`              | disable upload button                                                                                                                                                                                             | `boolean`                                                                                        | `false`         |
| `[nzFileList]`              | List of files, two-way data-binding                                                                                                                                                                               | `NzUploadFile[]`                                                                                 | -               |
| `[nzLimit]`                 | limit single upload count when `nzMultiple` has opened. `0` unlimited                                                                                                                                             | `number`                                                                                         | `0`             |
| `[nzSize]`                  | limit file size (KB). `0` unlimited                                                                                                                                                                               | `number`                                                                                         | `0`             |
| `[nzFileType]`              | limit file type, e.g: `image/png,image/jpeg,image/gif,image/bmp`                                                                                                                                                  | `string`                                                                                         | -               |
| `[nzFilter]`                | Custom filter when choose file                                                                                                                                                                                    | `UploadFilter[]`                                                                                 | -               |
| `[nzHeaders]`               | Set request headers, valid above IE10. NOTICE: Must use `=>` to define the method.                                                                                                                                | `Object \| ((file: NzUploadFile) => Object \| Observable<{}>)`                                   | -               |
| `[nzListType]`              | Built-in stylesheets, support for three types: `text`, `picture` or `picture-card`                                                                                                                                | `'text' \| 'picture' \| 'picture-card'`                                                          | `'text'`        |
| `[nzMultiple]`              | Whether to support selected multiple files. `IE10+` supported. You can select multiple files with CTRL holding down while multiple is set to be true                                                              | `boolean`                                                                                        | `false`         |
| `[nzName]`                  | The name of the uploading file                                                                                                                                                                                    | `string`                                                                                         | `'file'`        |
| `[nzShowUploadList]`        | Whether to show the default upload list, could be an object to specify `showPreviewIcon`, `showRemoveIcon` and `showDownloadIcon` individually                                                                    | `boolean \| { showPreviewIcon?: boolean, showRemoveIcon?: boolean, showDownloadIcon?: boolean }` | `true`          |
| `[nzShowButton]`            | Show upload button                                                                                                                                                                                                | `boolean`                                                                                        | `true`          |
| `[nzWithCredentials]`       | ajax upload with cookie sent                                                                                                                                                                                      | `boolean`                                                                                        | `false`         |
| `[nzOpenFileDialogOnClick]` | click open file dialog                                                                                                                                                                                            | `boolean`                                                                                        | `true`          |
| `[nzPreview]`               | A callback function will be executed when the file link or preview icon is clicked. NOTICE: Must use `=>` to define the method.                                                                                   | `(file: NzUploadFile) => void`                                                                   | -               |
| `[nzPreviewFile]`           | Customize preview file logic. NOTICE: Must use `=>` to define the method.                                                                                                                                         | `(file: NzUploadFile) => Observable<dataURL: string>`                                            | -               |
| `[nzPreviewIsImage]`        | Customize the preview file is an image, generally used when the image URL is in a non-standard format. NOTICE: Must use `=>` to define the method.                                                                | `(file: NzUploadFile) => boolean`                                                                | -               |
| `[nzRemove]`                | A callback function will be executed when the removing file button is clicked, remove event will be prevented when the return value is `false` or an Observable. NOTICE: Must use `=>` to define the method.      | `(file: NzUploadFile) => boolean \| Observable<boolean>`                                         | -               |
| `(nzChange)`                | A callback function, can be executed when uploading state is changing                                                                                                                                             | `EventEmitter<NzUploadChangeParam>`                                                              | -               |
| `[nzDownload]`              | Click the method to download the file, pass the method to perform the method logic, do not pass the default jump to the new TAB.                                                                                  | `(file: NzUploadFile) => void`                                                                   | Jump to new TAB |
| ~~`[nzTransformFile]`~~     | ~~Customize transform file before request~~                                                                                                                                                                       | ~~`(file: NzUploadFile) => NzUploadTransformFileType`~~                                          | -               |
| `[nzIconRender]`            | Custom show icon                                                                                                                                                                                                  | `TemplateRef<{ $implicit: NzUploadFile }>`                                                       | -               |
| `[nzFileListRender]`        | Custom file list                                                                                                                                                                                                  | `TemplateRef<{ $implicit: NzUploadFile[] }>`                                                     | -               |

#### nzChange

> The function will be called when uploading is in progress, completed or failed

When uploading state changes, it returns:

```js
{
  file: { /* ... */ },
  fileList: [ /* ... */ ],
  event: { /* ... */ },
}
```

1. `file` File object for the current operation.

   ```js
   {
      uid: 'uid',      // unique identifier
      name: 'xx.png'   // file name
      status: 'done', // options：uploading, done, error, removed
      response: '{"status": "success"}', // response from server
      linkProps: '{"download": "image"}', // additional html props of file link
   }
   ```

2. `fileList` current list of files
3. `event` response from server, including uploading progress, supported by advanced browsers.

#### nzCustomRequest

Allows for advanced customization by overriding default behavior in `HttpClient`. Provide your own XMLHttpRequest calls to interface with custom backend processes or interact with AWS S3 service through the `aws-sdk` package.

`nzCustomRequest` callback is passed an object with:

- `onProgress: (event: { percent: number }): void`
- `onError: (event: Error): void`
- `onSuccess: (body: Object, xhr?: Object): void`
- `data: Object`
- `filename: String`
- `file: File`
- `withCredentials: Boolean`
- `action: String`
- `headers: Object`
