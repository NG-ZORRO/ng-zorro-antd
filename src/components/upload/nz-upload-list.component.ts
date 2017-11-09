import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'nz-upload-list',
    templateUrl: './nz-upload-list.component.html',
    encapsulation: ViewEncapsulation.None,

})
export class NzUploadListComponent implements OnInit {

    _prefixCls = 'ant-upload';
    _locale = {
        uploading: '文件上传中',
        removeFile: '删除文件',
        uploadError: '上传错误',
        previewFile: '预览文件',
    };

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

    constructor() { }

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
