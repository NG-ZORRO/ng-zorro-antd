import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'nz-upload-list',
    templateUrl: './nz-upload-list.component.html',
    styleUrls: [
      './style/index.less',
      './style/patch.less'
    ]
})
export class NzUploadListComponent implements OnInit {

    _classMap;
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
        this.setClassMap();
    }

    setClassMap(): void {
        this._classMap = {
        };
    }

    trackByFiles(index: number, file: any): any { return file.uid; }

    handlePreview = (file) => {
        console.log('handlePreview');
        console.log(file);
        if (this.onPreview) {
            return this.onPreview(file);
        }
    }

    handleClose = (file) => {
        console.log('handleClose');
        this.onRemove.emit(file);
    }

}
