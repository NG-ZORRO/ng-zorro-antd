import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NzLocaleService } from '../locale/index';

@Component({
  selector: 'nz-upload-list-item-icon-and-preview',
  templateUrl: './nz-upload-list-item-icon-and-preview.component.html',
  styleUrls: [
    './style/index.less'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NzUploadListItemIconAndPreviewComponent implements OnInit {


  @Input() nzFile;
  @Input() nzListType;
  @Output() nzOnPreview = new EventEmitter<any>();

  _uploadErrorText = this._locale.translate('Upload.uploadError');

  constructor(private _locale: NzLocaleService) { }

  ngOnInit() { }

}
