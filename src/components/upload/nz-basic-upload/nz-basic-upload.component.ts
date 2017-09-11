import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHeaders, HttpParams, HttpEventType, HttpResponse } from '@angular/common/http';
import { UidService } from './uid/uid.service';
import attrAccept from './util/attr-accept';

@Component({
    selector: 'nz-basic-upload',
    providers: [UidService],
    templateUrl: './nz-basic-upload.component.html',
    styleUrls: ['./nz-basic-upload.component.css']
})
export class NzBasicUploadComponent implements OnInit {
    reqs: any;


    _component = 'span';
    _prefixCls = 'nz-upload';
    _multipart: false;
    // className: string;

    disabled: boolean;
    accept: string;
    children: any;
    data: { [key: string]: string } | ((file: File) => { string: string }) = {};
    name: string;


    // customRequest: any;
    @Input() action: string;
    @Input() multiple = false;
    @Input() headers: string | { [name: string]: string | string[] } = {};
    @Input() withCredentials = false;
    @Input() supportServerRender = false;

    @Input() beforeUpload: (file: File, files: FileList) => boolean | Promise<any> = null;

    onReady: any;
    onError: any;
    onSuccess: (response: any, file: File) => void;
    onStart: (file: File) => void;
    onProgress: (info: object, file?: File) => void;


    constructor(private http: HttpClient, private uidService: UidService) {
        function empty() { }

        this.name = 'file';
        this.onReady = empty;
        this.onStart = () => { console.log('onStart'); };
        this.onError = empty;
        this.onSuccess = () => { console.log('onSuccess'); };
        this.onProgress = empty;
        // this.customRequest = null;

        this.reqs = {};
    }

    ngOnInit() { }

    onChange = e => {
        const files: FileList = e.target.files;
        this.uploadFiles(files);
    }
    /*     onClick = () => {
            const el = this.elementRef.nativeElement.querySelector('input').file;
            if (!el) {
                return;
            }
            el.click();
            console.log('onClick');
        }
        onKeyDown = e => {
            if (e.key === 'Enter') {
                this.onClick();
            }
        } */

    /*     onFileDrop = e => {
            if (e.type === 'dragover') {
                e.preventDefault();
                return;
            }
            const files = e.dataTransfer.files;
            this.uploadFiles(files);
            e.preventDefault();
        } */
    uploadFiles(files: FileList) {
        const postFiles = Array.prototype.slice.call(files);
        console.log('Start Upload Files');

        postFiles.forEach((file) => {
            file.uid = this.uidService.getUid();
            this.upload(file, postFiles);
        });

        console.log('End Upload Files');
    }

    upload(file, fileList) {
        const props = this;
        if (!props.beforeUpload) {
            // always async in case use react state to keep fileList
            return setTimeout(() => this.post(file), 0);
        }

        const before = props.beforeUpload(file, fileList);
        if (before instanceof Promise && before && before.then) {
            before.then((processedFile) => {
                const processedFileType = Object.prototype.toString.call(processedFile);
                if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
                    this.post(processedFile);
                } else {
                    this.post(file);
                }
            }).catch(e => {
                console.log(e); // tslint-disable-line
            });
        } else if (before !== null) {
            setTimeout(() => this.post(file), 0);
        }
    }

    post(file) {
        const props = this;
        let { data } = props;
        const { onStart, onProgress, accept, onSuccess } = props;
        if (!attrAccept(file, accept)) {
            return;
        }
        if (typeof data === 'function') {
            data = data(file);
        }
        const { uid } = file;
        // const request = props.customRequest || defaultRequest;

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
        Object.keys(props.data).map(key => {
            params.append(key, props.data[key]);
        });


        const req = new HttpRequest(
            'POST',
            props.action,
            file,
            {
                reportProgress: true,
                withCredentials: props.withCredentials,
                headers: new HttpHeaders(props.headers),
                params
            }
        );
        console.log(`Start post File ${file.name}`);

        console.log(file);
        this.reqs[uid] = this.http.request(req).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                const info = {
                    total: event.total,
                    loaded: event.loaded,
                    percent: Math.round(100 * event.loaded / event.total),
                };
                onProgress(info);
                const percentDone = Math.round(100 * event.loaded / event.total);
                console.log(`File is ${percentDone}% uploaded.`);
            } else if (event instanceof HttpResponse) {
                delete this.reqs[uid];
                onSuccess(event.body, file);
                console.log('File is completely uploaded!');
                // !!!!!!!!
                // onError is not completed!
                // !!!!!!!!
            }
        });
        onStart(file);


        console.log(`End post File ${file.name}`);
    }

}
