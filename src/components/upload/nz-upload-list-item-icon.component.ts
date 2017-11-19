import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NzLocaleService } from '../locale/index';

@Component({
  selector: 'nz-upload-list-item-icon',
  templateUrl: './nz-upload-list-item-icon.component.html',
  styleUrls: [
    './style/index.less'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NzUploadListItemIconComponent implements OnInit {

  _prefixCls = 'ant-upload';

  @Input() file;
  @Input() listType;

  @Output() onPreview = new EventEmitter<any>();

  _uploadingText = this._locale.translate('Upload.uploading');

  constructor(private _locale: NzLocaleService) {
  }

  ngOnInit() {
  }

}
