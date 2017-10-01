import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nz-upload-list-item-preview',
  templateUrl: './nz-upload-list-item-preview.component.html'
})
export class NzUploadListItemPreviewComponent implements OnInit {
  @Input() file;

  @Output() onPreview = new EventEmitter<any>();


  constructor() { }

  ngOnInit() { }

}
