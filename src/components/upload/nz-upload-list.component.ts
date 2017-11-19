import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NzLocaleService } from '../locale/index';

@Component({
    selector: 'nz-upload-list',
    templateUrl: './nz-upload-list.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './style/index.less'
    ],

})
export class NzUploadListComponent implements OnInit {

    _prefixCls = 'ant-upload';

    @Input() fileList = [];
    @Input() onPreview;
    @Output() onRemove = new EventEmitter<any>();

    @Input() showRemoveIcon = true;
    @Input() showPreviewIcon = true;
    @Input() listType = 'text';  // or picture
    @Input() progressAttr = {
        strokeWidth: 2,
        showInfo: false,
    };

    _previewFileText = this._locale.translate('Upload.previewFile');
    _removeFileText = this._locale.translate('Upload.removeFile');


    constructor(private _locale: NzLocaleService) { }

    ngOnInit() {
    }

    trackByFiles(index: number, file: any): any { return file.uid; }

    handlePreview = (file) => {
        if (this.onPreview) {
            return this.onPreview(file);
        }
    }

    handleClose = (file) => {
        this.onRemove.emit(file);
    }

}
