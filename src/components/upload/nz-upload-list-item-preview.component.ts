import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-upload-list-item-preview',
  templateUrl: './nz-upload-list-item-preview.component.html',
  styleUrls: [
    './style/index.less'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NzUploadListItemPreviewComponent implements OnInit {
  _prefixCls = 'ant-upload';
  @Input() file;
  @Input() listType = 'text';

  @Output() onPreview = new EventEmitter<any>();


  constructor() { }

  ngOnInit() { }

}
