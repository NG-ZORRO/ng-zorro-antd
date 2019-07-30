/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { of, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { toBoolean, InputBoolean, InputNumber } from 'ng-zorro-antd/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';

import {
  ShowUploadListInterface,
  UploadChangeParam,
  UploadFile,
  UploadFilter,
  UploadListType,
  UploadType,
  UploadXHRArgs,
  ZipButtonOptions
} from './interface';
import { NzUploadBtnComponent } from './nz-upload-btn.component';
import { NzUploadListComponent } from './nz-upload-list.component';

@Component({
  selector: 'nz-upload',
  exportAs: 'nzUpload',
  templateUrl: './nz-upload.component.html',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ant-upload-picture-card-wrapper]': 'nzListType === "picture-card"'
  }
})
export class NzUploadComponent implements OnInit, OnChanges, OnDestroy {
  private i18n$: Subscription;
  @ViewChild('uploadComp', { static: false }) uploadComp: NzUploadBtnComponent;
  @ViewChild('listComp', { static: false }) listComp: NzUploadListComponent;
  // tslint:disable-next-line:no-any
  locale: any = {};

  // #region fields

  @Input() nzType: UploadType = 'select';
  @Input() @InputNumber() nzLimit = 0;
  @Input() @InputNumber() nzSize = 0;

  @Input() nzFileType: string;
  @Input() nzAccept: string | string[];
  @Input() nzAction: string;
  @Input() @InputBoolean() nzDirectory = false;
  @Input() @InputBoolean() nzOpenFileDialogOnClick = true;
  @Input() nzBeforeUpload: (file: UploadFile, fileList: UploadFile[]) => boolean | Observable<boolean>;
  @Input() nzCustomRequest: (item: UploadXHRArgs) => Subscription;
  @Input() nzData: {} | ((file: UploadFile) => {});
  @Input() nzFilter: UploadFilter[] = [];
  @Input() nzFileList: UploadFile[] = [];
  @Input() @InputBoolean() nzDisabled = false;
  @Input() nzHeaders: {} | ((file: UploadFile) => {});
  @Input() nzListType: UploadListType = 'text';
  @Input() @InputBoolean() nzMultiple = false;
  @Input() nzName = 'file';

  private _showUploadList: boolean | ShowUploadListInterface = true;

  @Input()
  set nzShowUploadList(value: boolean | ShowUploadListInterface) {
    this._showUploadList = typeof value === 'boolean' ? toBoolean(value) : value;
  }

  get nzShowUploadList(): boolean | ShowUploadListInterface {
    return this._showUploadList;
  }

  @Input() @InputBoolean() nzShowButton = true;
  @Input() @InputBoolean() nzWithCredentials = false;

  @Input() nzRemove: (file: UploadFile) => boolean | Observable<boolean>;
  @Input() nzPreview: (file: UploadFile) => void;

  @Output() readonly nzChange: EventEmitter<UploadChangeParam> = new EventEmitter<UploadChangeParam>();
  @Output() readonly nzFileListChange: EventEmitter<UploadFile[]> = new EventEmitter<UploadFile[]>();

  _btnOptions: ZipButtonOptions;

  private zipOptions(): this {
    if (typeof this.nzShowUploadList === 'boolean' && this.nzShowUploadList) {
      this.nzShowUploadList = {
        showPreviewIcon: true,
        showRemoveIcon: true,
        hidePreviewIconInNonImage: false
      };
    }
    // filters
    const filters: UploadFilter[] = this.nzFilter.slice();
    if (this.nzMultiple && this.nzLimit > 0 && filters.findIndex(w => w.name === 'limit') === -1) {
      filters.push({
        name: 'limit',
        fn: (fileList: UploadFile[]) => fileList.slice(-this.nzLimit)
      });
    }
    if (this.nzSize > 0 && filters.findIndex(w => w.name === 'size') === -1) {
      filters.push({
        name: 'size',
        fn: (fileList: UploadFile[]) => fileList.filter(w => w.size / 1024 <= this.nzSize)
      });
    }
    if (this.nzFileType && this.nzFileType.length > 0 && filters.findIndex(w => w.name === 'type') === -1) {
      const types = this.nzFileType.split(',');
      filters.push({
        name: 'type',
        fn: (fileList: UploadFile[]) => fileList.filter(w => ~types.indexOf(w.type))
      });
    }
    this._btnOptions = {
      disabled: this.nzDisabled,
      accept: this.nzAccept,
      action: this.nzAction,
      directory: this.nzDirectory,
      openFileDialogOnClick: this.nzOpenFileDialogOnClick,
      beforeUpload: this.nzBeforeUpload,
      customRequest: this.nzCustomRequest,
      data: this.nzData,
      headers: this.nzHeaders,
      name: this.nzName,
      multiple: this.nzMultiple,
      withCredentials: this.nzWithCredentials,
      filters,
      onStart: this.onStart,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      onError: this.onError
    };
    return this;
  }

  // #endregion

  constructor(private cdr: ChangeDetectorRef, private i18n: NzI18nService) {}

  // #region upload

  private fileToObject(file: UploadFile): UploadFile {
    return {
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.filename || file.name,
      size: file.size,
      type: file.type,
      uid: file.uid,
      response: file.response,
      error: file.error,
      percent: 0,
      // tslint:disable-next-line:no-any
      originFileObj: file as any
    };
  }

  private getFileItem(file: UploadFile, fileList: UploadFile[]): UploadFile {
    return fileList.filter(item => item.uid === file.uid)[0];
  }

  private removeFileItem(file: UploadFile, fileList: UploadFile[]): UploadFile[] {
    return fileList.filter(item => item.uid !== file.uid);
  }

  private genErr(file: UploadFile): string {
    return file.response && typeof file.response === 'string'
      ? file.response
      : (file.error && file.error.statusText) || this.locale.uploadError;
  }

  private onStart = (file: UploadFile): void => {
    if (!this.nzFileList) {
      this.nzFileList = [];
    }
    const targetItem = this.fileToObject(file);
    targetItem.status = 'uploading';
    this.nzFileList = this.nzFileList.concat(targetItem);
    this.nzFileListChange.emit(this.nzFileList);
    this.nzChange.emit({ file: targetItem, fileList: this.nzFileList, type: 'start' });
    this.detectChangesList();
  };

  private onProgress = (e: { percent: number }, file: UploadFile): void => {
    const fileList = this.nzFileList;
    const targetItem = this.getFileItem(file, fileList);
    targetItem.percent = e.percent;
    this.nzChange.emit({
      event: e,
      file: { ...targetItem },
      fileList: this.nzFileList,
      type: 'progress'
    });
    this.detectChangesList();
  };

  private onSuccess = (res: {}, file: UploadFile): void => {
    const fileList = this.nzFileList;
    const targetItem = this.getFileItem(file, fileList);
    targetItem.status = 'done';
    targetItem.response = res;
    this.nzChange.emit({
      file: { ...targetItem },
      fileList,
      type: 'success'
    });
    this.detectChangesList();
  };

  private onError = (err: {}, file: UploadFile): void => {
    const fileList = this.nzFileList;
    const targetItem = this.getFileItem(file, fileList);
    targetItem.error = err;
    targetItem.status = 'error';
    targetItem.message = this.genErr(targetItem);
    this.nzChange.emit({
      file: { ...targetItem },
      fileList,
      type: 'error'
    });
    this.detectChangesList();
  };

  // #endregion

  // #region drag

  private dragState: string;

  // skip safari bug
  // tslint:disable-next-line:no-any
  fileDrop(e: any): void {
    if (e.type === this.dragState) {
      return;
    }
    this.dragState = e.type;
    this.setClassMap();
  }

  // #endregion

  // #region list

  private detectChangesList(): void {
    this.cdr.detectChanges();
    this.listComp.detectChanges();
  }

  onRemove = (file: UploadFile): void => {
    this.uploadComp.abort(file);
    file.status = 'removed';
    const fnRes =
      typeof this.nzRemove === 'function' ? this.nzRemove(file) : this.nzRemove == null ? true : this.nzRemove;
    (fnRes instanceof Observable ? fnRes : of(fnRes)).pipe(filter((res: boolean) => res)).subscribe(() => {
      this.nzFileList = this.removeFileItem(file, this.nzFileList);
      this.nzChange.emit({
        file,
        fileList: this.nzFileList,
        type: 'removed'
      });
      this.nzFileListChange.emit(this.nzFileList);
      this.cdr.detectChanges();
    });
  };

  // #endregion

  // #region styles

  private prefixCls = 'ant-upload';
  classList: string[] = [];

  private setClassMap(): void {
    let subCls: string[] = [];
    if (this.nzType === 'drag') {
      if (this.nzFileList.some(file => file.status === 'uploading')) {
        subCls.push(`${this.prefixCls}-drag-uploading`);
      }
      if (this.dragState === 'dragover') {
        subCls.push(`${this.prefixCls}-drag-hover`);
      }
    } else {
      subCls = [`${this.prefixCls}-select-${this.nzListType}`];
    }

    this.classList = [
      this.prefixCls,
      `${this.prefixCls}-${this.nzType}`,
      ...subCls,
      (this.nzDisabled && `${this.prefixCls}-disabled`) || ''
    ].filter(item => !!item);

    this.cdr.detectChanges();
  }

  // #endregion

  ngOnInit(): void {
    this.i18n$ = this.i18n.localeChange.subscribe(() => {
      this.locale = this.i18n.getLocaleData('Upload');
      this.detectChangesList();
    });
  }

  ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (changes.nzFileList) {
      (this.nzFileList || []).forEach(file => (file.message = this.genErr(file)));
    }
    this.zipOptions().setClassMap();
  }

  ngOnDestroy(): void {
    this.i18n$.unsubscribe();
  }
}
