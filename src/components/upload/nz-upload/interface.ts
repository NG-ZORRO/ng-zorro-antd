export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';

export interface HttpRequestHeader {
  [key: string]: string;
}

export interface UploadFile {
  uid: number;
  size: number;
  name: string;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  percent?: number;
  thumbUrl?: string;
  originFileObj?: File;
  response?: any;
  error?: any;
}

export interface UploadChangeParam {
  file: UploadFile;
  fileList: Array<UploadFile>;
  event?: { percent: number };
}

export interface ShowUploadListInterface {
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
}

export interface UploadLocale {
  uploading?: string;
  removeFile?: string;
  uploadError?: string;
  previewFile?: string;
}

export interface UploadProps {
  type?: 'select';
  name?: string;
  action?: string;
  headers?: HttpRequestHeader;
  showUploadList?: boolean | ShowUploadListInterface;
  multiple?: boolean;
  beforeUpload?: (file: UploadFile, FileList: UploadFile[]) => boolean | PromiseLike<any>;
  onChange?: (info: UploadChangeParam) => void;
  className?: string;
  disabled?: boolean;
  prefixCls?: string;
  withCredentials?: boolean;
  locale?: UploadLocale;
}
