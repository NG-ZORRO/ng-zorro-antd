// tslint:disable:ordered-imports no-any
import { Component, ChangeDetectionStrategy, ViewChild, ViewEncapsulation, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, SimpleChange, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { filter } from 'rxjs/operators/filter';
import { toBoolean } from '../util/convert';
import { NzLocaleService } from '../locale/index';
import { NzUploadBtnComponent } from './nz-upload-btn.component';
import { UploadFile, UploadListType, ShowUploadListInterface, UploadChangeParam, UploadType, ZipButtonOptions, UploadFileStatus, UploadFilter } from './interface';

@Component({
  selector: 'nz-upload',
  template: `
  <ng-template #list>
    <nz-upload-list *ngIf="nzShowUploadList"
      [listType]="nzListType"
      [items]="nzFileList"
      [icons]="nzShowUploadList"
      [onPreview]="nzPreview"
      [onRemove]="onRemove"></nz-upload-list>
  </ng-template>
  <ng-template #con><ng-content></ng-content></ng-template>
  <ng-template #btn>
    <div [ngClass]="_classList" [style.display]="nzShowButton ? '' : 'none'">
      <div nz-upload-btn #upload [options]="_btnOptions">
        <ng-template [ngTemplateOutlet]="con"></ng-template>
      </div>
    </div>
  </ng-template>
  <ng-container *ngIf="nzType === 'drag'; else select">
    <div [ngClass]="_classList"
        (drop)="fileDrop($event)"
        (dragover)="fileDrop($event)"
        (dragleave)="fileDrop($event)">
        <div nz-upload-btn #upload [options]="_btnOptions" [classes]="['ant-upload-btn']">
          <div class="ant-upload-drag-container">
            <ng-template [ngTemplateOutlet]="con"></ng-template>
          </div>
        </div>
    </div>
    <ng-template [ngTemplateOutlet]="list"></ng-template>
  </ng-container>
  <ng-template #select>
    <ng-container *ngIf="nzListType === 'picture-card'; else pic">
      <ng-template [ngTemplateOutlet]="list"></ng-template>
      <ng-template [ngTemplateOutlet]="btn"></ng-template>
    </ng-container>
  </ng-template>
  <ng-template #pic>
    <ng-template [ngTemplateOutlet]="btn"></ng-template>
    <ng-template [ngTemplateOutlet]="list"></ng-template>
  </ng-template>
  `,
  styleUrls: [
    './style/index.less',
    './style/patch.less'
  ],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzUploadComponent implements OnInit, OnChanges, OnDestroy {

  private inited = false;
  private progressTimer: any;
  /** @private */
  @ViewChild('upload') upload: NzUploadBtnComponent;

  // region: fields
  @Input() nzType: UploadType = 'select';
  @Input() nzLimit: number = 0;
  @Input() nzSize: number = 0;
  @Input() nzFileType: string;
  @Input() nzAccept: string;
  @Input() nzAction: string;
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

  @Input() nzHeaders: {};
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

  /** @private */
  _btnOptions: ZipButtonOptions;

  private zipOptions(): this {
    if (typeof this.nzShowUploadList === 'boolean' && this.nzShowUploadList) {
      this.nzShowUploadList = {
        showPreviewIcon: true,
        showRemoveIcon: true
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
        fn: (fileList: UploadFile[]) => fileList.filter(w => (w.size / 1024) <= this.nzSize)
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

  // endregion

  constructor(private cd: ChangeDetectorRef, private _locale: NzLocaleService) {}

  // region: upload

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
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      originFileObj: <any>file
    };
  }

  private getFileItem(file: UploadFile, fileList: UploadFile[]): UploadFile {
    const matchKey = file.uid !== undefined ? 'uid' : 'name';
    return fileList.filter(item => item[matchKey] === file[matchKey])[0];
  }

  private removeFileItem(file: UploadFile, fileList: UploadFile[]): UploadFile[] {
    const matchKey = file.uid !== undefined ? 'uid' : 'name';
    const removed = fileList.filter(item => item[matchKey] !== file[matchKey]);
    if (removed.length === fileList.length) {
      return null;
    }
    return removed;
  }

  private uploadErrorText = this._locale.translate('Upload.uploadError');
  private genErr(file: UploadFile): string {
    return file.response && typeof file.response === 'string' ?
            file.response :
            (file.error && file.error.statusText) || this.uploadErrorText;
  }

  private clearProgressTimer(): void {
    clearInterval(this.progressTimer);
  }

  private genPercentAdd(): (s: number) => number {
    let k = 0.1;
    const i = 0.01;
    const end = 0.98;
    return (s: number) => {
      let start = s;
      if (start >= end) {
        return start;
      }

      start += k;
      k = k - i;
      if (k < 0.001) {
        k = 0.001;
      }
      return start * 100;
    };
  }

  private autoUpdateProgress(file: UploadFile): void {
    const getPercent = this.genPercentAdd();
    let curPercent = 0;
    this.clearProgressTimer();
    this.progressTimer = setInterval(() => {
      curPercent = getPercent(curPercent);
      this.onProgress({
        percent: curPercent,
      }, file);
    }, 200);
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
    reader.onloadend = () => file.thumbUrl = reader.result;
    reader.readAsDataURL(file.originFileObj);
  }

  private onStart = (file: any): void => {
    if (!this.nzFileList) this.nzFileList = [];
    const targetItem = this.fileToObject(file);
    targetItem.status = 'uploading';
    this.nzFileList.push(targetItem);
    this.genThumb(targetItem);
    this.nzFileListChange.emit(this.nzFileList);
    this.nzChange.emit({ file: targetItem, fileList: this.nzFileList });
    // fix ie progress
    if (!(window as any).FormData) {
      this.autoUpdateProgress(targetItem);
    }
    this.cd.detectChanges();
  }

  private onProgress = (e: { percent: number }, file: UploadFile): void => {
    const fileList = this.nzFileList;
    const targetItem = this.getFileItem(file, fileList);
    // removed
    if (!targetItem) return;
    targetItem.percent = e.percent;
    this.nzChange.emit({
      event: e,
      file: { ...targetItem },
      fileList: this.nzFileList,
    });
    this.cd.detectChanges();
  }

  private onSuccess = (res: any, file: any, xhr?: any): void => {
    this.clearProgressTimer();
    const fileList = this.nzFileList;
    const targetItem = this.getFileItem(file, fileList);
    // removed
    if (!targetItem) return;
    targetItem.status = 'done';
    targetItem.response = res;
    this.nzChange.emit({
      file: { ...targetItem },
      fileList,
    });
    this.cd.detectChanges();
  }

  private onError = (err: any, file: any): void => {
    this.clearProgressTimer();
    const fileList = this.nzFileList;
    const targetItem = this.getFileItem(file, fileList);
    // removed
    if (!targetItem) return;
    targetItem.error = err;
    targetItem.status = 'error';
    targetItem.message = this.genErr(file);
    this.nzChange.emit({
      file: { ...targetItem },
      fileList,
    });
    this.cd.detectChanges();
  }

  // endregion

  // region: drag

  private dragState: string;
  fileDrop(e: DragEvent): void {
    if (e.type === this.dragState) return;
    this.dragState = e.type;
    this._setClassMap();
  }

  // endregion

  // region: list

  onRemove = (file: UploadFile): void => {
    this.upload.abort(file);
    file.status = 'removed';
    ((this.nzRemove ? this.nzRemove instanceof Observable ? this.nzRemove : of(this.nzRemove(file)) : of(true)) as Observable<any>)
      .pipe(filter((res: boolean) => res))
      .subscribe(res => {
        const removedFileList = this.removeFileItem(file, this.nzFileList);
        if (removedFileList) {
          this.nzFileList = removedFileList;
          this.nzChange.emit({
            file,
            fileList: removedFileList
          });
          this.nzFileListChange.emit(this.nzFileList);
          this.cd.detectChanges();
        }
      });
  }

  // endregion

  // region: styles
  _prefixCls = 'ant-upload';
  _classList: string[] = [];
  _setClassMap(): void {
    const isDrag = this.nzType === 'drag';
    let subCls: string[] = [];
    if (this.nzType === 'drag') {
      subCls = [
        this.nzFileList.some(file => file.status === 'uploading') && `${this._prefixCls}-drag-uploading`,
        this.dragState === 'dragover' && `${this._prefixCls}-drag-hover`
      ];
    } else {
      subCls = [
        `${this._prefixCls}-select-${this.nzListType}`
      ];
    }

    this._classList = [
      this._prefixCls,
      `${this._prefixCls}-${this.nzType}`,
      ...subCls,
      this.nzDisabled && `${this._prefixCls}-disabled`
    ].filter(item => !!item);

    this.cd.detectChanges();
  }
  // endregion

  ngOnInit(): void {
    this.inited = true;
  }

  ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (changes.nzFileList) (this.nzFileList || []).forEach(file => file.message = this.genErr(file));
    this.zipOptions()._setClassMap();
  }

  ngOnDestroy(): void {
    this.clearProgressTimer();
  }
}
