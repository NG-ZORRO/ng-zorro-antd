import { Component, EventEmitter, Input, Output, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UidService } from './uid/uid.service';
import defaultRequest from './request';
import { attrAccept } from './utils';

@Component({
    selector: 'nz-basic-upload',
    providers: [UidService],
    templateUrl: './nz-basic-upload.component.html',
    styleUrls: [
        './style/index.less'
    ]
})
export class NzBasicUploadComponent implements OnInit {

    _classMap;
    _prefixCls = 'nz-upload';
    _reqs = {};

    // data: { [key: string]: string } | ((file: File) => { string: string }) = {};

    @Input() accept: string;
    @Input() action: string;
    @Input() autoUpload = true;
    @Input() disabled = false;
    @Input() headers: string | { [name: string]: string | string[] } = {};
    @Input() multiple = false;
    @Input() name: string;
    @Input() withCredentials = false;

    @Input() beforeUpload: (file: File, files: FileList) => boolean | Promise<any> = null;
    @Input() customRequest: any;
    @Input() data: any;

    @Output() onError = new EventEmitter<any>();
    @Output() onProgress = new EventEmitter<any>();
    @Output() onRemove = new EventEmitter<any>();
    @Output() onStart = new EventEmitter<any>();
    @Output() onSuccess = new EventEmitter<any>();

    @ViewChild('input') inputElement: ElementRef;



    constructor(private uidService: UidService) { }

    ngOnInit() { }

    setClassMap(): void {
        this._classMap = {
            [this._prefixCls]: true,
        };
    }

    onChange = (e) => {
        const files: FileList = e.target.files;
        if (!files) { return };
        this.uploadFiles(files);
    }

    uploadFiles(files: FileList) {
        const postFiles = Array.prototype.slice.call(files);
        console.log('Start Upload Files');

        postFiles.forEach((file) => {
            file.uid = this.uidService.getUid();
            this.onStart.emit(file);
            if (this.autoUpload) {
                this.upload(file, postFiles);
            }
        });

        console.log('End Upload Files');
    }

    upload(file, fileList) {
        if (!this.beforeUpload) {
            this.post(file);
        } else {
            const before = this.beforeUpload(file, fileList);
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
        const { onProgress, accept, onSuccess } = this;
        const { uid } = file;
        if (!attrAccept(file, accept)) {
            return;
        }
        const request = this.customRequest || defaultRequest;

        if (typeof this.data === 'function') {
            this.data = this.data(file);
        }


        this._reqs[uid] = request({
            action: this.action,
            filename: this.name,
            file,
            data: this.data,
            headers: this.headers,
            withCredentials: this.withCredentials,
            onProgress: onProgress ? event => {
                this.onProgress.emit({ event, file });
            } : null,
            onSuccess: (ret, xhr) => {
                delete this._reqs[uid];
                this.onSuccess.emit({ ret, file, xhr });
            },
            onError: (err, ret) => {
                delete this._reqs[uid];
                this.onError.emit({ err, ret, file });
            },
        });
    }

    onClick(ev) {
        if (!this.disabled) {
            this.inputElement.nativeElement.value = null;
            this.inputElement.nativeElement.click();
        }
    }

}
