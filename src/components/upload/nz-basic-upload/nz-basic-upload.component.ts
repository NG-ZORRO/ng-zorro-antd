import { Component, EventEmitter, Input, Output, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHeaders, HttpParams, HttpEventType, HttpResponse } from '@angular/common/http';
import { UidService } from '../uid/uid.service';
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
    @Input() withCredentials = false;

    @Input() beforeUpload: (file: File, files: FileList) => boolean | Promise<any> = null;

    @Output() onError = new EventEmitter<any>();
    @Output() onProgress = new EventEmitter<any>();
    @Output() onRemove = new EventEmitter<any>();
    @Output() onStart = new EventEmitter<any>();
    @Output() onSuccess = new EventEmitter<any>();

    @ViewChild('input') inputElement: ElementRef;



    constructor(private http: HttpClient, private uidService: UidService) { }

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
            this._reqs[uid].unsubscribe();
            delete this._reqs[uid];
        } else {
            Object.keys(this._reqs).forEach((uid) => {
                if (this._reqs[uid]) { this._reqs[uid].abort() };
                delete this._reqs[uid];
            });
        }
    }

    post(file) {
        // let { data } = props;
        const { onStart, onProgress, accept, onSuccess } = this;
        const { uid } = file;
        if (!attrAccept(file, accept)) {
            return;
        }
        /*         if (typeof data === 'function') {
                    data = data(file);
                } */


        /*         this.reqs[uid] = request({
                    action: props.action,
                    filename: props.name,
                    file,
                    data,
                    headers: props.headers,
                    withCredentials: props.withCredentials,
                    onProgress: onProgress ? e => {
                        onProgress(e, file);
                    } : null,
                    onSuccess: (ret, xhr) => {
                        delete this.reqs[uid];
                        props.onSuccess(ret, file, xhr);
                    },
                    onError: (err, ret) => {
                        delete this.reqs[uid];
                        props.onError(err, ret, file);
                    },
                }); */

        const params = new HttpParams();
        /*         Object.keys(props.data).map(key => {
                    params.append(key, props.data[key]);
                }); */


        const req = new HttpRequest(
            'POST',
            this.action,
            file,
            {
                reportProgress: true,
                withCredentials: this.withCredentials,
                headers: new HttpHeaders(this.headers),
                params
            }
        );
        console.log(`Start post File ${file.name}`);

        console.log(file);
        this._reqs[uid] = this.http.request(req);
        this._reqs[uid].subscribe((event) => {
            if (event.type === HttpEventType.UploadProgress) {
                const info = {
                    total: event.total,
                    loaded: event.loaded,
                    percent: Math.round(100 * event.loaded / event.total),
                };
                this.onProgress.emit({ event, file });
            } else if (event instanceof HttpResponse) {
                delete this._reqs[uid];
                this.onSuccess.emit({ res: event.body, file });
                console.log('File is completely uploaded!');
                // !!!!!!!!
                // onError is not completed!
                // !!!!!!!!
            }
        });


        console.log(`End post File ${file.name}`);
    }

    onClick(ev) {
        if (!this.disabled) {
            this.inputElement.nativeElement.value = null;
            this.inputElement.nativeElement.click();
        }
    }

}
