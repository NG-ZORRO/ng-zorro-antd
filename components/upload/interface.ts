/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

// tslint:disable:no-any prefer-method-signature
import { Observable, Subscription } from 'rxjs';

import { IndexableObject } from 'ng-zorro-antd/core';

/** Status */
export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';

/** Uploading type. */
export type UploadType = 'select' | 'drag';

/** Built-in styles of the uploading list. */
export type UploadListType = 'text' | 'picture' | 'picture-card';

/** File object. */
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  filename?: string;
  lastModified?: string;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  originFileObj?: File;
  percent?: number;
  thumbUrl?: string;
  response?: any;
  error?: any;
  linkProps?: { download: string };
  type: string;

  [key: string]: any;
}

export interface UploadChangeParam {
  file: UploadFile;
  fileList: UploadFile[];
  event?: { percent: number };
  /** Callback type. */
  type?: string;
}

export interface ShowUploadListInterface {
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
  hidePreviewIconInNonImage?: boolean;
}

export interface ZipButtonOptions {
  disabled?: boolean;
  accept?: string | string[];
  action?: string;
  directory?: boolean;
  openFileDialogOnClick?: boolean;
  beforeUpload?: (file: UploadFile, fileList: UploadFile[]) => boolean | Observable<any>;
  customRequest?: (item: any) => Subscription;
  data?: {} | ((file: UploadFile) => {});
  headers?: {} | ((file: UploadFile) => {});
  name?: string;
  multiple?: boolean;
  withCredentials?: boolean;
  filters?: UploadFilter[];
  onStart?: (file: UploadFile) => void;
  onProgress?: (e: any, file: UploadFile) => void;
  onSuccess?: (ret: any, file: UploadFile, xhr: any) => void;
  onError?: (err: any, file: UploadFile) => void;
}

export interface UploadFilter {
  name: string;
  fn: (fileList: UploadFile[]) => UploadFile[] | Observable<UploadFile[]>;
}

export interface UploadXHRArgs {
  action?: string;
  name?: string;
  headers?: IndexableObject;
  file: UploadFile;
  data?: IndexableObject;
  withCredentials?: boolean;
  onProgress?: (e: any, file: UploadFile) => void;
  onSuccess?: (ret: any, file: UploadFile, xhr: any) => void;
  onError?: (err: any, file: UploadFile) => void;
}
