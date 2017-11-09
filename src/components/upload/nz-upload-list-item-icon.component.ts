import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-upload-list-item-icon',
  templateUrl: './nz-upload-list-item-icon.component.html',
  styleUrls: [
    './style/index.less',
    './style/patch.less'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NzUploadListItemIconComponent implements OnInit {

  _prefixCls = 'ant-upload';
  _locale = {
    uploading: '文件上传中',
    removeFile: '删除文件',
    uploadError: '上传错误',
    previewFile: '预览文件',
  };

  @Input() file;
  @Input() listType;

  @Output() onPreview = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

}
