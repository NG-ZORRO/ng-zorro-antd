import { Component, OnInit, Input, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzBasicUploadComponent } from './nz-basic-upload.component';
import { NzUploadListComponent } from './nz-upload-list.component';
import { UidService } from './uid/uid.service';

@Component({
  selector: 'nz-upload',
  providers: [UidService],
  templateUrl: './nz-upload.component.html',
  styleUrls: [
    './style/index.less'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NzUploadComponent implements OnInit {

  _classMap;
  _prefixCls = 'ant-upload';

  @Input() nzAction: string;
  @Input() nzAccept: string;
  @Input() nzAutoUpload = true;
  @Input() nzCustomRequest: any = null;
  @Input() nzData: any;
  @Input() nzDisabled = false;
  @Input() nzFileList = [];
  @Input() nzHeaders: string | { [name: string]: string | string[] };
  @Input() nzListType = 'text';
  @Input() nzMultiple = false;
  @Input() nzShowUploadList = true;
  @Input() nzType = 'select';
  @Input() nzWithCredentials: boolean;

  @Input() nzOnChange: Function;
  @Input() nzOnError: Function;
  @Input() nzOnProgress: Function;
  @Input() nzOnPreview: Function;
  @Input() nzOnRemove: Function;
  @Input() nzOnStart: Function;
  @Input() nzOnSuccess: Function;

  @ViewChild(NzBasicUploadComponent) basicUpload: NzBasicUploadComponent;

  constructor(private elementRef: ElementRef, private uidService: UidService) {
    this.nzFileList = this.nzFileList.map(file => {
      file.uid = uidService.getUid;
      return this.processedRawFile(file);
    });
  }

  ngOnInit() {
    this.setClassMap();
  }

  setClassMap(): void {
    this._classMap = {
      ['ant-upload']: true,
      [`${this._prefixCls}-select`]: true,
      [`${this._prefixCls}-select-${this.nzListType}`]: true,
      [`${this._prefixCls}-disabled`]: this.nzDisabled,
    };
  }

  previewFile = (file, callback: Function) => {
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  private processedRawFile(rawFile) {
    rawFile.status = 'ready';
    rawFile.percent = 0;
    return rawFile;
  }

  private setFileList(file, key, value) {
    this.nzFileList[this.nzFileList.indexOf(file)][key] = value;
  }

  handleStart(file) {
    this.nzFileList.push(this.processedRawFile(file));
    const fileList = this.nzFileList;

    if (this.nzOnChange) {
      this.nzOnChange({ file: this.processedRawFile(file), fileList });
    }
  }

  handleProgress({ event, file }) {
    const percent = Math.round(100 * event.loaded / event.total);
    this.setFileList(file, 'status', 'uploading');
    this.setFileList(file, 'percent', percent);

    const fileList = this.nzFileList;

    if (this.nzOnProgress) {
      this.nzOnProgress({ event, file, fileList });
    }

    if (this.nzOnChange) {
      this.nzOnChange({
        event,
        file,
        fileList
      });
    }

  }

  handleSuccess({ ret, file, xhr }) {
    this.setFileList(file, 'status', 'done');
    if (this.nzListType === 'picture' || this.nzListType === 'picture-card') {
      this.previewFile(file, (previewDataUrl) => {
        this.setFileList(file, 'thumbUrl', previewDataUrl);
      });
    }

    const fileList = this.nzFileList;
    if (this.nzOnSuccess) {
      this.nzOnSuccess(ret, file, fileList);
    }

    if (this.nzOnChange) {
      this.nzOnChange({
        file,
        fileList
      });
    }
  }

  handleRemove(file) {
    if (file.status === 'uploading') {
      this.abort(file);
    }
    this.nzFileList.splice(this.nzFileList.indexOf(file), 1);

    const fileList = this.nzFileList;
    if (this.nzOnRemove) {
      this.nzOnRemove(file, fileList);
    }

    // TODO:this behavior isn't correct
    if (this.nzOnChange) {
      this.nzOnChange({
        file,
        fileList
      });
    }
  }

  handleError({ err, ret, file }) {

    // removed
    if (!file) {
      return;
    }
    this.setFileList(file, 'error', err);
    this.setFileList(file, 'response', ret);
    this.setFileList(file, 'status', 'error');

    const fileList = this.nzFileList;
    if (this.nzOnChange) {
      this.nzOnChange({
        file,
        fileList
      });
    }
  }

  abort(file) {
    this.basicUpload.abort(file);
  }
}
