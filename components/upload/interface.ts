// tslint:disable:no-any prefer-method-signature
import { Observable, Subscription } from 'rxjs';

/** 状态 */
export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';

/** 上传方式 */
export type UploadType = 'select' | 'drag';

/** 上传列表的内建样式 */
export type UploadListType = 'text' | 'picture' | 'picture-card';

/** 文件对象 */
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
  linkProps?: any;
  type: string;

  [ key: string ]: any;
}

export interface UploadChangeParam {
  file: UploadFile;
  fileList: UploadFile[];
  event?: { percent: number };
  /** 回调类型 */
  type?: string;
}

export interface ShowUploadListInterface {
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
}

export interface ZipButtonOptions {
  disabled?: boolean;
  accept?: string | string[];
  action?: string;
  directory?: boolean;
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
  fn: (fileList: UploadFile[]) => UploadFile[];
}

export interface UploadXHRArgs {
  action?: string;
  name?: string;
  headers?: {};
  file: UploadFile;
  data?: {};
  withCredentials?: boolean;
  onProgress?: (e: any, file: UploadFile) => void;
  onSuccess?: (ret: any, file: UploadFile, xhr: any) => void;
  onError?: (err: any, file: UploadFile) => void;
}
