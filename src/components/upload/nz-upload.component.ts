import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { NzBasicUploadComponent } from './nz-basic-upload.component';
import { NzUploadListComponent } from './nz-upload-list.component';
import { UidService } from './uid/uid.service';

@Component({
    selector: 'nz-upload',
    providers: [UidService],
    templateUrl: './nz-upload.component.html',
    styleUrls: [
        './style/index.less',
        './style/patch.less'
    ]
})
export class NzUploadComponent implements OnInit {

    _classMap;
    _prefixCls = 'ant-upload';

    @Input() action: string;
    @Input() accept: string;
    @Input() autoUpload = true;
    @Input() data: any;
    @Input() disabled = false;
    @Input() fileList = [];
    @Input() headers: string | { [name: string]: string | string[] };
    @Input() listType = 'text';
    @Input() multiple = false;
    @Input() showUploadList = true;
    @Input() withCredentials: boolean;

    @Input() onChange: Function;
    @Input() onError: Function;
    @Input() onProgress: Function;
    @Input() onPreview: Function;
    @Input() onRemove: Function;
    @Input() onStart: Function;
    @Input() onSuccess: Function;

    @ViewChild('basicUpload') basicUpload: ElementRef;

    constructor(private elementRef: ElementRef, private uidService: UidService) {
        this.fileList = this.fileList.map(file => {
            file.uid = uidService.getUid;
            return this.processedRawFile(file);
        });
    }

    ngOnInit() {
        this.setClassMap();
    }

    setClassMap(): void {
        this._classMap = {
            [`${this._prefixCls}-select`]: true,
            [`${this._prefixCls}-select-${this.listType}`]: true,
            [`${this._prefixCls}-disabled`]: this.disabled,
        };
    }

    private processedRawFile(rawFile) {
        rawFile.status = 'ready';
        rawFile.percent = 0;
        return rawFile;
    }

    private setFileList(file, key, value) {
        this.fileList[this.fileList.indexOf(file)][key] = value;
    }

    handleStart(file) {
        this.fileList.push(this.processedRawFile(file));
        const fileList = this.fileList;

        if (this.onChange) {
            this.onChange({ file: this.processedRawFile(file), fileList });
        }
    }

    handleProgress({ event, file }) {
        const percent = Math.round(100 * event.loaded / event.total);
        this.setFileList(file, 'status', 'uploading');
        this.setFileList(file, 'percent', percent);

        const fileList = this.fileList;

        if (this.onProgress) {
            this.onProgress({ event, file, fileList });
        }
        console.log(fileList);

        if (this.onChange) {
            this.onChange({
                event,
                file,
                fileList
            });
        }

    }

    handleSuccess({ ret, file, xhr }) {
        this.setFileList(file, 'status', 'success');

        const fileList = this.fileList;
        if (this.onSuccess) {
            this.onSuccess(ret, file, fileList);
        }

        if (this.onChange) {
            this.onChange({
                file,
                fileList
            });
        }
    }

    handleRemove(file) {
        this.abort(file);
        this.fileList.splice(this.fileList.indexOf(file), 1);

        const fileList = this.fileList;
        if (this.onRemove) {
            this.onRemove(file, fileList);
        }

        // TODO:this behavior isn't correct
        if (this.onChange) {
            this.onChange({
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

        const fileList = this.fileList;
        if (this.onChange) {
            this.onChange({
                file,
                fileList
            });
        }
    }

    abort(file) {
        this.basicUpload.nativeElement.abort(file);
    }
}
