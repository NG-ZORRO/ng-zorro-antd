import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'nz-upload-list',
    templateUrl: './nz-upload-list.component.html',
})
export class NzUploadListComponent implements OnInit {

    _classMap;
    _prefixCls = 'ant-upload';

    @Input() fileList = [];
    @Input() onPreview;

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
        console.log(file);
    }

}
