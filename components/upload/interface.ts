/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { IndexableObject, NzSafeAny } from 'ng-zorro-antd/core/types';

/** Status */
export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';

export type NzUploadType = 'select' | 'drag';

/** Built-in styles of the uploading list. */
export type NzUploadListType = 'text' | 'picture' | 'picture-card';

export interface NzUploadFile {
  uid: string;
  size?: number;
  name: string;
  filename?: string;
  lastModified?: string;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  originFileObj?: File;
  percent?: number;
  thumbUrl?: string;
  response?: NzSafeAny;
  error?: NzSafeAny;
  linkProps?: { download: string };
  type?: string;

  [key: string]: NzSafeAny;
}

export interface NzUploadChangeParam {
  file: NzUploadFile;
  fileList: NzUploadFile[];
  event?: { percent: number };
  /** Callback type. */
  type?: string;
}

export interface NzShowUploadList {
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
  showDownloadIcon?: boolean;
}

/**
 * @deprecated will be removed in v22.0.0
 * Use `NzBeforeUploadFileType` instead.
 */
export type NzUploadTransformFileType = string | Blob | NzUploadFile | Observable<string | Blob | File>;

export type NzBeforeUploadFileType =
  | boolean
  | Observable<boolean | NzUploadFile | Blob | File | boolean>
  | Promise<boolean | NzUploadFile | Blob | File | boolean>;

export interface ZipButtonOptions {
  disabled?: boolean;
  accept?: string | string[];
  action?: string | ((file: NzUploadFile) => string | Observable<string>);
  directory?: boolean;
  openFileDialogOnClick?: boolean;
  beforeUpload?(file: NzUploadFile, fileList: NzUploadFile[]): NzBeforeUploadFileType;
  customRequest?(item: NzSafeAny): Subscription;
  data?: {} | ((file: NzUploadFile) => {} | Observable<{}>);
  headers?: {} | ((file: NzUploadFile) => {} | Observable<{}>);
  name?: string;
  multiple?: boolean;
  withCredentials?: boolean;
  filters?: UploadFilter[];
  transformFile?(file: NzUploadFile): NzUploadTransformFileType;
  onStart?(file: NzUploadFile): void;
  onProgress?(e: NzSafeAny, file: NzUploadFile): void;
  onSuccess?(ret: NzSafeAny, file: NzUploadFile, xhr: NzSafeAny): void;
  onError?(err: NzSafeAny, file: NzUploadFile): void;
}

export interface UploadFilter {
  name: string;
  fn(fileList: NzUploadFile[]): NzUploadFile[] | Observable<NzUploadFile[]>;
}

export interface NzUploadXHRArgs {
  action?: string;
  name?: string;
  headers?: IndexableObject;
  file: NzUploadFile;
  postFile: string | Blob | File | NzUploadFile;
  data?: IndexableObject;
  withCredentials?: boolean;
  onProgress?(e: NzSafeAny, file: NzUploadFile): void;
  onSuccess?(ret: NzSafeAny, file: NzUploadFile, xhr: NzSafeAny): void;
  onError?(err: NzSafeAny, file: NzUploadFile): void;
}

export type NzIconRenderTemplate = TemplateRef<{ $implicit: NzUploadFile }>;
