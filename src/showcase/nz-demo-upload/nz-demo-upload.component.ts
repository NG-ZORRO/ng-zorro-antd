import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-demo-upload',
  templateUrl: './nz-demo-upload.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./nz-demo-upload.less']
})
export class NzDemoUploadComponent implements OnInit {
  NzDemoUploadBasicCode = require('!!raw-loader!./nz-demo-upload-basic.component');
  NzDemoUploadPictureswallCode = require('!!raw-loader!./nz-demo-upload-pictureswall.component');

  constructor() {
  }

  ngOnInit() {
  }
}

