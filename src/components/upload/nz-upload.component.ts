import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { NzBasicUploadComponent} from './nz-basic-upload.component'
import { UidService } from './uid/uid.service';

@Component({
    selector: 'nz-upload',
    providers: [UidService],
    templateUrl: './nz-upload.component.html',
})
export class NzUploadComponent implements OnInit {
    _fileMap = new Map();

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
        this.fileList.forEach(file => {
            file.uid = uidService.getUid;
            this._fileMap.set(file.uid, this.processedRawFile(file));
        });
    }

    ngOnInit() { }

    processedRawFile(rawFile) {
        rawFile.status = 'ready';
        rawFile.percent = 0;
        return rawFile;
    }

    handleStart(file) {
        this._fileMap.set(file.uid, this.processedRawFile(file));
        const fileMap = this._fileMap;

        if (this.onChange) {
            this.onChange({
                file,
                fileMap
            });
        }
    }

    handleProgress({ event, file }) {
        const percent = Math.round(100 * event.loaded / event.total);
        this._fileMap.get(file.uid).status = 'uploading';
        this._fileMap.get(file.uid).percent = percent;
        const fileMap = this._fileMap;
        if (this.onProgress) {
            this.onProgress(event, file, fileMap);
        }

        if (this.onChange) {
            this.onChange({
                event,
                file,
                fileMap
            });
        }
        console.log(this._fileMap.get(file.uid));
    }

    handleSuccess({ ret, file, xhr }) {
        this._fileMap.get(file.uid).status = 'success';
        const fileMap = this._fileMap;
        if (this.onSuccess) {
            this.onSuccess(ret, file, fileMap);
        }

        if (this.onChange) {
            this.onChange({
                file,
                fileMap
            });
        }
    }

    handleRemove(file) {
        this.abort(file);
        this._fileMap.delete(file.uid);
        const fileMap = this._fileMap;
        if (this.onRemove) {
            this.onRemove(file, fileMap);
        }

        // TODO:this behavior isn't correct
        if (this.onChange) {
            this.onChange({
                file,
                fileMap
            });
        }
    }

    handleError({ err, ret, file }) {
        const fileMap = this._fileMap;
        // removed
        if (!file) {
            return;
        }
        this._fileMap.get(file.uid).error = err;
        this._fileMap.get(file.uid).response = ret;
        this._fileMap.get(file.uid).status = 'error';
        this.onChange({
            file: this._fileMap.get(file.uid),
            fileMap,
        });
    }

    abort(file) {
        this.basicUpload.nativeElement.abort(file);
    }
}
