import { Component, EventEmitter, Input, Output, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { UidService } from './uid/uid.service';
import defaultRequest from './request';
import { attrAccept } from './utils';

@Component({
    selector: 'nz-basic-upload',
    providers: [UidService],
    templateUrl: './nz-basic-upload.component.html',
    styleUrls: [
        './style/index.less'
    ],
    encapsulation: ViewEncapsulation.None
})
export class NzBasicUploadComponent implements OnInit {

    _classMap;
    _prefixCls = 'ant-upload';
    _reqs = {};

    @Input() nzAction: string;
    @Input() nzAccept: string;
    @Input() nzAutoUpload = true;
    @Input() nzBeforeUpload: (file: File, files: FileList) => boolean | Promise<any> = null;
    @Input() nzCustomRequest: any = null;
    @Input() nzData: any;
    @Input() nzDisabled = false;
    @Input() nzHeaders: string | { [name: string]: string | string[] };
    @Input() nzMultiple = false;
    @Input() name: string;
    @Input() nzWithCredentials = false;

    @Output() nzOnError = new EventEmitter<any>();
    @Output() nzOnProgress = new EventEmitter<any>();
    @Output() nzOnRemove = new EventEmitter<any>();
    @Output() nzOnStart = new EventEmitter<any>();
    @Output() nzOnSuccess = new EventEmitter<any>();

    @ViewChild('input') inputElement: ElementRef;



    constructor(private uidService: UidService) { }

    ngOnInit() {
        this.setClassMap();
    }

    setClassMap(): void {
        this._classMap = {
            [`${this._prefixCls}`]: true,
            [`${this._prefixCls}-disabled`]: this.nzDisabled,
        };
    }

    onChange = (e) => {
        const files: FileList = e.target.files;
        if (!files) { return };
        this.uploadFiles(files);
    }

    uploadFiles(files: FileList) {
        const postFiles = Array.prototype.slice.call(files);

        postFiles.forEach((file) => {
            file.uid = this.uidService.getUid();
            this.nzOnStart.emit(file);
            if (this.nzAutoUpload) {
                this.upload(file, postFiles);
            }
        });
    }

    upload(file, fileList) {
        if (!this.nzBeforeUpload) {
            this.post(file);
        } else {
            const before = this.nzBeforeUpload(file, fileList);
            if (before instanceof Promise && before && before.then) {
                before.then((processedFile) => {
                    const processedFileType = Object.prototype.toString.call(processedFile);
                    if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
                        this.post(processedFile);
                    } else {
                        this.post(file);
                    }
                }).catch(e => {
                    console.log(e);
                });
            } else if (before !== false) {
                this.post(file);
            }
        }
    }

    abort(file) {
        if (file) {
            const { uid } = file;
            this._reqs[uid].abort();
            delete this._reqs[uid];
        } else {
            Object.keys(this._reqs).forEach((uid) => {
                if (this._reqs[uid]) { this._reqs[uid].abort() };
                delete this._reqs[uid];
            });
        }
    }

    post(file) {
        const { nzOnProgress, nzAccept, nzOnSuccess } = this;
        const { uid } = file;
        if (!attrAccept(file, nzAccept)) {
            return;
        }
        const request = this.nzCustomRequest || defaultRequest;

        if (typeof this.nzData === 'function') {
            this.nzData = this.nzData(file);
        }


        this._reqs[uid] = request({
            action: this.nzAction,
            filename: this.name,
            file,
            data: this.nzData,
            headers: this.nzHeaders,
            withCredentials: this.nzWithCredentials,
            onProgress: nzOnProgress ? event => {
                this.nzOnProgress.emit({ event, file });
            } : null,
            onSuccess: (ret, xhr) => {
                delete this._reqs[uid];
                this.nzOnSuccess.emit({ ret, file, xhr });
            },
            onError: (err, ret) => {
                delete this._reqs[uid];
                this.nzOnError.emit({ err, ret, file });
            },
        });
    }

    onClick(ev) {
        if (!this.nzDisabled) {
            this.inputElement.nativeElement.value = null;
            this.inputElement.nativeElement.click();
        }
    }

}
