// tslint:disable: no-any
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
  ViewChild
} from '@angular/core';
import { of, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { toBoolean, toNumber, InputBoolean } from '../core/util/convert';
import { NzI18nService } from '../i18n/nz-i18n.service';

import {
  ShowUploadListInterface,
  UploadChangeParam,
  UploadFile,
  UploadFilter,
  UploadListType,
  UploadType,
  ZipButtonOptions
} from './interface';
import { NzUploadBtnComponent } from './nz-upload-btn.component';

@Component({
  selector           : 'nz-upload',
  templateUrl        : './nz-upload.component.html',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush
})
export class NzUploadComponent implements OnInit, OnChanges, OnDestroy {
  private i18n$: Subscription;
  locale: any = {};
  @ViewChild('upload') upload: NzUploadBtnComponent;

  // region: fields
  @Input() nzType: UploadType = 'select';
  private _limit: number = 0;

  @Input()
  set nzLimit(value: number) {
    this._limit = toNumber(value, null);
  }

  get nzLimit(): number {
    return this._limit;
  }

  private _size: number = 0;

  @Input()
  set nzSize(value: number) {
    this._size = toNumber(value, null);
  }

  get nzSize(): number {
    return this._size;
  }

  @Input() nzFileType: string;
  @Input() nzAccept: string | string[];
  @Input() nzAction: string;
  @Input() @InputBoolean() nzDirectory: boolean = false;
  @Input() nzBeforeUpload: (file: UploadFile, fileList: UploadFile[]) => boolean | Observable<any>;
  @Input() nzCustomRequest: (item: any) => Subscription;
  @Input() nzData: {} | ((file: UploadFile) => {});
  @Input() nzFilter: UploadFilter[] = [];
  @Input() nzFileList: UploadFile[] = [];
  @Output() nzFileListChange: EventEmitter<UploadFile[]> = new EventEmitter<UploadFile[]>();

  private _disabled = false;

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input() nzHeaders: {} | ((file: UploadFile) => {});
  @Input() nzListType: UploadListType = 'text';

  private _multiple = false;

  @Input()
  set nzMultiple(value: boolean) {
    this._multiple = toBoolean(value);
  }

  get nzMultiple(): boolean {
    return this._multiple;
  }

  @Input() nzName = 'file';

  private _showUploadList: boolean | ShowUploadListInterface = true;

  @Input()
  set nzShowUploadList(value: boolean | ShowUploadListInterface) {
    this._showUploadList = typeof value === 'boolean' ? toBoolean(value) : value;
  }

  get nzShowUploadList(): boolean | ShowUploadListInterface {
    return this._showUploadList;
  }

  private _showBtn = true;

  @Input()
  set nzShowButton(value: boolean) {
    this._showBtn = toBoolean(value);
  }

  get nzShowButton(): boolean {
    return this._showBtn;
  }

  private _withCredentials = false;

  @Input()
  set nzWithCredentials(value: boolean) {
    this._withCredentials = toBoolean(value);
  }

  get nzWithCredentials(): boolean {
    return this._withCredentials;
  }

  @Input() nzRemove: (file: UploadFile) => boolean | Observable<boolean>;
  @Input() nzPreview: (file: UploadFile) => void;

  @Output() nzChange: EventEmitter<UploadChangeParam> = new EventEmitter<UploadChangeParam>();

  _btnOptions: ZipButtonOptions;

  private zipOptions(): this {
    if (typeof this.nzShowUploadList === 'boolean' && this.nzShowUploadList) {
      this.nzShowUploadList = {
        showPreviewIcon: true,
        showRemoveIcon : true
      };
    }
    // filters
    const filters: UploadFilter[] = this.nzFilter.slice();
    if (this.nzMultiple && this.nzLimit > 0 && filters.findIndex(w => w.name === 'limit') === -1) {
      filters.push({
        name: 'limit',
        fn  : (fileList: UploadFile[]) => fileList.slice(-this.nzLimit)
      });
    }
    if (this.nzSize > 0 && filters.findIndex(w => w.name === 'size') === -1) {
      filters.push({
        name: 'size',
        fn  : (fileList: UploadFile[]) => fileList.filter(w => (w.size / 1024) <= this.nzSize)
      });
    }
    if (this.nzFileType && this.nzFileType.length > 0 && filters.findIndex(w => w.name === 'type') === -1) {
      const types = this.nzFileType.split(',');
      filters.push({
        name: 'type',
        fn  : (fileList: UploadFile[]) => fileList.filter(w => ~types.indexOf(w.type))
      });
    }
    this._btnOptions = {
      disabled       : this.nzDisabled,
      accept         : this.nzAccept,
      action         : this.nzAction,
      directory      : this.nzDirectory,
      beforeUpload   : this.nzBeforeUpload,
      customRequest  : this.nzCustomRequest,
      data           : this.nzData,
      headers        : this.nzHeaders,
      name           : this.nzName,
      multiple       : this.nzMultiple,
      withCredentials: this.nzWithCredentials,
      filters,
      onStart        : this.onStart,
      onProgress     : this.onProgress,
      onSuccess      : this.onSuccess,
      onError        : this.onError
    };
    return this;
  }

  // endregion
  constructor(private cd: ChangeDetectorRef, private i18n: NzI18nService) {
  }

  // region: upload
  private fileToObject(file: UploadFile): UploadFile {
    return {
      lastModified    : file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name            : file.filename || file.name,
      size            : file.size,
      type            : file.type,
      uid             : file.uid,
      response        : file.response,
      error           : file.error,
      percent         : 0,
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      originFileObj   : <any> file
    };
  }

  private getFileItem(file: UploadFile, fileList: UploadFile[]): UploadFile {
    return fileList.filter(item => item.uid === file.uid)[ 0 ];
  }

  private removeFileItem(file: UploadFile, fileList: UploadFile[]): UploadFile[] {
    return fileList.filter(item => item.uid !== file.uid);
  }

  private genErr(file: UploadFile): string {
    return file.response && typeof file.response === 'string' ?
      file.response :
      (file.error && file.error.statusText) || this.locale.uploadError;
  }

  private genThumb(file: UploadFile): void {
    if (typeof document === 'undefined' ||
      typeof window === 'undefined' ||
      !(window as any).FileReader || !(window as any).File ||
      !(file.originFileObj instanceof File) ||
      file.thumbUrl !== undefined
    ) {
      return;
    }

    file.thumbUrl = '';

    const reader = new FileReader();
    reader.onloadend = () => file.thumbUrl = reader.result as string;
    reader.readAsDataURL(file.originFileObj);
  }

  private onStart = (file: any): void => {
    if (!this.nzFileList) {
      this.nzFileList = [];
    }
    const targetItem = this.fileToObject(file);
    targetItem.status = 'uploading';
    this.nzFileList.push(targetItem);
    this.genThumb(targetItem);
    this.nzFileListChange.emit(this.nzFileList);
    this.nzChange.emit({ file: targetItem, fileList: this.nzFileList, type: 'start' });
    this.cd.detectChanges();
  }

  private onProgress = (e: { percent: number }, file: UploadFile): void => {
    const fileList = this.nzFileList;
    const targetItem = this.getFileItem(file, fileList);
    targetItem.percent = e.percent;
    this.nzChange.emit({
      event   : e,
      file    : { ...targetItem },
      fileList: this.nzFileList,
      type    : 'progress'
    });
    this.cd.detectChanges();
  }

  private onSuccess = (res: any, file: any, xhr?: any): void => {
    const fileList = this.nzFileList;
    const targetItem = this.getFileItem(file, fileList);
    targetItem.status = 'done';
    targetItem.response = res;
    this.nzChange.emit({
      file: { ...targetItem },
      fileList,
      type: 'success'
    });
    this.cd.detectChanges();
  }

  private onError = (err: any, file: any): void => {
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
    this.cd.detectChanges();
  }

  // endregion
  // region: drag
  private dragState: string;

  fileDrop(e: DragEvent): void {
    if (e.type === this.dragState) {
      return;
    }
    this.dragState = e.type;
    this.setClassMap();
  }

  // endregion
  // region: list
  onRemove = (file: UploadFile): void => {
    this.upload.abort(file);
    file.status = 'removed';
    const fnRes = typeof this.nzRemove === 'function' ?
      this.nzRemove(file) : this.nzRemove == null ? true : this.nzRemove;
    (fnRes instanceof Observable ? fnRes : of(fnRes))
    .pipe(filter((res: boolean) => res))
    .subscribe(() => {
      this.nzFileList = this.removeFileItem(file, this.nzFileList);
      this.nzChange.emit({
        file,
        fileList: this.nzFileList,
        type    : 'removed'
      });
      this.nzFileListChange.emit(this.nzFileList);
      this.cd.detectChanges();
    });
  }

  // endregion
  // region: styles
  prefixCls = 'ant-upload';
  classList: string[] = [];

  setClassMap(): void {
    const isDrag = this.nzType === 'drag';
    let subCls: string[] = [];
    if (this.nzType === 'drag') {
      subCls = [
        this.nzFileList.some(file => file.status === 'uploading') && `${this.prefixCls}-drag-uploading`,
        this.dragState === 'dragover' && `${this.prefixCls}-drag-hover`
      ];
    } else {
      subCls = [
        `${this.prefixCls}-select-${this.nzListType}`
      ];
    }

    this.classList = [
      this.prefixCls,
      `${this.prefixCls}-${this.nzType}`,
      ...subCls,
      this.nzDisabled && `${this.prefixCls}-disabled`
    ].filter(item => !!item);

    this.cd.detectChanges();
  }

  // endregion
  ngOnInit(): void {
    this.i18n$ = this.i18n.localeChange.subscribe(() => {
      this.locale = this.i18n.getLocaleData('Upload');
      this.cd.detectChanges();
    });
  }

  ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (changes.nzFileList) {
      (this.nzFileList || []).forEach(file => file.message = this.genErr(file));
    }
    this.zipOptions().setClassMap();
  }

  ngOnDestroy(): void {
    this.i18n$.unsubscribe();
  }
}
