/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  DOCUMENT,
  EventEmitter,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, of, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { fromEventOutsideAngular, toBoolean } from 'ng-zorro-antd/core/util';
import { NzI18nService, NzUploadI18nInterface } from 'ng-zorro-antd/i18n';

import {
  NzIconRenderTemplate,
  NzShowUploadList,
  NzUploadChangeParam,
  NzUploadFile,
  NzUploadListType,
  NzUploadTransformFileType,
  NzUploadType,
  NzUploadXHRArgs,
  UploadFilter,
  ZipButtonOptions,
  type NzBeforeUploadFileType
} from './interface';
import { NzUploadBtnComponent } from './upload-btn.component';
import { NzUploadListComponent } from './upload-list.component';

@Component({
  selector: 'nz-upload',
  exportAs: 'nzUpload',
  templateUrl: './upload.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ant-upload-picture-card-wrapper]': 'nzListType === "picture-card"'
  },
  imports: [NzUploadListComponent, NgTemplateOutlet, NzUploadBtnComponent]
})
export class NzUploadComponent implements OnInit, AfterViewInit, OnChanges {
  static ngAcceptInputType_nzShowUploadList: BooleanInput | NzShowUploadList;

  private cdr = inject(ChangeDetectorRef);
  private i18n = inject(NzI18nService);
  private directionality = inject(Directionality);
  private destroyRef = inject(DestroyRef);

  @ViewChild('uploadComp', { static: false }) uploadComp!: NzUploadBtnComponent;
  @ViewChild('listComp', { static: false }) listComp!: NzUploadListComponent;

  locale!: NzUploadI18nInterface;
  dir: Direction = 'ltr';

  // #region fields

  @Input() nzType: NzUploadType = 'select';
  @Input({ transform: numberAttribute }) nzLimit = 0;
  @Input({ transform: numberAttribute }) nzSize = 0;

  @Input() nzFileType?: string;
  @Input() nzAccept?: string | string[];
  @Input() nzAction?: string | ((file: NzUploadFile) => string | Observable<string>);
  @Input({ transform: booleanAttribute }) nzDirectory = false;
  @Input({ transform: booleanAttribute }) nzOpenFileDialogOnClick = true;
  @Input() nzBeforeUpload?: (file: NzUploadFile, fileList: NzUploadFile[]) => NzBeforeUploadFileType;
  @Input() nzCustomRequest?: (item: NzUploadXHRArgs) => Subscription;
  @Input() nzData?: {} | ((file: NzUploadFile) => {} | Observable<{}>);
  @Input() nzFilter: UploadFilter[] = [];
  @Input() nzFileList: NzUploadFile[] = [];
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input() nzHeaders?: {} | ((file: NzUploadFile) => {} | Observable<{}>);
  @Input() nzListType: NzUploadListType = 'text';
  @Input({ transform: booleanAttribute }) nzMultiple = false;
  @Input() nzName = 'file';

  private _showUploadList: boolean | NzShowUploadList = true;
  private document: Document = inject(DOCUMENT);

  @Input()
  set nzShowUploadList(value: boolean | NzShowUploadList) {
    this._showUploadList = typeof value === 'boolean' ? toBoolean(value) : value;
  }

  get nzShowUploadList(): boolean | NzShowUploadList {
    return this._showUploadList;
  }

  @Input({ transform: booleanAttribute }) nzShowButton = true;
  @Input({ transform: booleanAttribute }) nzWithCredentials = false;

  @Input() nzRemove?: (file: NzUploadFile) => boolean | Observable<boolean>;
  @Input() nzPreview?: (file: NzUploadFile) => void;
  @Input() nzPreviewFile?: (file: NzUploadFile) => Observable<string>;
  @Input() nzPreviewIsImage?: (file: NzUploadFile) => boolean;
  /**
   * @deprecated will be removed in v22.0.0
   * Use `nzBeforeUpload` instead.
   */
  @Input() nzTransformFile?: (file: NzUploadFile) => NzUploadTransformFileType;
  @Input() nzDownload?: (file: NzUploadFile) => void;
  @Input() nzIconRender: NzIconRenderTemplate | null = null;
  @Input() nzFileListRender: TemplateRef<{ $implicit: NzUploadFile[] }> | null = null;

  @Output() readonly nzChange: EventEmitter<NzUploadChangeParam> = new EventEmitter<NzUploadChangeParam>();
  @Output() readonly nzFileListChange: EventEmitter<NzUploadFile[]> = new EventEmitter<NzUploadFile[]>();

  _btnOptions?: ZipButtonOptions;

  private zipOptions(): this {
    if (typeof this.nzShowUploadList === 'boolean' && this.nzShowUploadList) {
      this.nzShowUploadList = {
        showPreviewIcon: true,
        showRemoveIcon: true,
        showDownloadIcon: true
      };
    }
    // filters
    const filters: UploadFilter[] = this.nzFilter.slice();
    if (this.nzMultiple && this.nzLimit > 0 && filters.findIndex(w => w.name === 'limit') === -1) {
      filters.push({
        name: 'limit',
        fn: (fileList: NzUploadFile[]) => fileList.slice(-this.nzLimit)
      });
    }
    if (this.nzSize > 0 && filters.findIndex(w => w.name === 'size') === -1) {
      filters.push({
        name: 'size',
        fn: (fileList: NzUploadFile[]) => fileList.filter(w => w.size! / 1024 <= this.nzSize)
      });
    }
    if (this.nzFileType && this.nzFileType.length > 0 && filters.findIndex(w => w.name === 'type') === -1) {
      const types = this.nzFileType.split(',');
      filters.push({
        name: 'type',
        fn: (fileList: NzUploadFile[]) => fileList.filter(w => ~types.indexOf(w.type!))
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
      transformFile: this.nzTransformFile,
      onStart: this.onStart,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      onError: this.onError
    };
    return this;
  }

  private readonly platform = inject(Platform);

  // #endregion

  // #region upload

  private fileToObject(file: NzUploadFile): NzUploadFile {
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
      originFileObj: file as NzSafeAny
    };
  }

  private getFileItem(file: NzUploadFile, fileList: NzUploadFile[]): NzUploadFile {
    return fileList.filter(item => item.uid === file.uid)[0];
  }

  private removeFileItem(file: NzUploadFile, fileList: NzUploadFile[]): NzUploadFile[] {
    return fileList.filter(item => item.uid !== file.uid);
  }

  private onStart = (file: NzUploadFile): void => {
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

  private onProgress = (e: { percent: number }, file: NzUploadFile): void => {
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

  private onSuccess = (res: {}, file: NzUploadFile): void => {
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

  private onError = (err: {}, file: NzUploadFile): void => {
    const fileList = this.nzFileList;
    const targetItem = this.getFileItem(file, fileList);
    targetItem.error = err;
    targetItem.status = 'error';
    this.nzChange.emit({
      file: { ...targetItem },
      fileList,
      type: 'error'
    });
    this.detectChangesList();
  };

  // #endregion

  // #region drag

  private dragState?: string;

  // skip safari bug
  fileDrop(e: DragEvent): void {
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
    this.listComp?.detectChanges();
  }

  onRemove = (file: NzUploadFile): void => {
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
      (this.nzDisabled && `${this.prefixCls}-disabled`) || '',
      (this.dir === 'rtl' && `${this.prefixCls}-rtl`) || ''
    ].filter(item => !!item);

    this.cdr.detectChanges();
  }

  // #endregion

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
      this.setClassMap();
      this.cdr.detectChanges();
    });

    this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Upload');
      this.detectChangesList();
    });
  }

  ngAfterViewInit(): void {
    if (this.platform.FIREFOX) {
      // fix firefox drop open new tab
      fromEventOutsideAngular<MouseEvent>(this.document.body, 'drop')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(event => {
          event.preventDefault();
          event.stopPropagation();
        });
    }
  }

  ngOnChanges(): void {
    this.zipOptions().setClassMap();
  }
}
