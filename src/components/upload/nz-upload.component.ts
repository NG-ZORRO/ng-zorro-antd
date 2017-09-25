import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { getFileItem, removeFileItem } from './utils';
import { NzBasicUploadComponent } from './nz-basic-upload.component';
import { UidService } from './uid/uid.service';

@Component({
    selector: 'nz-upload',
    providers: [UidService],
    templateUrl: './nz-upload.component.html',
})
export class NzUploadComponent implements OnInit {

    @Input() action: string;
    @Input() accept: string;
    @Input() autoUpload = true;
    @Input() diasble = false;
    @Input() fileList = [];
    @Input() headers: string | { [name: string]: string | string[] };
    @Input() multiple = false;
    @Input() withCredentials: boolean;

    @Input() onChange: Function;
    @Input() onError: Function;
    @Input() onProgress: Function;
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

    ngOnInit() { }

    processedRawFile(rawFile) {
        rawFile.status = 'ready';
        rawFile.percent = 0;
        return rawFile;
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
        this.fileList[this.fileList.indexOf(file)].status = 'uploading';
        this.fileList[this.fileList.indexOf(file)].percent = percent;

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
        this.fileList[this.fileList.indexOf(file)].status = 'success';
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
        this.fileList[this.fileList.indexOf(file)].error = err;
        this.fileList[this.fileList.indexOf(file)].response = ret;
        this.fileList[this.fileList.indexOf(file)].status = 'error';

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
